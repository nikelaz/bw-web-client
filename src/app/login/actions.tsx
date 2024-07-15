'use server';

import { serviceUrl } from '@/config';
import { cookies } from 'next/headers';

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
  
  cookies().set('token', jsonResponse.token);
  cookies().set('user', JSON.stringify(jsonResponse.user));

  if (req.status !== 200) {
    if (jsonResponse.message) {
      return {
        message: jsonResponse.message
      };
    }
  }

  return {
    message: 'User logged in successfully'
  };
};