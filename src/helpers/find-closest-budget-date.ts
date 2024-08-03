import type { Budget } from '@/types/budget';

const findClosestBudgetDate = (referenceDate: Date, budgets: Array<Budget>): Budget | null => {
  if (budgets.length === 0) return null;

  const budgetsCopy = budgets.map(budget => ({
    ...budget,
    month: new Date(budget.month),
  }));

  budgetsCopy.sort((a: any, b: any) => {
    const distancea = Math.abs(referenceDate.getTime() - a.month);
    const distanceb = Math.abs(referenceDate.getTime() - b.month);
    return distancea - distanceb;
  });

  return budgetsCopy[0];
};

export default findClosestBudgetDate;
