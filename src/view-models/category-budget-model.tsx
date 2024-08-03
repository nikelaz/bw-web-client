'use client';

import { createContext, useContext } from 'react';
import { BudgetViewModel, useBudgetModel } from '@/view-models/budget-model';
import type { CategoryBudget } from '@/types/category-budget';
import { CategoryType } from '@/types/category';
import {
  updateCategoryBudget as updateCategoryBudgetAction,
  deleteCategoryBudget as deleteCategoryBudgetAction,
  createCategoryBudget as createCategoryBudgetAction
} from '@/actions/category-budget-actions';
import { useTransactionsModel } from './transactions-model';

export class CategoryBudgetViewModel {
  token: string;
  budgetModel: BudgetViewModel;
  transactionsModel: any;
  categoryBudgets: Array<CategoryBudget>;
  categoryBudgetsByType: {
    [CategoryType.INCOME]: Array<CategoryBudget>,
    [CategoryType.EXPENSE]: Array<CategoryBudget>,
    [CategoryType.SAVINGS]: Array<CategoryBudget>,
    [CategoryType.DEBT]: Array<CategoryBudget>,
  };

  constructor(token: string) {
    this.token = token;
    this.budgetModel = useBudgetModel();
    this.transactionsModel = useTransactionsModel();

    this.categoryBudgets = this.budgetModel.currentBudget?.categoryBudgets || [];
    this.categoryBudgetsByType = {
      [CategoryType.INCOME]: [],
      [CategoryType.EXPENSE]: [],
      [CategoryType.SAVINGS]: [],
      [CategoryType.DEBT]: [],
    };

    this.categoryBudgets.forEach((categoryBudget: CategoryBudget) => {
      if (!categoryBudget.category || categoryBudget.category.type === undefined) return;
      this.categoryBudgetsByType[categoryBudget.category.type].push(categoryBudget);
    });
  }

  async updateCategoryBudget(categoryBudget: CategoryBudget) {
    await updateCategoryBudgetAction(this.token, categoryBudget);
    this.budgetModel.refresh();
    this.transactionsModel.refresh();
  }

  async deleteCategoryBudget(categoryBudget: CategoryBudget) {
    await deleteCategoryBudgetAction(this.token, categoryBudget);
    this.budgetModel.refresh();
    this.transactionsModel.refresh();
  }

  async createCategoryBudget(categoryBudget: CategoryBudget) {
    await createCategoryBudgetAction(this.token, categoryBudget);
    this.budgetModel.refresh();
    this.transactionsModel.refresh();
  }
}

const CategoryBudgetModelContext = createContext<any>([null, null]);

type CategoryBudgetModelContextProviderProps = Readonly<{
  children: React.ReactNode,
  token: string,
}>;

export const CategoryBudgetModelContextProvider = (props: CategoryBudgetModelContextProviderProps) => {
  const categoryBudgetModel = new CategoryBudgetViewModel(props.token);

  return (
    <CategoryBudgetModelContext.Provider value={categoryBudgetModel}>
      {props.children}
    </CategoryBudgetModelContext.Provider>
  )
};

export const useCategoryBudgetModel = () => useContext(CategoryBudgetModelContext);
