'use client';

import { createContext, useContext } from 'react';
import { Currency, currencies } from '@/data/currencies';

export class UserViewModel {
  user: any;
  currency: string;
  cachedCurrency: null | Currency;

  constructor(user: any) {
    this.user = user;
    this.currency = user.currency;
    this.cachedCurrency = null;
  }

  getCurrency() {
    if (this.cachedCurrency !== null && this.currency === this.cachedCurrency.iso) {
      if (this.cachedCurrency.symbol) {
        return this.cachedCurrency.symbol;
      }
      return this.cachedCurrency.iso;
    }

    const currency = currencies.find(x => x.iso === this.currency);
   
    if (!currency) return null;

    this.cachedCurrency = currency;
    
    if (currency.symbol) {
      return currency.symbol;
    }

    return currency.iso;
  }
}

const UserModelContext = createContext<any>([null, null]);

type UserModelContextProviderProps = Readonly<{
  children: React.ReactNode,
  user: any,
}>;

export const UserModelContextProvider = (props: UserModelContextProviderProps) => {
  const userModel = new UserViewModel(props.user);

  return (
    <UserModelContext.Provider value={userModel}>
      {props.children}
    </UserModelContext.Provider>
  )
};

export const useUserModel = () => useContext(UserModelContext);
