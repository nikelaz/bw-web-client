'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useBudgetModel } from '../(budget-column)/budget-model';
import { fetchTransactions } from '@/actions/transactions-actions';
import { useDialog } from '@nikelaz/bw-ui';

const TransactionsModelContext = createContext<any>(null);

export const TransactionsModelContextProvider = (props: any) => {
  const budgetModel = useBudgetModel();
  const [transactions, setTransactions] = useState<any>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen, onCreateDialogKeyDown] = useDialog();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 6;

  const fetchData = async () => {
    const response = await fetchTransactions(props.token, budgetModel.currentBudgetId, perPage, page * perPage);
    setTransactions(response.transactions);
    setTotalPages(Math.ceil(parseFloat(response.count) /  perPage));
  };

  useEffect(() => {
    fetchData();
  }, [setTransactions, props.token, budgetModel.currentBudgetId, page]);

  const createTransaction = (newTransaction: any) => {
    setTransactions([
      ...transactions,
      newTransaction
    ]);
  };

  const nextPage = () => {
    setPage(page + 1);
  }

  const prevPage = () => {
    setPage(page - 1);
  }

  const model = {
    transactions,
    createTransaction,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    onCreateDialogKeyDown,
    totalPages,
    page,
    nextPage,
    prevPage,
    refresh: fetchData,
  };

  return (
    <TransactionsModelContext.Provider value={model}>
      {props.children}
    </TransactionsModelContext.Provider>
  )
};

export const useTransactionsModel = () => useContext(TransactionsModelContext);
