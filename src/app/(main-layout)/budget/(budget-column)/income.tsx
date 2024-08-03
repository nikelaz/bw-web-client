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

type IncomeProps = Readonly<{
  token?: string
}>;

const Income = (props: IncomeProps) => {
  const categoryBudgetModel = useCategoryBudgetModel();
  const createDialogModel = useDialog();
  const deleteDialogModel = useDialog();
  const [deleteDataRow, setDeleteDataRow] = useState(null);

  const categoryBudgets = categoryBudgetModel.categoryBudgetsByType[CategoryType.INCOME];

  const colDefs: Array<ColDef> = [
    {
      field: 'category.title',
      label: 'Income',
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
      label: 'Received',
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
                  New Income
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
        categoryType={CategoryType.INCOME}
          dialogHeading="Create New Income" 
          exampleCategory="Salary"
          isOpen={createDialogModel[0]}
          setIsOpen={createDialogModel[1]}
          onKeyDown={createDialogModel[2]}
          token={props.token}
        />
      <DeleteCategoryDialog isOpen={deleteDialogModel[0]} setIsOpen={deleteDialogModel[1]} onKeyDown={deleteDialogModel[2]} token={props.token} row={deleteDataRow} />
    </>
  );
};

export default Income;
