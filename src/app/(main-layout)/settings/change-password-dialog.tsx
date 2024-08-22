'use client';

import {
  Button,
  Dialog,
  DialogForm,
  IconTypes,
  useDialog,
  DialogFooter,
  Input
} from '@nikelaz/bw-ui';
import { useFormState } from 'react-dom';
import { changePassword } from '@/actions/user-actions';
import { useRef } from 'react';

const initialState = {
  message: '',
};

export const ChangePasswordDialog = (props: any) => {
  const [isOpen, setIsOpen, onKeyDown] = useDialog();
  const [state, formAction] = useFormState(changePassword.bind(null, props.token), initialState);
  const formRef: React.MutableRefObject<null | HTMLFormElement> = useRef(null);

  const dialogCloseHandler = () => {
    setIsOpen(false);
    if (formRef.current) formRef.current.reset();
  };

  return (
    <>
      <Button
        type="button"
        style="link"
        icon={IconTypes.Lock}
        onClick={() => setIsOpen(true)}
      >
        Change Password
      </Button>

      <Dialog
        title="Change Password"
        isOpen={isOpen}
        onClose={dialogCloseHandler}
        onKeyDown={onKeyDown}
        hasCloseBtn={true}
      >
        <form ref={formRef} action={formAction} method="dialog">
          <DialogForm>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Current Password"
              required={true}
            />

            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              required={true}
            />

            <Input
              type="password"
              id="repeatNewPassword"
              name="repeatNewPassword"
              placeholder="Repeat New Password"
              required={true}
            />

            <div>{state?.message}</div>
          </DialogForm>
          <DialogFooter>
            <Button>Save Changes</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};
