import { Dialog, DialogFooter } from '@nikelaz/bw-ui';
import { Button } from '@nikelaz/bw-ui';
import { useBudgetModel, BudgetActionsTypes } from './budget-model';
import { deleteCategoryBudget } from '@/actions/budget-actions';

type DeleteCategoryDialogProps = Readonly<{
  isOpen: boolean,
  setIsOpen: Function,
  onKeyDown: React.KeyboardEventHandler<Element>,
  token?: string,
  row: any,
}>;

export const DeleteCategoryDialog = (props: DeleteCategoryDialogProps) => {
  const [budgetModel, dispatch] = useBudgetModel();

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      await deleteCategoryBudget(props.token, props.row.id);
    } catch (error: any) {
      return alert(error);
    }

    dispatch({
      type: BudgetActionsTypes.DELETE_CATEGORY_BUDGET,
      payload: {
        budgetId: budgetModel.currentBudget.id,
        categoryBudget: props.row,
      },
    });

    props.setIsOpen(false);
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      onKeyDown={props.onKeyDown}
      title="Delete Category"
    >
      <form onSubmit={formSubmitHandler} method="dialog">
        <p className="mb-3">You are about to delete a category:</p>
        <div className="text-lg font-semibold p-2 pl-3 pr-3 bg-grey1 rounded-lg border border-grey2 mb-3">{props.row?.category.title}</div>
        <p>Are you sure?</p>
        <DialogFooter className='gap-4'>
          <Button style="link" type="button" onClick={() => props.setIsOpen(false)} autoFocus={true}>Cancel</Button> 
          <Button>Delete</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
