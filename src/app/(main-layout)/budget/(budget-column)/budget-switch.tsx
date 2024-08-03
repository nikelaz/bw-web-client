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
import { useBudgetModel } from './budget-model';
import { FormEvent } from 'react';
import { createBudget } from '@/actions/budget-actions';
import { useTransactionsModel } from '../(transactions)/transactions-model';

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

type BudgetSwitchProps = Readonly<{
  token?: string,
}>;

export const BudgetSwitch = (props: BudgetSwitchProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen, onCreateDialogKeyDown] = useDialog();
  const budgetModel = useBudgetModel();

  const options = budgetModel.budgets.map((budget: any, index: number) => {
    const date = new Date(budget.month);

    return {
      label: getFormattedLabel(date),
      value: budget,
      isActive: budget.id === budgetModel.currentBudget.id,
    };
  });

  const budgetExistsForMonth = (monthIndex: number) => {
    for (let i = 0; i < budgetModel.budgets.length; i++) {
      const budget = budgetModel.budgets[i];
      const tmpDate = new Date(budget.month);
      if (tmpDate.getMonth() === monthIndex) return true;
    }

    return false;
  };

  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;

  const newBudgetOptions = [];

  for (let i = 0; i < monthLabels.length; i++) {
    const optionDate = new Date();
    optionDate.setMonth(i);
    const budgetExists = budgetExistsForMonth(i);
    const isPast = now.getMonth() > i;

    if (isPast && !budgetExists) continue;

    newBudgetOptions.push({
      label: `${monthLabels[i]} ${currentYear}`,
      value: optionDate.toISOString(),
      disabled: budgetExistsForMonth(i),
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
  
  const optionsWithCreateButton = [
    ...options,
    {
      label: (
        <>
          <Icon className="mr-3" type={IconTypes.Plus} width={14} height={14} fill="currentColor" />
          <span className="w-max">Create New Budget</span>
        </>
      ),
      value: 0,
      onClick: () => setIsCreateDialogOpen(true)
    }
  ];

  const dropdownChangeHandler = (options: Array<DropdownOption>) => {
    const activeOption = options.find(option => option.isActive);
    if (!activeOption) return;
    budgetModel.setCurrentBudgetId(activeOption.value.id);
  };

  const createBudgetFormSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const month = formData.get('month');
    const copyFrom = formData.get('copyFrom');
    if (!month || !copyFrom) return;
    await createBudget(props.token, month.toString(), parseInt(copyFrom.toString()));
    setIsCreateDialogOpen(false);
    await budgetModel.refresh();
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
                {options.map((option: any, index: number) => (
                  <option key={option.value.id} value={option.value.id}>{option.label}</option>
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
