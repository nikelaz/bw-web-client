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

type IncomeProps = Readonly<{
  categoryBudgets: Array<any>
}>;

const Income = (props: IncomeProps) => {
  const colDefs: Array<ColDef> = [
    {
      field: 'title',
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
      editable: true
    },
    {
      field: 'currentAmount',
      label: 'Received',
      inputType: 'number',
      textAlign: 'right',
      unitSuffix: '$',
      editable: true
    }
  ];

  return (
    <DataGrid
      data={props.categoryBudgets}
      cols={colDefs}
      progressField='progress'
      deleteRows={true}
      onChange={() => 'change'}
      onDelete={() => 'delete'}
    >
      <tfoot>
        <Row>
          <Cell>
            <Button type="link" icon={IconTypes.Plus}>New Income</Button>
          </Cell>
          <Cell textAlign="right" fontWeight="bold" unitSuffix="$">
            3000
          </Cell>
          <Cell textAlign="right" fontWeight="bold" unitSuffix="$">
            3000
          </Cell>
        </Row>
      </tfoot>
    </DataGrid>
  );
};

export default Income;
