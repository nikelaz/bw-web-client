import { BudgetModelContextProvider } from './(main-layout)/budget/(budget-column)/budget-model';
import { fetchBudgets } from '@/actions/budget-actions';
import { fetchTransactions } from '@/actions/transactions-actions';
import findClosestBudgetDate from '@/helpers/find-closest-budget-date';
import { TransactionsModelContextProvider } from './(main-layout)/budget/(transactions)/transactions-model';

const ModelsContainer = async ({ children, token }: any) => {
  const budgets = await fetchBudgets(token);
  const initiallySelectedBudget = findClosestBudgetDate(new Date(), budgets).id;
  const {transactions, count} = await fetchTransactions(token, initiallySelectedBudget, 6, 0);

  return (
    <BudgetModelContextProvider token={token} budgets={budgets} currentBudgetId={initiallySelectedBudget}>
      <TransactionsModelContextProvider token={token} transactions={transactions} transactionsCount={count} currentBudgetId={initiallySelectedBudget}>
        {children}
      </TransactionsModelContextProvider>
    </BudgetModelContextProvider>
  );
};

export default ModelsContainer;
