import { fetchBudgets } from '@/actions/budget-actions';
import { fetchTransactions } from '@/actions/transactions-actions';
import findClosestBudgetDate from '@/helpers/find-closest-budget-date';
import { BudgetModelContextProvider } from '@/view-models/budget-model';
import { TransactionsModelContextProvider } from '@/view-models/transactions-model';
import { CategoryBudgetModelContextProvider } from '@/view-models/category-budget-model';

const ModelsContainer = async ({ children, token }: any) => {
  const budgets = await fetchBudgets(token);
  const initiallySelectedBudget = findClosestBudgetDate(new Date(), budgets)?.id;
  let transactions = [];
  let transactionsCount = 0;

  if (initiallySelectedBudget !== undefined) {
    const transactionsReq = await fetchTransactions(token, initiallySelectedBudget, 6, 0);
    if (transactionsReq) {
      transactions = transactionsReq.transactions;
      transactionsCount = transactionsReq.count;
    }
  }

  return (
    <BudgetModelContextProvider
      token={token}
      budgets={budgets}
      currentBudgetId={initiallySelectedBudget}
    >
      <TransactionsModelContextProvider
        token={token}
        transactions={transactions}
        transactionsCount={transactionsCount}
        currentBudgetId={initiallySelectedBudget}
      >
        <CategoryBudgetModelContextProvider token={token}>
          {children}
        </CategoryBudgetModelContextProvider>
      </TransactionsModelContextProvider>
    </BudgetModelContextProvider>
  );
};

export default ModelsContainer;
