import { fetchBudgets } from '@/actions/budget-actions';
import { fetchTransactions } from '@/actions/transaction-actions';
import findClosestBudgetDate from '@/helpers/find-closest-budget-date';
import { BudgetModelContextProvider } from '@/view-models/budget-model';
import { TransactionsModelContextProvider } from '@/view-models/transactions-model';
import { CategoryBudgetModelContextProvider } from '@/view-models/category-budget-model';
import { UserModelContextProvider } from '@/view-models/user-model';

const ModelsContainer = async ({ children, token, user }: any) => {
  const budgets = await fetchBudgets(token);
  const initiallySelectedBudget = findClosestBudgetDate(new Date(), budgets)?.id;
  let transactions = [];
  let transactionsCount = 0;
  let isLoaded = false;

  if (initiallySelectedBudget !== undefined && !isLoaded) {
    const transactionsReq = await fetchTransactions(token, initiallySelectedBudget, 6, 0);
    if (transactionsReq) {
      transactions = transactionsReq.transactions;
      transactionsCount = transactionsReq.count;
      isLoaded = true;
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
          <UserModelContextProvider user={user}>
            {children}
          </UserModelContextProvider>
        </CategoryBudgetModelContextProvider>
      </TransactionsModelContextProvider>
    </BudgetModelContextProvider>
  );
};

export default ModelsContainer;
