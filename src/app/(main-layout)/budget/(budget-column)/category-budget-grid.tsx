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
import type { CategoryBudget } from '@/types/category-budget';

type CategoryBudgetGridProps = Readonly<{
  categoryBudgets: Array<CategoryBudget>,
  label: string,
  hasAccAmount: boolean,
  accAmountLabel?: string,
  accAmountWidth?: string,
  amountLabel: string,
  amountWidth?: string,
  currentAmountLabel: string,
  currentAmountWidth?: string,
  newItemCTALabel: string,
  newItemDialogHeading: string,
  exampleCategory: string,
  categoryType: CategoryType
}>;

const CategoryBudgetGrid = (props: CategoryBudgetGridProps) => {
  const categoryBudgetModel = useCategoryBudgetModel();
  const createDialogModel = useDialog();
  const deleteDialogModel = useDialog();
  const [deleteDataRow, setDeleteDataRow] = useState<CategoryBudget | null>(null);

  const colDefs: Array<ColDef> = [
    {
      field: 'category.title',
      label: props.label,
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
      label: props.amountLabel,
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      editable: true,
      width: props.amountWidth || '14rem',
    },
    {
      field: 'currentAmount',
      label: props.currentAmountLabel,
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      width: props.currentAmountWidth || '14rem',
    }
  ];

  if (props.hasAccAmount) {
    colDefs.splice(1, 0, {
      field: 'category.accAmount',
      label: props.accAmountLabel,
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      editable: true,
      width: props.accAmountWidth || '14rem',
    });
  }

  const rowDeleteHandler = async (data: CategoryBudget) => {
    setDeleteDataRow(data);
    deleteDialogModel[1](true); // open delete confirmation dialog
  };

  const rowChangeHandler = async ({ rowData }: { rowData: CategoryBudget }) => {
    await categoryBudgetModel.updateCategoryBudget({
      id: rowData.id,
      amount: rowData.amount,
      category: rowData.category
    });
  };

  return (
    <>
      <DataGrid
        data={props.categoryBudgets}
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
            if (props.hasAccAmount) totals.accumulated += parseFloat(categoryBudget['category.accAmount']);
          });

          return (
            <Row>
              <Cell>
                <Button
                  style="link"
                  icon={IconTypes.Plus}
                  onClick={() => createDialogModel[1](true)}
                >
                  {props.newItemCTALabel}
                </Button>
              </Cell>
              {props.hasAccAmount ? (
                <Cell textAlign="right" fontWeight="bold" unitSuffix="$">
                  {totals.accumulated}
                </Cell>
              ) : null}
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
        categoryType={props.categoryType}
        dialogHeading={props.newItemDialogHeading}
        exampleCategory={props.exampleCategory}
        isOpen={createDialogModel[0]}
        setIsOpen={createDialogModel[1]}
        onKeyDown={createDialogModel[2]}
        showAccAmountField={props.hasAccAmount}
        accAmountLabel={props.accAmountLabel}
      />
      <DeleteCategoryDialog
        isOpen={deleteDialogModel[0]}
        setIsOpen={deleteDialogModel[1]}
        onKeyDown={deleteDialogModel[2]}
        row={deleteDataRow}
      />
    </>
  );
};

export default CategoryBudgetGrid;
