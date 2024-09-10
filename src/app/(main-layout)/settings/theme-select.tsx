'use client';

import { Input, Label, Select } from '@nikelaz/bw-ui';
import { setTheme as setThemeAction } from '@/actions/settings-actions';
import { useState } from 'react';

type ThemeSelectProps = Readonly<{
  theme: number,
}>;

export const ThemeSelect = (props: ThemeSelectProps) => {
  const [theme, setTheme] = useState(props.theme % 2 === 0 ? props.theme - 1 : props.theme);
  const [isHighContrast, setIsHighContrast] = useState(props.theme % 2 === 0);

  const updateTheme = (themeValueArg?: number, isHighContrastArg?: boolean) => {
    let themeValue = typeof themeValueArg === 'undefined' ? theme : themeValueArg;
    let isHighContrastValue = typeof isHighContrastArg === 'undefined' ? isHighContrast : isHighContrastArg;
    if (isHighContrastValue) themeValue += 1;

    setThemeAction(themeValue);
  }

  const selectChangeHandler = (event: any) => {
    const newTheme = parseInt(event.currentTarget.value);
    updateTheme(newTheme);
    setTheme(newTheme);
  };

  const checkboxChangeHandler = () => {
    updateTheme(undefined, !isHighContrast);
    setIsHighContrast(!isHighContrast);
  }

  return (
    <div>
      <div className="mb-5">
        <Label>Theme</Label>
        <Select value={theme} onChange={selectChangeHandler}>
          <option value={1}>Light</option>
          <option value={3}>Dark</option>
        </Select>
      </div>
      <Label>
        <Input checked={isHighContrast} type="checkbox" onChange={checkboxChangeHandler} />
        <span>High Contrast</span>
      </Label>
    </div>
  );
};
