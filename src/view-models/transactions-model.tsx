'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { BudgetViewModel, useBudgetModel } from '@/view-models/budget-model';
import { fetchTransactions } from '@/actions/transaction-actions';
import { useDialog } from '@nikelaz/bw-ui';
import { calculateTotalPages } from '@/helpers/pagination-utils';
import type { Transaction } from '@/types/transaction';

export class TransactionsViewModel {
  perPage = 6;
  token: string;
  budgetModel: BudgetViewModel;
  transactions: Array<Transaction>;
  setTransactions: Function;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: Function;
  onCreateDialogKeyDown: Function;
  page: number;
  setPage: Function;
  totalPages: number;
  setTotalPages: Function;
  budgetChanged: boolean;
  setBudgetChanged: Function;


  constructor(token: string, transactions: Array<Transaction>, transactionsCount: string | number, currentBudgetId?: number) {
    this.token = token;
    this.budgetModel = useBudgetModel();
    [this.transactions, this.setTransactions] = useState(transactions);
    [this.isCreateDialogOpen, this.setIsCreateDialogOpen, this.onCreateDialogKeyDown] = useDialog();
    [this.page, this.setPage] = useState(0);
    [this.totalPages, this.setTotalPages] = useState(
      calculateTotalPages(
        parseFloat(transactionsCount.toString()),
        this.perPage
      )
    );
    [this.budgetChanged, this.setBudgetChanged] = useState(false);

    useEffect(() => {
      if (!this.budgetChanged && this.budgetModel.currentBudgetId === currentBudgetId) return;
      this.refresh();
      this.setBudgetChanged(true);
    }, [this.budgetModel.currentBudgetId]);

    useEffect(() => {
      this.refresh();
    }, [this.page]);
  }

  async refresh() {
    const response = await fetchTransactions(this.token, this.budgetModel.currentBudgetId, this.perPage, this.page * this.perPage);
    this.setTransactions(response.transactions);
    this.setTotalPages(calculateTotalPages(parseFloat(response.count),  this.perPage));
  };

  nextPage() {
    this.setPage(this.page + 1);
  }

  prevPage() {
    this.setPage(this.page - 1);
  }
}

const TransactionsModelContext = createContext<any>(null);

type TransactionsModelContextProviderProps = Readonly<{
  children: React.ReactNode,
  token: string,
  transactions: Array<Transaction>,
  transactionsCount: number | string,
  currentBudgetId?: number,
}>;

export const TransactionsModelContextProvider = (props: TransactionsModelContextProviderProps) => {
  const transactionsModel = new TransactionsViewModel(props.token, props.transactions, props.transactionsCount, props.currentBudgetId);

  return (
    <TransactionsModelContext.Provider value={transactionsModel}>
      {props.children}
    </TransactionsModelContext.Provider>
  )
};

export const useTransactionsModel = () => useContext(TransactionsModelContext);
