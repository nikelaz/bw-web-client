import { useAuth } from '@/helpers/auth';
import ModelsContainer from '@/app/(main-layout)/budget/models-container';
import Income from './(budget-column)/income';
import Expenses from './(budget-column)/expenses';
import Debt from './(budget-column)/debt';
import Savings from './(budget-column)/savings';
import { BudgetSwitch } from './(budget-column)/budget-switch';
import TransactionsGrid from './(transactions)/transactions-grid';
import NewTransactionButton from './(transactions)/new-transaction-button';
import { Scale } from '@nikelaz/bw-ui';
import Scales from './(reporting)/scales';
import SankeyChart from './(reporting)/sankey-chart';

const Budget = async () => {
  const [token] = useAuth();

  return (
    <main className="flex min-h-screen">
      <ModelsContainer token={token}>
        {/* left column */}
        <div className="flex flex-col gap-8 flex-1 bg-grey2 min-h-screen p-6 overflow-hidden" style={{ maxWidth: '50%' }}>
            <div className="flex justify-between z-1 h-10">
              <BudgetSwitch />
              <NewTransactionButton token={token} />
            </div>
            <Income />
            <Expenses />
            <Debt />
            <Savings />
        </div>

        {/* right column */}
        <div className="flex flex-col gap-8 flex-1 bg-grey3 min-h-screen p-6 overflow-hidden" style={{ maxWidth: '50%' }}>
          <h1 className="text-2xl font-bold h-10 flex items-center">Summary</h1>
          <Scales />
          <SankeyChart />
          <hr className="text-grey4" />
          <TransactionsGrid token={token} />
        </div>
      </ModelsContainer>
    </main>
  );
}

export default Budget;
