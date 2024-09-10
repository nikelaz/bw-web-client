'use server';

import { cookies } from 'next/headers';
import { Theme } from '@/types/settings';

const parseTheme = (value: string | number | undefined) => {
  switch (value) {
    case '1':
    case 1:
      return Theme.LIGHT;
    case '2':
    case 2:
      return Theme.LIGHT_HIGH_CONTRAST;
    case '3':
    case 3:
      return Theme.DARK;
    case '4':
    case 4:
      return Theme.DARK_HIGH_CONTRAST;
    default:
      return Theme.LIGHT;
  }
};

export const setTheme = async (value: string | number) => {
  const theme: Theme = parseTheme(value);
  const cookieStore = cookies();
  cookieStore.set('theme', theme.toString());
}

export const getTheme = async () => {
  const cookieStore = cookies();
  let theme: string | undefined | Theme = cookieStore.get('theme')?.value;
  theme = parseTheme(theme);
  return theme;
}
