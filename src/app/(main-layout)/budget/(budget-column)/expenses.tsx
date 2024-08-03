'use client';

import { CategoryType } from '@/types/category';
import { CategoryBudgetViewModel, useCategoryBudgetModel } from '@/view-models/category-budget-model';
import CategoryBudgetGrid from './category-budget-grid';

const Expenses = () => {
  const categoryBudgetModel: CategoryBudgetViewModel = useCategoryBudgetModel();

  return (
    <CategoryBudgetGrid
      categoryBudgets={categoryBudgetModel.categoryBudgetsByType[CategoryType.EXPENSE]}
      label="Expenses"
      hasAccAmount={false}
      amountLabel="Planned"
      currentAmountLabel="Spend"
      newItemCTALabel="New Category"
      newItemDialogHeading="Create New Category"
      exampleCategory="Groceries"
    />
  );
};

export default Expenses;
