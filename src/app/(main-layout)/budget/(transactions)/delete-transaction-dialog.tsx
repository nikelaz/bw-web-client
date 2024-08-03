'use client';

import { deleteTransaction } from '@/actions/transactions-actions';
import { Dialog, DialogFooter } from '@nikelaz/bw-ui';
import { Button } from '@nikelaz/bw-ui';
import { useTransactionsModel } from '@/view-models/transactions-model';
import { useBudgetModel } from '@/view-models/budget-model';
import type { Transaction } from '@/types/transaction';

type DeleteTransactionDialogProps = Readonly<{
  isOpen: boolean,
  setIsOpen: Function,
  onKeyDown: React.KeyboardEventHandler<Element>,
  token?: string,
  row?: Transaction,
}>;

export const DeleteTransactionDialog = (props: DeleteTransactionDialogProps) => {
  const transactionsModel = useTransactionsModel();
  const budgetModel = useBudgetModel();

  const formSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!props.row) return;

    try {
      await deleteTransaction(props.token, props.row.id);
    } catch (error: any) {
      return alert(error);
    }

    transactionsModel.refresh();
    budgetModel.refresh();
    props.setIsOpen(false);
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      onKeyDown={props.onKeyDown}
      title="Delete Transaction"
    >
      <form onSubmit={formSubmitHandler} method="dialog">
        <p className="mb-3">You are about to delete a transaction:</p>
        <div className="text-lg font-semibold p-2 pl-3 pr-3 bg-grey1 rounded-lg border border-grey2 mb-3">{props.row?.title || props.row?.categoryBudget?.category?.title}</div>
        <p>Are you sure?</p>
        <DialogFooter className='gap-4'>
          <Button style="link" type="button" onClick={() => props.setIsOpen(false)} autoFocus={true}>Cancel</Button> 
          <Button>Delete</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
