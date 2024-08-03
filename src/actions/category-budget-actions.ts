'use server';

import { serviceUrl } from '@/config';
import { CategoryBudget } from '@/types/category-budget';

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

export const deleteCategoryBudget = async (token: string | undefined, categoryBudget: CategoryBudget) => {
  if (!token) return;

  const reqOptions = {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const req = await fetch(`${serviceUrl}/category-budgets/${categoryBudget.id}`, reqOptions);

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