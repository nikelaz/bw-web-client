import { Dialog, DialogForm, Input, DialogFooter } from '@nikelaz/bw-ui';
import { Button } from '@nikelaz/bw-ui';
import { useBudgetModel } from '@/view-models/budget-model';
import { CategoryType } from '@/types/category';
import { useCategoryBudgetModel } from '@/view-models/category-budget-model';
import { useRef } from 'react';

type CreateCategoryBudgetDialogProps = Readonly<{
  isOpen: boolean,
  setIsOpen: Function,
  onKeyDown: React.KeyboardEventHandler<Element>,
  categoryType: CategoryType,
  dialogHeading: string,
  exampleCategory: string,
  showAccAmountField?: boolean,
  accAmountLabel?: string,
}>;

export const CreateCategoryBudgetDialog = (props: CreateCategoryBudgetDialogProps) => {
  const budgetModel = useBudgetModel();
  const categoryBudgetModel = useCategoryBudgetModel();
  const formRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

  const closeDialog = () => {
    props.setIsOpen(false);
    if (formRef.current) formRef.current.reset();
  }

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const amount = formData.get('amount');
    const category = formData.get('category');
    const accAmount = formData.get('accAmount');

    if (!amount || !category) {
      alert('Amount and Category are required fields.');
      return;
    };

    const categoryBudget = {
      budget: budgetModel.currentBudget,
      amount: parseFloat(amount.toString()),
      category: {
        title: category,
        type: props.categoryType,
        accAmount: accAmount || 0,
      },
    };

    await categoryBudgetModel.createCategoryBudget(categoryBudget);
    closeDialog();
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      hasCloseBtn={true}
      onClose={() => closeDialog()}
      onKeyDown={props.onKeyDown}
      title={props.dialogHeading}
    >
      <form ref={formRef} onSubmit={formSubmitHandler} method="dialog">
        <DialogForm>
          <Input autoFocus={true} required={true} type="text" name="category" placeholder={`Category (e.g. ${props.exampleCategory})`} />
          {props.showAccAmountField ? (
            <Input type="number" step="0.01" name="accAmount" placeholder={props.accAmountLabel} />
          ) : null}
          <Input required={true} type="number" step="0.01" name="amount" placeholder="Planned Amount" />
        </DialogForm>
        <DialogFooter>
          <Button autoFocus={true}>Save Changes</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
