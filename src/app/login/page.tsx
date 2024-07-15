'use client';

import {
  Label,
  Input,
  Button,
} from '@nikelaz/bw-ui';
import { login } from './actions';
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
}

const Login = () => {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="flex min-h-screen justify-center items-center bg-grey1">
      <div className="w-min shadow-lg rounded-xl p-5 bg-white">
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input autoFocus={true} required={true} name="email" type="email" id="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input required={true} name="password" type="password" id="password" />
          </div>
          <p aria-live="polite">
            {state?.message}
          </p>
          <Button className="self-end">Sign in</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
