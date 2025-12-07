import { useAuth } from '@/helpers/auth';
import TransactionsGrid from '../budget/(transactions)/transactions-grid';
import NewTransactionButton from '../budget/(transactions)/new-transaction-button';
import TransactionsFilter from '../budget/(transactions)/transactions-filter';
import { BudgetSwitch } from '../budget/(budget-column)/budget-switch';

const Transactions = async () => {
  const [token] = await useAuth();

  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col gap-2 sm:gap-8 flex-1 bg-grey4 min-h-screen p-6 overflow-hidden w-full" style={{maxWidth: '55rem'}}>
        <div className="flex w-full h-10 z-1 relative">
          <BudgetSwitch />
        </div>
        <div className="mb-5 sm:mb-0 full flex flex-wrap justify-between gap-5">
          <TransactionsFilter />
          <NewTransactionButton style='link' token={token} />
        </div>
        <TransactionsGrid token={token} />
      </div>
    </main>
  );
}

export default Transactions;
