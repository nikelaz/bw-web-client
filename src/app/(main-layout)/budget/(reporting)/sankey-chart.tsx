'use client';

import { Chart, registerables, ScriptableContext } from 'chart.js';
import { SankeyController, Flow } from '@nikelaz/bw-sankey-charts';
import { useEffect, useRef, useState } from 'react';
import { CategoryBudgetViewModel, useCategoryBudgetModel } from '@/view-models/category-budget-model';
import { CategoryType } from '@/types/category';
import { Loader } from '@nikelaz/bw-ui';
import { useUserModel } from '@/view-models/user-model';
import { getFormattedDecimal } from '@/helpers/formatting-utils';
import { Theme } from '@/types/settings';

Chart.register(...registerables);
Chart.register(SankeyController, Flow);

Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 600;

class ChartColorsProvider {
  theme: Theme = Theme.LIGHT;
  incomeColors = {
    [Theme.LIGHT]: [
      '#1379D3',
      '#1160BB',
      '#0E489E',
    ],
    [Theme.LIGHT_HIGH_CONTRAST]: [
      '#0F5EA3',
      '#116CBB',
      '#1479D2',
    ],
    [Theme.DARK]: [
      '#1379D3',
      '#1160BB',
      '#0E489E',
    ],
    [Theme.DARK_HIGH_CONTRAST]: [
      '#0F5EA3',
      '#116CBB',
      '#1479D2',
    ],
  };

  outflowColors = {
    [Theme.LIGHT]: [
      '#FFAF24',
      '#FF9500',
      '#FF7F0F',
    ],
    [Theme.LIGHT_HIGH_CONTRAST]: [
      '#CC4700',
      '#E65000',
      '#FF5900',
    ],
    [Theme.DARK]: [
      '#FFAF24',
      '#FF9500',
      '#FF7F0F',
    ],
    [Theme.DARK_HIGH_CONTRAST]: [
      '#CC4700',
      '#E65000',
      '#FF5900',
    ],
  };

  currentIncomeColors = this.incomeColors[Theme.LIGHT];
  currentOutflowColors = this.outflowColors[Theme.LIGHT];

  setTheme(theme: Theme) {
    this.theme = theme;
    this.currentIncomeColors = this.incomeColors[theme];
    this.currentOutflowColors = this.outflowColors[theme];
  }

  getIncomeColor(index: number) {
    return this.currentIncomeColors[index % this.currentIncomeColors.length];
  }

  getOutflowColor(index: number) {
    return this.currentOutflowColors[index % this.currentOutflowColors.length];
  }
}

const SankeyChart = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const categoryBudgetModel: CategoryBudgetViewModel = useCategoryBudgetModel();
  const userModel = useUserModel();
  const incomeCategoryBudgets = categoryBudgetModel.categoryBudgetsByType[CategoryType.INCOME];
  const incomeChartSegments = incomeCategoryBudgets.flatMap(categoryBudget => {
    if (!categoryBudget.amount) return [];
    return [{
      from: categoryBudget.category?.title,
      to: 'Income',
      flow: categoryBudget.amount,
    }];
  });

  const colorsProvider = new ChartColorsProvider();
  colorsProvider.setTheme(props.theme);

  const savingsCategoryBudgets = categoryBudgetModel.categoryBudgetsByType[CategoryType.SAVINGS];
  const totalSavings = savingsCategoryBudgets.reduce((accumulator, categoryBudget) => accumulator += categoryBudget.amount, 0);

  const expensesCategoryBudgets = categoryBudgetModel.categoryBudgetsByType[CategoryType.EXPENSE];
  const totalExpenses = expensesCategoryBudgets.reduce((accumulator, categoryBudget) => accumulator += categoryBudget.amount, 0);

  const debtCategoryBudgets = categoryBudgetModel.categoryBudgetsByType[CategoryType.DEBT];
  const totalDebt = debtCategoryBudgets.reduce((accumulator, categoryBudget) => accumulator += categoryBudget.amount, 0);

  const otherChartSegments: Array<{from: string, to: string, flow: number}> = [];

  if (totalSavings) otherChartSegments.push({ from: 'Income', to: 'Savings', flow: totalSavings });
  if (totalExpenses) otherChartSegments.push({ from: 'Income', to: 'Expenses', flow: totalExpenses });
  if (totalDebt) otherChartSegments.push({ from: 'Income', to: 'Debt', flow: totalDebt }),

  incomeChartSegments.sort((x, y) => y.flow - x.flow);
  otherChartSegments.sort((x, y) => y.flow - x.flow);

  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  let chart: any = null;

  useEffect(() => {
    if (canvasRef.current ===  null || chart !== null) return;

    const ctx = canvasRef.current.getContext('2d');

    if (ctx === null) return;

    const colorCallback = (c: ScriptableContext<'sankey'>) => {
      const index = c.dataIndex;
      if (index < incomeChartSegments.length) {
        return colorsProvider.getIncomeColor(index);
      } else {
        return colorsProvider.getOutflowColor(index);
      }
    };

    const labelRenderer = (context: any) => {
      let categoryLabel = context.raw.from;

      if (categoryLabel === 'Income') {
        categoryLabel = context.raw.to;
      }

      return `${categoryLabel}: ${getFormattedDecimal(context.raw.flow)} ${userModel.getCurrency()}`;
    };

    chart = new Chart(ctx, {
      type: 'sankey',
      options: {
        responsive: true,
        aspectRatio: props.aspectRatio || 21 / 8,
        animation: false,
        plugins: {
          tooltip: {
            yAlign: 'bottom',
            displayColors: false,
            callbacks: {
              label: labelRenderer
            },
          },
        },
      },
      data: {
        datasets: [
          {
            data: [
              ...incomeChartSegments,
              ...otherChartSegments,
            ],
            nodeWidth: -1,
            color: '#fff',
            borderWidth: 0,
            colorFrom: colorCallback,
            colorTo: colorCallback,
          },
        ],
      },
    });

    setIsLoading(false);

    return () => {
      chart.destroy();
      setIsLoading(true);
    };
  }, [canvasRef, incomeChartSegments, totalSavings, totalExpenses, totalDebt])

  return (
    <div className="p-6 bg-grey1 dark:bg-grey6 rounded-xl" style={{ paddingRight: '0.55rem' }}>
      <div className="flex items-center justify-center" style={{position: 'relative', width: '100%', aspectRatio: props.aspectRatioStr || '21/8'}}>
        { isLoading ? <Loader width={50} height={50} className="absolute text-grey11" /> : null }
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export default SankeyChart;
