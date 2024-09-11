'use client';

import {
  Label,
  Input,
  Button,
} from '@nikelaz/bw-ui';
import { login } from '../../actions/user-actions';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import Logo from '../logo';

const initialState = {
  message: '',
}

const Login = () => {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="flex flex-col gap-10 min-h-screen justify-center items-center bg-grey1 py-14 px-6">
      <Logo />
      <div className="w-full shadow-lg rounded-xl p-5 bg-white dark:bg-grey4" style={{ maxWidth: '26rem' }}>
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input autoFocus={true} required={true} name="email" type="email" id="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input required={true} name="password" type="password" id="password" />
          </div>
          <p aria-live="polite" className="text-red1">
            {state?.message}
          </p>
          <div className="flex items-center justify-between">
            <Link href="/sign-up" className="c-link">Sign up</Link>
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
