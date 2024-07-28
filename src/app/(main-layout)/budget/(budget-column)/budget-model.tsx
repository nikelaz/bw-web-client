'use client';

import { createContext, useContext, useReducer, useState, useEffect } from 'react';
import { CategoryType } from '@/types/category-type';
import { fetchBudgets } from '@/actions/budget-actions';

const BudgetModelContext = createContext<any>([null, null]);

// export enum BudgetActionsTypes {
//   DELETE_CATEGORY_BUDGET,
//   CREATE_CATEGORY_BUDGET,
// };

// type BudgetReducerAction = {
//   type: BudgetActionsTypes,
//   payload: any
// };

const findClosestBudgetDate = (referenceDate: any, budgets: Array<any>) => {
  const budgetsCopy = budgets.map(budget => ({
    ...budget,
    month: new Date(budget.month) 
  }));

  budgetsCopy.sort((a: any, b: any) => {
    const distancea = Math.abs(referenceDate - a.month);
    const distanceb = Math.abs(referenceDate - b.month);
    return distancea - distanceb; // sort a before b when the distance is smaller
  });

  return budgetsCopy[0];
};

// const reducer = (budgets: any, action: BudgetReducerAction) => {
//   if (action.type === BudgetActionsTypes.DELETE_CATEGORY_BUDGET) {
//     const expectedBudgets = budgets.map((budget: any) => {
//       if (budget.id === action.payload.budgetId) {
//         const ret =  {
//           ...budget,
//           categoryBudgets: budget.categoryBudgets.flatMap((categoryBudget: any) => {
//             if (categoryBudget.id === action.payload.categoryBudget.id) {
//               return [];
//             } else {
//               return [categoryBudget];
//             }
//           })
//         };
//         return ret;
//       }

//       return budget;
//     });
//     return expectedBudgets;
//   }

//   if (action.type === BudgetActionsTypes.CREATE_CATEGORY_BUDGET) {
//     return budgets.map((budget: any) => {
//       if (budget.id === action.payload.budgetId) {
//         return {
//           ...budget,
//           categoryBudgets: [
//             ...budget.categoryBudgets,
//             action.payload.categoryBudget,
//           ],
//         };
//       }

//       return budget;
//     });
//   }

//   return budgets;
// };

export const BudgetModelContextProvider = (props: any) => {
  const [budgets, setBudgets] = useState(props.budgets);
  const [currentBudgetId, setCurrentBudgetId] = useState(findClosestBudgetDate(new Date(), budgets).id);

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
