import { Dialog, DialogForm, Input, DialogFooter } from '@nikelaz/bw-ui';
import { Button } from '@nikelaz/bw-ui';
import { useBudgetModel } from './budget-model';
import { CategoryType } from '@/types/category-type';
import { createCategoryBudget } from '@/actions/budget-actions';

type CreateCategoryBudgetDialogProps = Readonly<{
  isOpen: boolean,
  setIsOpen: Function,
  onKeyDown: React.KeyboardEventHandler<Element>,
  token?: string,
  categoryType: CategoryType,
  dialogHeading: string,
  exampleCategory: string,
  showAccAmountField?: boolean,
  accAmountLabel?: string,
}>;

export const CreateCategoryBudgetDialog = (props: CreateCategoryBudgetDialogProps) => {
  const budgetModel = useBudgetModel();

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const amount = formData.get('amount');
    const category = formData.get('category');
    const accAmount = formData.get('accAmount');

    if (!amount || !category) return;

    const categoryBudget = {
      budget: budgetModel.currentBudget,
      amount: parseFloat(amount.toString()),
      category: {
        title: category,
        type: props.categoryType,
        accAmount: accAmount || 0,
      },
    };

    let response;

    try {
      response = await createCategoryBudget(props.token, categoryBudget);
    } catch (error: any) {
      return alert(error.message);
    }

    budgetModel.refresh();
    props.setIsOpen(false);
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      hasCloseBtn={true}
      onClose={() => props.setIsOpen(false)}
      onKeyDown={props.onKeyDown}
      title={props.dialogHeading}
    >
      <form onSubmit={formSubmitHandler} method="dialog">
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
