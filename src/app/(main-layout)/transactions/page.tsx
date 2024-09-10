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
          <NewTransactionButton style='link' token={token} className="sm:!hidden" />
          <div className="my-2 sm:mt-0 full">
            <TransactionsFilter />
          </div>
          <TransactionsGrid token={token} />
        </div>
      </ModelsContainer>
    </main>
  );
}

export default Transactions;
