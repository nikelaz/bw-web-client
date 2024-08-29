'use client';

import { CategoryBudgetViewModel, useCategoryBudgetModel } from '@/view-models/category-budget-model';
import { CategoryType } from '@/types/category';
import { Scale } from '@nikelaz/bw-ui';
import { useUserModel } from '@/view-models/user-model';

const Scales = () => {
  const categoryBudgetModel: CategoryBudgetViewModel = useCategoryBudgetModel();
  const userModel = useUserModel();
  const incomeCategoryBudgets = categoryBudgetModel.categoryBudgetsByType[CategoryType.INCOME];
  const nonIncomeCategoryBudgets = [
    ...categoryBudgetModel.categoryBudgetsByType[CategoryType.EXPENSE],
    ...categoryBudgetModel.categoryBudgetsByType[CategoryType.SAVINGS],
    ...categoryBudgetModel.categoryBudgetsByType[CategoryType.DEBT],
  ]

  const totalIncome = incomeCategoryBudgets.reduce((accumulator, categoryBudget) => accumulator += categoryBudget.amount, 0);
  const totalPlanned = nonIncomeCategoryBudgets.reduce((accumulator, categoryBudget) => accumulator += categoryBudget.amount, 0);
  const leftToBudget = totalIncome - totalPlanned;
  const leftToBudgetProgress = (totalPlanned / totalIncome) * 100;
  const actual = nonIncomeCategoryBudgets.reduce((accumulator, categoryBudget) => accumulator += categoryBudget.currentAmount, 0);
  const plannedVsActualProgress = (actual / totalIncome) * 100;

  return (
    <div className="flex flex-col gap-2 s:gap-8 sm:flex-row">
      <div className="flex-1 p-6 bg-grey1 rounded-xl">
        <Scale
          topValue={totalIncome}
          topLabel="Income"
          unit={userModel.getCurrency()}
          progress={leftToBudgetProgress}
          leftValue={totalPlanned}
          leftLabel="Planned"
          rightValue={leftToBudget}
          rightLabel="Left to Budget"
        />
      </div>
      <div className="flex-1 p-6 bg-grey1 rounded-xl">
        <Scale
          topValue={totalIncome}
          topLabel="Planned"
          unit={userModel.getCurrency()}
          progress={plannedVsActualProgress}
          leftValue={actual}
          leftLabel="Actual"
          rightValue={totalIncome - actual}
          rightLabel="Current Cash"
        />
      </div>
    </div>
  );
}

export default Scales;
