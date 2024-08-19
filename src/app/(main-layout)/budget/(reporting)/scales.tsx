'use client';

import { CategoryBudgetViewModel, useCategoryBudgetModel } from '@/view-models/category-budget-model';
import { CategoryType } from '@/types/category';
import { Scale } from '@nikelaz/bw-ui';

const Scales = () => {
  const categoryBudgetModel: CategoryBudgetViewModel = useCategoryBudgetModel();
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
    <div className="flex flex-row gap-8">
      <div className="flex-1 p-6 bg-white rounded-xl">
        <Scale
          topValue={totalIncome}
          topLabel="Income"
          unit="$"
          progress={leftToBudgetProgress}
          leftValue={totalPlanned}
          leftLabel="Planned"
          rightValue={leftToBudget}
          rightLabel="Left to Budget"
        />
      </div>
      <div className="flex-1 p-6 bg-white rounded-xl">
        <Scale
          topValue={totalIncome}
          topLabel="Planned"
          unit="$"
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
