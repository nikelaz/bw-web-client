'use server';

import { serviceUrl } from '@/config';

export const fetchTransactions = async (token: string | undefined, budgetId: number | undefined, limit: number, offset: number, filter: string = '') => {
  if (!token || budgetId === undefined) return;

  const reqOptions = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const req = await fetch(`${serviceUrl}/transactions/${budgetId}?limit=${limit}&offset=${offset}&filter=${filter}`, reqOptions);

  const jsonResponse = await req.json();

  return jsonResponse;
};

export const createTransaction = async (token: string | undefined, transaction: any) => {
  if (!token) return;

  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ transaction })
  };

  const req = await fetch(`${serviceUrl}/transactions`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200 && jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }

  if (req.status !== 200 && !jsonResponse.message) {
    throw new Error('An unexpected error occured. Please try again later.')
  }

  return jsonResponse;
};

export const deleteTransaction = async (token: string | undefined, id: number) => {
  if (!token) return;

  const reqOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  };

  const req = await fetch(`${serviceUrl}/transactions/${id}`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200 && jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }

  if (req.status !== 200 && !jsonResponse.message) {
    throw new Error('An unexpected error occured. Please try again later.')
  }

  return jsonResponse;
};

export const updateTransaction = async (token: string | undefined, transaction: any) => {
  if (!token) return;

  const reqOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ transaction })
  };

  const req = await fetch(`${serviceUrl}/transactions`, reqOptions);

  const jsonResponse = await req.json();

  if (req.status !== 200 && jsonResponse.message) {
    throw new Error(jsonResponse.message);
  }

  if (req.status !== 200 && !jsonResponse.message) {
    throw new Error('An unexpected error occured. Please try again later.')
  }

  return jsonResponse;
};
