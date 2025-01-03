import { useAuth } from '@/helpers/auth';
import ModelsContainer from '@/app/(main-layout)/budget/models-container';
import Income from './(budget-column)/income';
import Expenses from './(budget-column)/expenses';
import Debt from './(budget-column)/debt';
import Savings from './(budget-column)/savings';
import { BudgetSwitch } from './(budget-column)/budget-switch';
import NewTransactionButton from './(transactions)/new-transaction-button';
import Scales from './(reporting)/scales';
import SankeyChart from './(reporting)/sankey-chart';
import TransactionsGrid from './(transactions)/transactions-grid';
import TransactionsFilter from './(transactions)/transactions-filter';
import { getTheme } from '@/actions/settings-actions';
import { Theme } from '@/types/settings';

const Budget = async () => {
  const [token, user] = useAuth();
  const theme: Theme = await getTheme();

  return (
    <main className="flex min-h-screen">
      {/* left column */}
      <div className="flex flex-col gap-2 sm:gap-8 flex-1 bg-grey4 min-h-screen p-6 overflow-hidden w-full xl:w-1/2" style={{maxWidth: '55rem'}}>
          <div className="flex flex-wrap justify-between z-1 gap-4 s:h-10">
            <BudgetSwitch />
            <NewTransactionButton token={token} />
          </div>
          <Income />
          <Expenses />
          <Debt />
          <Savings />
      </div>

      {/* right column */}
      <div className="hidden xl:flex flex-col gap-8 flex-1 bg-grey5 min-h-screen p-6 overflow-hidden w-1/2" style={{maxWidth: '55rem'}}>
        <h1 className="text-2xl font-bold h-10 flex items-center">Summary</h1>
        <Scales />
        <SankeyChart theme={theme} />
        <hr className="text-grey6" />
        <TransactionsFilter />
        <TransactionsGrid token={token} />
      </div>
    </main>
  );
}

export default Budget;
