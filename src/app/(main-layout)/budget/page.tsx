import { Button, IconTypes, Dropdown, MonthsSwitch } from '@nikelaz/bw-ui';
import { useAuth } from '@/helpers/auth';
import { BudgetContainer } from './budget-container';
import Income from './income';
import Expenses from './expenses';
import Debt from './debt';
import Savings from './savings';
import { BudgetSwitch } from './budget-switch';

const Budget = async () => {
  const [token] = useAuth();

  return (
    <main className="flex min-h-screen">
      <BudgetContainer token={token}>
        {/* left column */}
        <div className="flex flex-col gap-8 flex-1 bg-grey2 min-h-screen p-6">
          <div className="flex justify-between z-1">
            <BudgetSwitch />
            <Button icon={IconTypes.Plus}>New Transaction</Button>
          </div>
          <Income token={token} />
          <Expenses token={token} />
          <Debt token={token} />
          <Savings token={token} />
        </div>

        {/* right column */}
        <div className="flex-1 bg-grey3 min-h-screen p-6">
        </div>
      </BudgetContainer>
    </main>
  );
}

export default Budget;
