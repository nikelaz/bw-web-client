'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useBudgetModel } from '../(budget-column)/budget-model';
import { fetchTransactions } from '@/actions/transactions-actions';
import { useDialog } from '@nikelaz/bw-ui';

const TransactionsModelContext = createContext<any>(null);

const calculateTotalPages = (transactionsCount: number, perPage: number) => Math.ceil(transactionsCount /  perPage)

export const TransactionsModelContextProvider = (props: any) => {
  const perPage = 6;
  const budgetModel = useBudgetModel();
  const [transactions, setTransactions] = useState(props.transactions);
  const [isCreateDialogOpen, setIsCreateDialogOpen, onCreateDialogKeyDown] = useDialog();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(calculateTotalPages(parseFloat(props.transactionsCount), perPage));
  const [budgetChanged, setBudgetChanged] = useState(false);

  const refresh = async () => {
    console.log('refresh transactions');
    const response = await fetchTransactions(props.token, budgetModel.currentBudgetId, perPage, page * perPage);
    setTransactions(response.transactions);
    setTotalPages(calculateTotalPages(parseFloat(response.count),  perPage));
  };

  useEffect(() => {
    if (!budgetChanged && budgetModel.currentBudgetId === props.currentBudgetId) return;
    refresh();
    setBudgetChanged(true);
  }, [budgetModel.currentBudgetId]);

  const nextPage = () => {
    setPage(page + 1);
  }

  const prevPage = () => {
    setPage(page - 1);
  }

  const model = {
    transactions,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    onCreateDialogKeyDown,
    totalPages,
    page,
    nextPage,
    prevPage,
    refresh,
  };

  return (
    <TransactionsModelContext.Provider value={model}>
      {props.children}
    </TransactionsModelContext.Provider>
  )
};

export const useTransactionsModel = () => useContext(TransactionsModelContext);
