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
