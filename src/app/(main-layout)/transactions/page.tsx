import { useAuth } from '@/helpers/auth';
import ModelsContainer from '@/app/(main-layout)/budget/models-container';
import TransactionsGrid from '../budget/(transactions)/transactions-grid';
import NewTransactionButton from '../budget/(transactions)/new-transaction-button';
import TransactionsFilter from '../budget/(transactions)/transactions-filter';

const Transactions = async () => {
  const [token, user] = useAuth();

  return (
    <main className="flex min-h-screen">
      <ModelsContainer token={token} user={user}>
        {/* left column */}
        <div className="flex flex-col gap-2 sm:gap-8 flex-1 bg-grey4 min-h-screen p-6 overflow-hidden w-full" style={{maxWidth: '55rem'}}>
          <h1 className="text-2xl font-bold h-10 flex items-center mb-3">Transactions</h1>
          <div className="mb-5 sm:mb-0 full flex flex-wrap justify-between gap-5">
            <TransactionsFilter />
            <NewTransactionButton style='link' token={token} />
          </div>
          <TransactionsGrid token={token} />
        </div>
      </ModelsContainer>
    </main>
  );
}

export default Transactions;
