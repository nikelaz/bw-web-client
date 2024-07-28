'use client';

import { Dropdown, MonthsSwitch, DropdownOption } from '@nikelaz/bw-ui';
import { useBudgetModel } from './budget-model';

const monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getFormattedLabel = (date: Date) => `${monthLabels[date.getMonth()]} ${date.getFullYear()}`;

export const BudgetSwitch = () => {
  const [budgetModel] = useBudgetModel();

  const options = budgetModel.budgets.map((budget: any, index: number) => {
    const date = new Date(budget.month);

    return {
      label: getFormattedLabel(date),
      value: budget,
      isActive: budget.id === budgetModel.currentBudget.id,
    };
  });

  const dropdownChangeHandler = (options: Array<DropdownOption>) => {
    const activeOption = options.find(option => option.isActive);
    if (!activeOption) return;
    budgetModel.setCurrentBudgetId(activeOption.value.id);
  };

  return (
    <Dropdown
      options={options}
      onChange={dropdownChangeHandler}
    >
      <MonthsSwitch>{getFormattedLabel(new Date(budgetModel.currentBudget.month))}</MonthsSwitch>
    </Dropdown>
  );
};
