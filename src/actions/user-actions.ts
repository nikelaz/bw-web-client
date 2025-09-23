'use server';

import { serviceUrl } from '@/config';
import { User } from '@/types/user';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

enum OAuthProvider {
  GOOGLE = 1,
  APPLE = 2,
};

export const login = async (prevState: any, formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      }
    })
  };

  let req;

  try {
    req = await fetch(`${serviceUrl}/users/login`, reqOptions);
  } catch (error) {
    return {
      message: 'An unexpected error occured. Try again later.'
    };
  }

  const jsonResponse = await req.json();

  const cookieStore = cookies();

  const thirtyDays = 24 * 60 * 60 * 1000 * 30
  const expirationTimestamp = Date.now() + thirtyDays;

  cookieStore.set(
    'token',
    jsonResponse.token,
    { expires: expirationTimestamp }
  );

  cookieStore.set(
    'user',
    JSON.stringify(jsonResponse.user),
    { expires: expirationTimestamp }
  );

  if (req.status !== 200) {
    if (jsonResponse.message) {
      return {
        message: jsonResponse.message
      };
    }
  }

  redirect('/budget');
};

export const oauth = async (token: string, provider: OAuthProvider) => {
  if (!token) {
    throw new Error('Could not retrieve your credentials from Google. Please try again later.');
  }

  let req;

  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      oAuthProvider: provider,
    })
  };

  req = await fetch(`${serviceUrl}/users/oauth`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200) {
    if (jsonResponse.message) {
      throw new Error(jsonResponse.message);
    }
    else {
      throw new Error('An unexpected error occured while trying to sign you in with Google. Please try again later');
    }
  }

  const cookieStore = cookies();

  const thirtyDays = 24 * 60 * 60 * 1000 * 30
  const expirationTimestamp = Date.now() + thirtyDays;

  cookieStore.set(
    'token',
    jsonResponse.token,
    { expires: expirationTimestamp }
  );

  cookieStore.set(
    'user',
    JSON.stringify(jsonResponse.user),
    { expires: expirationTimestamp }
  );

  redirect('/budget');    
};

export const logout = async () => {
  const cookieStore = cookies();
  cookieStore.delete('token');
  cookieStore.delete('user');
  redirect('/login');
};

export const signup = async (prevState: any, formData: FormData) => {
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');

  if (password !== repeatPassword) {
    return {
      message: 'The two passwords do not match',
    };
  }

  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email: formData.get('email'),
        password: formData.get('password'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        country: formData.get('country'),
      },
    }),
  };

  let req;

  try {
    req = await fetch(`${serviceUrl}/users`, reqOptions);
  } catch (error: any) {
    if (error.message) {
      return {
        message: error.message
      };
    }

    return {
      message: error.toString()
    };
  }

  const response = await req.json();

  if (req.status !== 200) {
    if (
      response.statusCode
      && response.statusCode === 500
      && response.message.includes('unique constraint')
    ) {
      return {
        message: 'A user already exists with this email'
      };
    }

    if (
      response[0]
      && response[0].constraints
      && response[0].constraints.matches
    ) {
      return {
        message: response[0].constraints.matches
      };
    }

    return {
      message: response.message
    };
  }

  redirect('/login');
};

export const updateUser = async (
  token: string | undefined,
  user: Partial<User>
  ) => {
  if (!token) return;

  const reqOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user })
  };

  const req = await fetch(`${serviceUrl}/users`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200 && jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }

  if (req.status !== 200 && !jsonResponse.message) {
    throw new Error('An unexpected error occured. Please try again later.')
  }

  const cookieStore = cookies();
  const currentUserStr = cookieStore.get('user')?.value;
  if (!currentUserStr) return;
  let currentUser = JSON.parse(currentUserStr);
  currentUser = {
    ...currentUser,
    ...user,
  };
  cookieStore.set('user', JSON.stringify(currentUser));

  return jsonResponse;
};

export const changePassword = async (token: string, prevState: any, formData: FormData) => {
  const currentPassword = formData.get('currentPassword')?.toString();
  const newPassword = formData.get('newPassword')?.toString();
  const repeatNewPassword = formData.get('repeatNewPassword')?.toString();

  if (repeatNewPassword !== newPassword) {
    return {
      message: 'The new passwords do not match',
    };
  }

  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      currentPassword,
      newPassword
    })
  };

  let req;

  try {
    req = await fetch(`${serviceUrl}/users/change-password`, reqOptions);
  } catch (error) {
    return {
      message: 'An unexpected error occured. Try again later.'
    };
  }

  const jsonResponse = await req.json();

  return jsonResponse;
};
