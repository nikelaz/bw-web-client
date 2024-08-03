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
import { CategoryType } from '@/types/category';
import { useDialog } from '@nikelaz/bw-ui';
import { CreateCategoryBudgetDialog } from './create-category-budget-dialog';
import { DeleteCategoryDialog } from './delete-category-dialog';
import { useState } from 'react';
import { useCategoryBudgetModel } from '@/view-models/category-budget-model';

type SavingsProps = Readonly<{
  token?: string
}>;

const Savings = (props: SavingsProps) => {
  const categoryBudgetModel = useCategoryBudgetModel();
  const createDialogModel = useDialog();
  const deleteDialogModel = useDialog();
  const [deleteDataRow, setDeleteDataRow] = useState(null);

  const categoryBudgets = categoryBudgetModel.categoryBudgetsByType[CategoryType.SAVINGS];

  const colDefs: Array<ColDef> = [
    {
      field: 'category.title',
      label: 'Savings',
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
      field: 'category.accAmount',
      label: 'Accumulated',
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      editable: true,
      width: '14rem',
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
      label: 'Saved',
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      width: '14rem',
    }
  ];

  const rowDeleteHandler = async (data: any) => {
    setDeleteDataRow(data);
    deleteDialogModel[1](true); // open delete confirmation dialog
  };

  const rowChangeHandler = async ({ rowData }: any) => {
    await categoryBudgetModel.updateCategoryBudget({
      id: rowData.id,
      amount: rowData.amount,
      category: rowData.category
    });
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
            accumulated: 0
          };

          data.forEach((categoryBudget: any) => {
            totals.planned += parseFloat(categoryBudget.amount);
            totals.received += parseFloat(categoryBudget.currentAmount);
            totals.accumulated += parseFloat(categoryBudget['category.accAmount']);
          });

          return (
            <Row>
              <Cell>
                <Button
                  style="link"
                  icon={IconTypes.Plus}
                  onClick={() => createDialogModel[1](true)}
                >
                  New Fund
                </Button>
              </Cell>
              <Cell textAlign="right" fontWeight="bold" unitSuffix="$">
                {totals.accumulated}
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
        categoryType={CategoryType.SAVINGS}
        dialogHeading="Create New Fund"
        exampleCategory="Emergency Fund"
        isOpen={createDialogModel[0]}
        setIsOpen={createDialogModel[1]}
        onKeyDown={createDialogModel[2]}
        token={props.token}
        showAccAmountField={true}
        accAmountLabel='Accumulated'
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

export default Savings;
