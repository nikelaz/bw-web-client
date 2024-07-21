'use server';

import { serviceUrl } from '@/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

export const logout = () => {
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
    return {
      message: response.message
    };
  }

  redirect('/login');
};
