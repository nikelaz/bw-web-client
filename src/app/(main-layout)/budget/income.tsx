'use client';

import { DataGrid, Row, Cell, Button, IconTypes, Pagination, HeaderCell } from '@nikelaz/bw-ui';

const demoData = [
  {
    id: 1,
    title: 'Phone Bill',
    date: '2024-05-08',
    category: 'Utilities',
    amount: 56.40,
    progress: 0.65,
  },
  {
    id: 2,
    title: 'Groceries @ Store',
    date: '2024-05-08',
    category: 'Groceries',
    amount: 125.30,
    progress: 0.3,
  },
  {
    id: 3,
    title: 'Rent',
    date: '2024-05-08',
    category: 'Housing',
    amount: 850,
    progress: 1,
  },
  {
    id: 4,
    title: 'Gift',
    date: '2024-05-08',
    category: 'Gifts',
    amount: 25.50,
    progress: 0.78,
  }
];

const Income = () => {
  return (
    <DataGrid
      data={demoData}
      cols={[{
        field: 'title',
        label: 'Income',
        editable: true,
        fontWeight: 'bold',
        headerCellRenderer() {
          return <HeaderCell fontSize='l' textColor='dark' key={this.field}>
                {this.label}
              </HeaderCell>;
        }
      }, {
        field: 'date',
        label: 'Date',
        textAlign: 'right',
        inputType: 'date',
        editable: true
      }, {
        field: 'category',
        label: 'Category',
        textAlign: 'right'
      }, {
        field: 'amount',
        label: 'Amount',
        inputType: 'number',
        textAlign: 'right',
        unitSuffix: '$',
        editable: true
      }]}
      progressField='progress'
      deleteRows={true}
      onChange={() => 'change'}
      onDelete={() => 'delete'}
    >
      <tfoot>
        <Row>
          <Cell>
            <Button type='link' icon={IconTypes.Plus}>New Transaction</Button>
          </Cell>
          <Cell textAlign='right' colSpan={3}>
            <Pagination>
              <Button type='link' icon={IconTypes.ChevronLeft}>Previous</Button>
              <Button type='link' icon={IconTypes.ChevronRight} iconPosition='right'>Next</Button>
            </Pagination>
          </Cell>
        </Row>
      </tfoot>
    </DataGrid>
  );
};

export default Income;
