'use client';

import { createContext, useContext, useState } from 'react';
import { CategoryType } from '@/types/category-type';
import { fetchBudgets } from '@/actions/budget-actions';

const BudgetModelContext = createContext<any>([null, null]);

export const BudgetModelContextProvider = (props: any) => {
  const [budgets, setBudgets] = useState(props.budgets);
  const [currentBudgetId, setCurrentBudgetId] = useState(props.currentBudgetId);

  const currentBudget = budgets.find((budget: any) => budget.id === currentBudgetId);

  const categoryBudgets = currentBudget.categoryBudgets;
  const categoryBudgetsByType: any = {
    [CategoryType.INCOME]: [],
    [CategoryType.EXPENSE]: [],
    [CategoryType.SAVINGS]: [],
    [CategoryType.DEBT]: [],
  };

  categoryBudgets.forEach((categoryBudget: any) => {
    categoryBudgetsByType[categoryBudget.category.type].push(categoryBudget);
  });

  const refresh = async () => {
    const budgets = await fetchBudgets(props.token);
    setBudgets(budgets);
  };

  const budgetModel = {
    budgets,
    currentBudget,
    categoryBudgets,
    categoryBudgetsByType,
    currentBudgetId,
    setCurrentBudgetId,
    refresh,
  };

  return (
    <BudgetModelContext.Provider value={budgetModel}>
      {props.children}
    </BudgetModelContext.Provider>
  )
};

export const useBudgetModel = () => useContext(BudgetModelContext);
