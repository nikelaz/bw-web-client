import TransactionsGrid from '../(transactions)/transactions-grid';
import TransactionsFilter from './transactions-filter';

const Transactions = (props: any) => {
  return (
    <>
      <h1 className="text-2xl font-bold h-10 flex items-center">Transactions</h1>
      <TransactionsFilter />
      <TransactionsGrid token={props.token} />
    </>
  );
};

export default Transactions;
