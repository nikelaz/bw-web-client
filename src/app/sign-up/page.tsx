'use client';

import { useFormState } from 'react-dom';
import {
  Label,
  Input,
  Button,
  Select,
} from '@nikelaz/bw-ui';
import { signup } from '@/actions/user-actions';
import Link from 'next/link';
import Logo from '../logo';
import { countries } from '@/data/countries';

const initialState = {
  message: '',
};

const SignUp = () => {
  const [state, formAction] = useFormState(signup, initialState);

  return (
    <div className="flex flex-col gap-10 min-h-screen justify-center items-center bg-grey1 py-14 px-6">
      <Logo />
      <div className="w-full shadow-lg rounded p-5 bg-white dark:bg-grey4" style={{ maxWidth: '26rem' }}>
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input autoFocus={true} required={true} name="email" type="email" id="email" />
          </div>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input autoFocus={true} required={true} name="firstName" type="firstName" id="firstName" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input autoFocus={true} required={true} name="lastName" type="lastName" id="lastName" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input required={true} name="password" type="password" id="password" />
          </div>
          <div>
            <Label htmlFor="repeatPassword">Repeat Password</Label>
            <Input required={true} name="repeatPassword" type="password" id="repeatPassword" />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select required={true} name="country" id="country">
              { countries.map(country => <option value={country}>{country}</option>) }
            </Select>
          </div>
          <p aria-live="polite" className="text-red1">
            {state?.message}
          </p>
          <div className="flex items-center justify-between">
            <Link href="/login">Login</Link>
            <Button>Sign up</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
