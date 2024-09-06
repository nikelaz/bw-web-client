'use client';

import {
  Dropdown,
  MonthsSwitch,
  DropdownOption,
  useDialog,
  Dialog,
  DialogForm,
  DialogFooter,
  Button,
  Icon,
  IconTypes,
  Select,
  Label
} from '@nikelaz/bw-ui';
import { FormEvent } from 'react';
import { useBudgetModel } from '@/view-models/budget-model';
import { monthLabels, getFormattedLabel } from '@/helpers/formatting-utils';
import type { Budget } from '@/types/budget';

const generateNewBudgetOptions = (budgetModel: any) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  const newBudgetOptions = [];

  for (let i = 0; i < monthLabels.length; i++) {
    const optionDate = new Date();
    optionDate.setMonth(i);
    const budgetExists = budgetModel.budgetExistsForMonth(i);
    const isPast = now.getMonth() > i;

    if (isPast && !budgetExists) continue;

    newBudgetOptions.push({
      label: `${monthLabels[i]} ${currentYear}`,
      value: optionDate.toISOString(),
      disabled: budgetModel.budgetExistsForMonth(i),
    });
  }

  for (let i = 0; i < 3; i++) {
    const optionDate = new Date();
    optionDate.setFullYear(nextYear);
    optionDate.setMonth(i);

    newBudgetOptions.push({
      label: `${monthLabels[i]} ${nextYear}`,
      value: optionDate.toISOString(),
      disabled: false,
    });
  }

  return newBudgetOptions;
}

export const BudgetSwitch = () => {
  const budgetModel = useBudgetModel();
  const [isCreateDialogOpen, setIsCreateDialogOpen, onCreateDialogKeyDown] = useDialog();

  const options = budgetModel.budgets.map((budget: Budget) => {
    const date = new Date(budget.month);

    return {
      label: getFormattedLabel(date),
      value: budget.id,
      isActive: budget.id === budgetModel.currentBudget.id,
    };
  });

  const optionsWithCreateButton = [
    ...options,
    {
      label: (
        <>
          <Icon className="mr-3" type={IconTypes.Plus} width={14} height={14} fill="currentColor" />
          <span className="w-max">Create New Budget</span>
        </>
      ),
      value: 'create-btn',
      onClick: () => setIsCreateDialogOpen(true)
    }
  ];

  const newBudgetOptions = generateNewBudgetOptions(budgetModel);

  const dropdownChangeHandler = (options: Array<DropdownOption>) => {
    const activeOption = options.find(option => option.isActive);
    if (!activeOption) return;
    budgetModel.setCurrentBudgetId(activeOption.value);
  };

  const createBudgetFormSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await budgetModel.createBudget(
      {
        month: formData.get('month')?.toString(),
      },
      {
        id: formData.get('copyFrom')?.toString(),
      }
    );
    setIsCreateDialogOpen(false);
  };

  return (
    <>
      <Dropdown
        options={optionsWithCreateButton}
        onChange={dropdownChangeHandler}
      >
        <MonthsSwitch>{getFormattedLabel(new Date(budgetModel.currentBudget.month))}</MonthsSwitch>
      </Dropdown>
      <Dialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onKeyDown={onCreateDialogKeyDown}
        hasCloseBtn={true}
        title='Create a New Budget'
      >
        <form onSubmit={createBudgetFormSubmitHandler}>
          <DialogForm>
            <div>
              <Label htmlFor="month">For Month</Label>
              <Select autoFocus={true} name="month" id="month">
                {newBudgetOptions.map((option: any) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="copyFrom">Copy From</Label>
              <Select name="copyFrom" id="copyFrom">
                {options.map((option: any) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </div>
          </DialogForm>
          <DialogFooter>
            <Button>Create Budget</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};
