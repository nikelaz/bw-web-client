'use client';

import { CategoryType } from '@/types/category';
import { CategoryBudgetViewModel, useCategoryBudgetModel } from '@/view-models/category-budget-model';
import CategoryBudgetGrid from './category-budget-grid';

const Debt = () => {
  const categoryBudgetModel: CategoryBudgetViewModel = useCategoryBudgetModel();

  return (
    <CategoryBudgetGrid
      categoryBudgets={categoryBudgetModel.categoryBudgetsByType[CategoryType.DEBT]}
      label="Debt"
      hasAccAmount={true}
      accAmountLabel="Leftover Debt"
      amountLabel="Planned"
      currentAmountLabel="Paid"
      newItemCTALabel="New Loan"
      newItemDialogHeading="Create New Loan"
      exampleCategory="Mortgage"
    />
  );
};

export default Debt;
