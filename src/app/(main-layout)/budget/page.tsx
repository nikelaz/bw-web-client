import { Button, IconTypes } from '@nikelaz/bw-ui';
import Income from './income';
import { useAuth } from '@/helpers/auth';
import { serviceUrl } from '@/config';
import { CategoryType } from '@/types/category-type';

const fetchBudgets = async (token: string | undefined) => {
  if (!token) return;

  const reqOptions = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const req = await fetch(`${serviceUrl}/budgets`, reqOptions);

  const jsonResponse = await req.json();

  return jsonResponse.budgets;
};

const Budget = async () => {
  const [user, token] = useAuth();

  const budgets = await fetchBudgets(token);

  const currentBudget = budgets[0];
  const categoryBudgets = currentBudget.categoryBudgets;
  const categoryBudgetsByType: any = {
    [CategoryType.INCOME]: [],
    [CategoryType.EXPENSE]: [],
    [CategoryType.SAVINGS]: [],
    [CategoryType.DEBT]: [],
  };

  categoryBudgets.forEach((categoryBudget: any) => {
    categoryBudgetsByType[categoryBudget.category.type].push({
      ...categoryBudget,
      title: categoryBudget.category.title,
      progress: categoryBudget.currentAmount / categoryBudget.amount,
    });
  });

  return (
    <main className="flex min-h-screen">
      {/* left column */}
      <div className="flex flex-col gap-8 flex-1 bg-grey2 min-h-screen p-6">
        <div className="flex justify-end">
          <Button icon={IconTypes.Plus}>New Transaction</Button>
        </div>
        <Income categoryBudgets={categoryBudgetsByType[CategoryType.INCOME]} />
      </div>

      {/* right column */}
      <div className="flex-1 bg-grey3 min-h-screen p-6">

      </div>
    </main>
  );
}

export default Budget;
