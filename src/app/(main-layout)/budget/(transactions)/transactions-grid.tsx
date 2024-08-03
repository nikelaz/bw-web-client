'use client';

import {
  DataGrid,
  Row,
  Cell,
  Button,
  IconTypes,
  HeaderCell,
  Pagination,
  useDialog,
} from '@nikelaz/bw-ui';
import { ColDef } from '@nikelaz/bw-ui/dist/components/data-grid/data-grid.types';
import { useState } from 'react';
import { useTransactionsModel } from '@/view-models/transactions-model';
import { DeleteTransactionDialog } from './delete-transaction-dialog';
import { updateTransaction } from '@/actions/transaction-actions';
import { useBudgetModel } from '@/view-models/budget-model';

type IncomeProps = Readonly<{
  token?: string
}>;

const TransactionsGrid = (props: IncomeProps) => {
  const transactionsModel = useTransactionsModel();
  const budgetModel = useBudgetModel();
  const [deleteDataRow, setDeleteDataRow] = useState();
  const deleteDialogModel = useDialog();

  const transactions = transactionsModel.transactions;
  
  if (!transactions || transactions.length === 0) return 'Loading...';

  const colDefs: Array<ColDef> = [
    {
      field: 'title',
      label: 'Transactions',
      editable: true,
      fontWeight: 'bold',
      headerCellRenderer() {
        return (
          <HeaderCell fontSize='l' textColor='dark' key={this.field}>
            {this.label}
          </HeaderCell>
        );
      }
    },
    {
      field: 'date',
      label: 'Date',
      textAlign: 'right',
      inputType: 'date',
      editable: true,
      width: '14rem',
    },
    {
      field: 'categoryBudget.category.title',
      label: 'Category ',
      textAlign: 'right',
      editable: false,
    },
    {
      field: 'amount',
      label: 'Amount',
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      editable: true,
      width: '14rem'
    }
  ];

  const rowDeleteHandler = async (data: any) => {
    setDeleteDataRow(data);

    deleteDialogModel[1](true);
  };

  const rowChangeHandler = async ({ rowData }: any) => {
    try {
      await updateTransaction(props.token, rowData);
    } catch (error: any) {
      return alert(error);
    }

    transactionsModel.refresh();
    budgetModel.refresh();
  };

  return (
    <>
      <DataGrid
        data={transactions}
        cols={colDefs}
        progressComputeFunction={(row: any) => {
          return (parseFloat(row.currentAmount) / parseFloat(row.amount)) * 100;
        }}
        deleteRows={true}
        onChange={rowChangeHandler}
        onDelete={rowDeleteHandler}
      >
        <tfoot>
          <Row>
            <Cell>
              <Button style='link' icon={IconTypes.Plus} onClick={() => transactionsModel.setIsCreateDialogOpen(true)}>New Transaction</Button>
            </Cell>
            <Cell textAlign='right' colSpan={3}>
              <Pagination>
                {transactionsModel.page !== 0 && transactions.totalPages !== 1 ? (
                  <Button style='link' icon={IconTypes.ChevronLeft} onClick={() => transactionsModel.prevPage()}>Previous</Button>
                ) : null}
                {(transactionsModel.page + 1) !== transactionsModel.totalPages ? (
                  <Button style='link' icon={IconTypes.ChevronRight} iconPosition='right' onClick={() => transactionsModel.nextPage()}>Next</Button>
                ) : null }
              </Pagination>
            </Cell>
          </Row>
        </tfoot>
      </DataGrid>
      <DeleteTransactionDialog token={props.token} isOpen={deleteDialogModel[0]} setIsOpen={deleteDialogModel[1]} onKeyDown={deleteDialogModel[2]} row={deleteDataRow} />
    </>
  );
};

export default TransactionsGrid;
