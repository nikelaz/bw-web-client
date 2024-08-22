'use client';

import { Label, Select } from '@nikelaz/bw-ui';
import { setTheme } from '@/actions/settings-actions';

type ThemeSelectProps = Readonly<{
  theme: number,
}>;

export const ThemeSelect = (props: ThemeSelectProps) => {
  return (
    <div>
      <Label>Theme</Label>
      <Select defaultValue={props.theme} onChange={(event) => setTheme(event.currentTarget.value)}>
        <option value={1}>Auto</option>
        <option value={2}>Light</option>
        <option value={3}>Dark</option>
      </Select>
    </div>
  );
};