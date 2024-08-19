'use client';

import { CategoryType } from '@/types/category';
import { CategoryBudgetViewModel, useCategoryBudgetModel } from '@/view-models/category-budget-model';
import CategoryBudgetGrid from './category-budget-grid';

const Income = () => {
  const categoryBudgetModel: CategoryBudgetViewModel = useCategoryBudgetModel();

  return (
    <CategoryBudgetGrid
      categoryBudgets={categoryBudgetModel.categoryBudgetsByType[CategoryType.INCOME]}
      label="Income"
      hasAccAmount={false}
      amountLabel="Planned"
      currentAmountLabel="Received"
      newItemCTALabel="New Income"
      newItemDialogHeading="Create New Income"
      exampleCategory="Salary"
      categoryType={CategoryType.INCOME}
    />
  );
};

export default Income;

