'use client';

import {
  DataGrid,
  Row,
  Cell,
  Button,
  IconTypes,
  HeaderCell
} from '@nikelaz/bw-ui';
import { ColDef } from '@nikelaz/bw-ui/dist/components/data-grid/data-grid.types';
import { useBudgetModel } from './budget-model';
import { CategoryType } from '@/types/category-type';
import { useDialog } from '@nikelaz/bw-ui';
import { CreateCategoryBudgetDialog } from './create-category-budget-dialog';
import { DeleteCategoryDialog } from './delete-category-dialog';
import { useState } from 'react';
import { updateCategoryBudget } from '@/actions/budget-actions';
import { useTransactionsModel } from '../(transactions)/transactions-model';

type IncomeProps = Readonly<{
  token?: string
}>;

const Expenses = (props: IncomeProps) => {
  const budgetModel = useBudgetModel();
  const transactionsModel = useTransactionsModel();
  const createDialogModel = useDialog();
  const deleteDialogModel = useDialog();
  const [deleteDataRow, setDeleteDataRow] = useState(null);

  if (budgetModel === null) return null;

  const categoryBudgets = budgetModel.categoryBudgetsByType[CategoryType.EXPENSE];

  const colDefs: Array<ColDef> = [
    {
      field: 'category.title',
      label: 'Expenses',
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
      field: 'amount',
      label: 'Planned',
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      editable: true,
      width: '14rem',
    },
    {
      field: 'currentAmount',
      label: 'Spend',
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      width: '14rem',
    }
  ];

  const rowDeleteHandler = async (data: any) => {
    setDeleteDataRow(data);

    // Open delete confirmation dialog
    deleteDialogModel[1](true);
  };

  const rowChangeHandler = async ({ rowData }: any) => {
    const categoryBudget = {
      id: rowData.id,
      amount: rowData.amount,
      category: rowData.category
    };

    try {
      await updateCategoryBudget(props.token, categoryBudget);
    } catch (error: any) {
      return alert(error);
    }

    budgetModel.refresh();
    transactionsModel.refresh();
  };

  return (
    <>
      <DataGrid
        data={categoryBudgets}
        cols={colDefs}
        progressComputeFunction={(row: any) => {
          return (parseFloat(row.currentAmount) / parseFloat(row.amount)) * 100;
        }}
        deleteRows={true}
        onChange={rowChangeHandler}
        onDelete={rowDeleteHandler}
        tfootRenderer={(data: any) => {
          const totals = {
            planned: 0,
            received: 0,
          };

          data.forEach((categoryBudget: any) => {
            totals.planned += parseFloat(categoryBudget.amount);
            totals.received += parseFloat(categoryBudget.currentAmount);
          });

          return (
            <Row>
              <Cell>
                <Button
                  style="link"
                  icon={IconTypes.Plus}
                  onClick={() => createDialogModel[1](true)}
                >
                  New Category
                </Button>
              </Cell>
              <Cell textAlign="right" fontWeight="bold" unitSuffix="$">
                {totals.planned}
              </Cell>
              <Cell textAlign="right" fontWeight="bold" unitSuffix="$">
                {totals.received}
              </Cell>
            </Row>
          )
        }}
      />

      <CreateCategoryBudgetDialog
        categoryType={CategoryType.EXPENSE}
        dialogHeading="Create New Category"
        exampleCategory="Groceries"
        isOpen={createDialogModel[0]}
        setIsOpen={createDialogModel[1]}
        onKeyDown={createDialogModel[2]}
        token={props.token}
      />
      <DeleteCategoryDialog
        isOpen={deleteDialogModel[0]}
        setIsOpen={deleteDialogModel[1]}
        onKeyDown={deleteDialogModel[2]}
        token={props.token}
        row={deleteDataRow}
      />
    </>
  );
};

export default Expenses;
