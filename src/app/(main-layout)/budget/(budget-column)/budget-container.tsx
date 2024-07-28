import { BudgetModelContextProvider } from './budget-model';
import { fetchBudgets } from '@/actions/budget-actions';

export const BudgetContainer = async ({ children, token }: any) => {
  const budgets = await fetchBudgets(token);

  return (
    <BudgetModelContextProvider token={token} budgets={budgets}>
      {children}
    </BudgetModelContextProvider>
  );
};
