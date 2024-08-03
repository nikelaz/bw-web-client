'use client';

import { CategoryType } from '@/types/category';
import { CategoryBudgetViewModel, useCategoryBudgetModel } from '@/view-models/category-budget-model';
import CategoryBudgetGrid from './category-budget-grid';

const Savings = () => {
  const categoryBudgetModel: CategoryBudgetViewModel = useCategoryBudgetModel();

  return (
    <CategoryBudgetGrid
      categoryBudgets={categoryBudgetModel.categoryBudgetsByType[CategoryType.SAVINGS]}
      label="Savings"
      hasAccAmount={true}
      accAmountLabel="Accumulated"
      amountLabel="Planned"
      currentAmountLabel="Saved"
      newItemCTALabel="New Fund"
      newItemDialogHeading="Create New Fund"
      exampleCategory="College Fund"
    />
  );
};

export default Savings;
