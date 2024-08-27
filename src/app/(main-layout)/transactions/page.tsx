import { useAuth } from '@/helpers/auth';
import ModelsContainer from '@/app/(main-layout)/budget/models-container';
import TransactionsGrid from '../budget/(transactions)/transactions-grid';

const Transactions = async () => {
  const [token, user] = useAuth();

  return (
    <main className="flex min-h-screen">
      <ModelsContainer token={token} user={user}>
        {/* left column */}
        <div className="flex flex-col gap-8 flex-1 bg-grey2 min-h-screen p-6 overflow-hidden w-full" style={{maxWidth: '55rem'}}>
          <h1 className="text-2xl font-bold h-10 flex items-center">Transactions</h1>
          <TransactionsGrid token={token} />
        </div>
      </ModelsContainer>
    </main>
  );
}

export default Transactions;
