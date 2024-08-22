'use client';

import { Label, Select } from '@nikelaz/bw-ui';
import { useUserModel } from '@/view-models/user-model';
import { mostPopularCurrencies, otherCurrencies } from '../../../data/currencies';
import { updateUser } from '@/actions/user-actions';

type CurrencySelectProps = Readonly<{
  token: string | undefined
}>;

export const CurrencySelect = (props: CurrencySelectProps) => {
  const userModel = useUserModel();

  const changeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!props.token) return;

    updateUser(props.token, {
      currency: event.currentTarget.value,
    });
  };

  return (
    <div>
      <Label>Currency</Label>
      <Select defaultValue={userModel.currency} onChange={changeCurrency}>
        <optgroup label="Most Popular">
          {mostPopularCurrencies.map(currency => (
            <option key={currency.iso} value={currency.iso}>{currency.title} - {currency.symbol}</option>
          ))}
        </optgroup>
        <optgroup label="Other">
          {otherCurrencies.map(currency => (
            <option key={currency.iso} value={currency.iso}>{currency.title} - {currency.symbol}</option>
          ))}
        </optgroup>
      </Select>
    </div>
  );
};
