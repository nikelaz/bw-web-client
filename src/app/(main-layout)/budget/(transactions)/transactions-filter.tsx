'use client';

import { Input } from '@nikelaz/bw-ui';
import { ChangeEvent } from 'react';
import debounce from '@/helpers/debounce';
import { useTransactionsModel } from '@/view-models/transactions-model';

const TransactionsFilter = () => {
  const transactionsModel = useTransactionsModel();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    transactionsModel.setFilter(event.target.value);
  };

  return (
    <Input type="search" onChange={debounce(changeHandler)} placeholder="Search Transactions" />
  );
};

export default TransactionsFilter;
