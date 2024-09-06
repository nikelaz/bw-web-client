export const monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getFormattedLabel = (date: Date) => `${monthLabels[date.getMonth()]} ${date.getFullYear()}`;

export const getFormattedDecimal = (num: number) => {
  if (num % 1 === 0) return num;
  return num.toFixed(2);
}
