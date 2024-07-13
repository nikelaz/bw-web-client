'use client';

import {
  Dialog,
  DialogForm,
  DialogFooter,
  Input,
  Button,
} from '@nikelaz/bw-ui';
import User from '@/model/user';

const Login = () => {
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return alert('The provided user details are invalid');
    }

    let response;

    try {
      response = await User.login(email, password);
    } catch (error: any) {
      if (error instanceof Error) {
        return alert(error.message);
      }
      if (typeof error === 'string') {
        return alert(error);
      }
      console.error('Error of unknown type', error);
    }

    console.log('response', response);
  };

  return (
  <Dialog
    isOpen={true}
    hasCloseBtn={false}
    title="Login"
  >
    <form onSubmit={handleFormSubmit}>
      <DialogForm>
        <Input autoFocus={true} required={true} name="email" type="email" placeholder="Email" />
        <Input required={true} name="password" type="password" placeholder="Password" />
      </DialogForm>
      <DialogFooter>
        <Button>Sign in</Button>
      </DialogFooter>
    </form>
  </Dialog>
  );
};

export default Login;
