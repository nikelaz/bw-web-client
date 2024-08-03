'use client';

import { createContext, useContext, useState } from 'react';
import { fetchBudgets, createBudget as createBudgetAction } from '@/actions/budget-actions';
import type { Budget } from '@/types/budget';

export class BudgetViewModel {
  token: string;
  budgets: Array<Budget>;
  setBudgets: Function;
  currentBudgetId?: number;
  setCurrentBudgetId: Function;
  currentBudget?: Budget;

  constructor(token: string, budgets: Array<Budget>, currentBudgetId?: number) {
    this.token = token;
    [this.budgets, this.setBudgets] = useState(budgets);
    [this.currentBudgetId, this.setCurrentBudgetId] = useState(currentBudgetId);
    this.currentBudget = this.budgets.find((budget: Budget) => budget.id === this.currentBudgetId);
  }

  async refresh() {
    const budgets = await fetchBudgets(this.token);
    this.setBudgets(budgets);
  }

  budgetExistsForMonth(monthIndex: number) {
    for (let i = 0; i < this.budgets.length; i++) {
      const budget = this.budgets[i];
      const tmpDate = new Date(budget.month);
      if (tmpDate.getMonth() === monthIndex) return true;
    }

    return false;
  }

  async createBudget(budget: Budget, copyFrom: Budget) {
    await createBudgetAction(this.token, budget, copyFrom);
    this.refresh();
  };
}

const BudgetModelContext = createContext<any>([null, null]);

type BudgetModelContextProviderProps = Readonly<{
  children: React.ReactNode,
  token: string,
  budgets: Array<Budget>,
  currentBudgetId?: number,
}>;

export const BudgetModelContextProvider = (props: BudgetModelContextProviderProps) => {
  const budgetModel = new BudgetViewModel(props.token, props.budgets, props.currentBudgetId);

  return (
    <BudgetModelContext.Provider value={budgetModel}>
      {props.children}
    </BudgetModelContext.Provider>
  )
};

export const useBudgetModel = () => useContext(BudgetModelContext);
