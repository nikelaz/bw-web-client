'use client';

import { createContext, useContext, useReducer, useState } from 'react';
import { CategoryType } from '@/types/category-type';

const BudgetModelContext = createContext<any>([null, null]);

export enum BudgetActionsTypes {
  DELETE_CATEGORY_BUDGET,
  CREATE_CATEGORY_BUDGET,
};

type BudgetReducerAction = {
  type: BudgetActionsTypes,
  payload: any
};

const findClosestBudgetDate = (referenceDate: Date, budgets: Array<any>) => {
  const budgetsCopy = budgets.map(budget => ({
    ...budget,
    month: new Date(budget.month) 
  }));

  budgetsCopy.sort((a: any, b: any) => {
    const distancea = Math.abs(referenceDate - a.month);
    const distanceb = Math.abs(referenceDate - b.month);
    return distancea - distanceb; // sort a before b when the distance is smaller
  });

  return budgetsCopy[0]
};

const reducer = (budgets: any, action: BudgetReducerAction) => {
  if (action.type === BudgetActionsTypes.DELETE_CATEGORY_BUDGET) {
    const expectedBudgets = budgets.map((budget: any) => {
      if (budget.id === action.payload.budgetId) {
        const ret =  {
          ...budget,
          categoryBudgets: budget.categoryBudgets.flatMap((categoryBudget: any) => {
            if (categoryBudget.id === action.payload.categoryBudget.id) {
              return [];
            } else {
              return [categoryBudget];
            }
          })
        };
        return ret;
      }

      return budget;
    });
    return expectedBudgets;
  }

  if (action.type === BudgetActionsTypes.CREATE_CATEGORY_BUDGET) {
    return budgets.map((budget: any) => {
      if (budget.id === action.payload.budgetId) {
        return {
          ...budget,
          categoryBudgets: [
            ...budget.categoryBudgets,
            action.payload.categoryBudget,
          ],
        };
      }

      return budget;
    });
  }

  return budgets;
};

export const BudgetModelContextProvider = (props: any) => {
  const [budgets, dispatch] = useReducer(reducer, props.budgets);
  const [currentBudget, setCurrentBudget] = useState(findClosestBudgetDate(new Date(), budgets));
  
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

  const budgetModel = {
    budgets,
    currentBudget,
    categoryBudgets,
    categoryBudgetsByType,
    setCurrentBudget,
  };

  return (
    <BudgetModelContext.Provider value={[budgetModel, dispatch]}>
      {props.children}
    </BudgetModelContext.Provider>
  )
};

export const useBudgetModel = () => useContext(BudgetModelContext);
