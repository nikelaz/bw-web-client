'use server';

import { cookies } from 'next/headers';
import { Theme } from '@/types/settings';

const parseTheme = (value: string | number | undefined) => {
  switch (value) {
    case '2':
    case 2:
      return Theme.LIGHT;
    case '3':
    case 3:
      return Theme.DARK;
    default:
      return Theme.AUTO;
  }
};

export const setTheme = async (value: string) => {
  const theme: Theme = parseTheme(value);
  const cookieStore = cookies();
  cookieStore.set('theme', theme.toString());
}

export const getTheme = () => {
  const cookieStore = cookies();
  let theme: string | undefined | Theme = cookieStore.get('theme')?.value;
  theme = parseTheme(theme);
  return theme;
}