'use server';

import { serviceUrl } from '@/config';

export const fetchBudgets = async (token: string | undefined) => {
  if (!token) return;

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

export const createCategoryBudget = async (token: string | undefined, categoryBudget: any) => {
  if (!token) return;

  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ categoryBudget })
  };

  const req = await fetch(`${serviceUrl}/category-budgets`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200 && jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }

  if (req.status !== 200 && !jsonResponse.message) {
    throw new Error('An unexpected error occured. Please try again later.')
  }

  return jsonResponse;
};

export const deleteCategoryBudget = async (token: string | undefined, id: any) => {
  if (!token) return;

  const reqOptions = {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const req = await fetch(`${serviceUrl}/category-budgets/${id}`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200 && jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }

  if (req.status !== 200 && !jsonResponse.message) {
    throw new Error('An unexpected error occured. Please try again later.')
  }

  return jsonResponse;
};

export const updateCategoryBudget = async (token: string | undefined, categoryBudget: any) => {
  if (!token) return;

  const reqOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ categoryBudget })
  };

  const req = await fetch(`${serviceUrl}/category-budgets`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200 && jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }

  if (req.status !== 200 && !jsonResponse.message) {
    throw new Error('An unexpected error occured. Please try again later.')
  }

  return jsonResponse;
};