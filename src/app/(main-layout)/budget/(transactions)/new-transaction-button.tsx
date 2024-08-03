'use client';

import {
  Button,
  IconTypes,
  Dialog,
  DialogForm,
  DialogFooter,
  Input,
  Select
} from '@nikelaz/bw-ui';
import { useBudgetModel } from '@/view-models/budget-model';
import { CategoryType } from '@/types/category';
import { createTransaction } from '@/actions/transactions-actions';
import { useTransactionsModel } from '@/view-models/transactions-model';
import { useCategoryBudgetModel } from '@/view-models/category-budget-model';

const categoryBudgetToOption = (categoryBudget: any) => ({
  label: categoryBudget.category.title,
  value: categoryBudget.id
});

const NewTransactionButton = (props: any) => {
  const budgetModel = useBudgetModel();
  const categoryBudgetModel = useCategoryBudgetModel();
  const transactionsModel = useTransactionsModel();

  const options = {
    [CategoryType.INCOME]: categoryBudgetModel.categoryBudgetsByType[CategoryType.INCOME].map(categoryBudgetToOption),
    [CategoryType.EXPENSE]: categoryBudgetModel.categoryBudgetsByType[CategoryType.EXPENSE].map(categoryBudgetToOption),
    [CategoryType.DEBT]: categoryBudgetModel.categoryBudgetsByType[CategoryType.DEBT].map(categoryBudgetToOption),
    [CategoryType.SAVINGS]: categoryBudgetModel.categoryBudgetsByType[CategoryType.SAVINGS].map(categoryBudgetToOption),
  }

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newTransaction = {
      title: formData.get('title'),
      date: formData.get('date'),
      categoryBudget: {
        id: formData.get('category'),
      },
      amount: formData.get('amount'),
    };

    await createTransaction(props.token, newTransaction);

    transactionsModel.refresh();
    budgetModel.refresh();
    transactionsModel.setIsCreateDialogOpen(false);
  };

  return (
    <>
      <Button icon={IconTypes.Plus} onClick={() => transactionsModel.setIsCreateDialogOpen(true)}>New Transaction</Button>
      <Dialog
        isOpen={transactionsModel.isCreateDialogOpen}
        hasCloseBtn={true}
        onClose={() => transactionsModel.setIsCreateDialogOpen(false)}
        onKeyDown={transactionsModel.onCreateDialogKeyDown}
        title="Create New Transaction"
      >
        <form onSubmit={formSubmitHandler} method="dialog">
          <DialogForm>
            <Input autoFocus={true} type="text" name="title" placeholder="Description" />
            <Input required={true} type="date" name="date" defaultValue={(new Date).toISOString().split('T')[0]} />
            <Select name="category">
              <optgroup label="Income">
                {options[CategoryType.INCOME].map((option: any) => (
                  <option key={option.value} value={option.value}>{option.label}</option>)
                )}
              </optgroup>
              <optgroup label="Expenses">
                {options[CategoryType.EXPENSE].map((option: any) => (
                  <option key={option.value} value={option.value}>{option.label}</option>)
                )}
              </optgroup>
              <optgroup label="Debt">
                {options[CategoryType.DEBT].map((option: any) => (
                  <option key={option.value} value={option.value}>{option.label}</option>)
                )}
              </optgroup>
              <optgroup label="Savings">
                {options[CategoryType.SAVINGS].map((option: any) => (
                  <option key={option.value} value={option.value}>{option.label}</option>)
                )}
              </optgroup>
            </Select>
            <Input required={true} type="number" step="0.01" name="amount" placeholder="Amount" />
          </DialogForm>
          <DialogFooter>
            <Button autoFocus={true}>Save Changes</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default NewTransactionButton;

