import { useAuth } from '@/helpers/auth';
import { BudgetContainer } from './(budget-column)/budget-container';
import Income from './(budget-column)/income';
import Expenses from './(budget-column)/expenses';
import Debt from './(budget-column)/debt';
import Savings from './(budget-column)/savings';
import { BudgetSwitch } from './(budget-column)/budget-switch';
import { TransactionsModelContextProvider } from './(transactions)/transactions-model';
import TransactionsGrid from './(transactions)/transactions-grid';
import NewTransactionButton from './(transactions)/new-transaction-button';

const Budget = async () => {
  const [token] = useAuth();

  return (
    <main className="flex min-h-screen">
      <BudgetContainer token={token}>
        <TransactionsModelContextProvider token={token}>
          {/* left column */}
          <div className="flex flex-col gap-8 flex-1 bg-grey2 min-h-screen p-6">
              <div className="flex justify-between z-1">
                <BudgetSwitch />
                <NewTransactionButton token={token} />
              </div>
              <Income token={token} />
              <Expenses token={token} />
              <Debt token={token} />
              <Savings token={token} />
          </div>

          {/* right column */}
          <div className="flex flex-col gap-8 flex-1 bg-grey3 min-h-screen p-6">
            <TransactionsGrid token={token} />
          </div>
        </TransactionsModelContextProvider>
      </BudgetContainer>
    </main>
  );
}

export default Budget;
