const findClosestBudgetDate = (referenceDate: any, budgets: Array<any>) => {
  const budgetsCopy = budgets.map(budget => ({
    ...budget,
    month: new Date(budget.month) 
  }));

  budgetsCopy.sort((a: any, b: any) => {
    const distancea = Math.abs(referenceDate - a.month);
    const distanceb = Math.abs(referenceDate - b.month);
    return distancea - distanceb; // sort a before b when the distance is smaller
  });

  return budgetsCopy[0];
};

export default findClosestBudgetDate;
