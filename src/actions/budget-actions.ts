'use server';

import { serviceUrl } from '@/config';
import type { Budget } from '@/types/budget';

export const fetchBudgets = async (token: string | undefined): Promise<Array<Budget>> => {
  if (!token) return [];

  const reqOptions = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const req = await fetch(`${serviceUrl}/budgets`, reqOptions);

  const jsonResponse = await req.json();

  return jsonResponse.budgets;
};

export const createBudget = async (
  token: string | undefined,
  budget: Budget,
  copyFrom: Budget) => {
  if (!token) return;

  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ budget, copyFrom })
  };

  const req = await fetch(`${serviceUrl}/budgets`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200 && jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }

  if (req.status !== 200 && !jsonResponse.message) {
    throw new Error('An unexpected error occured. Please try again later.')
  }

  return jsonResponse;
};
