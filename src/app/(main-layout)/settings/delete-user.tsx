'use client';

import {
  Button,
  Dialog,
  IconTypes,
  useDialog,
  DialogFooter,
} from '@nikelaz/bw-ui';
import { deleteUser } from '@/actions/user-actions';
import { useUserModel } from '@/view-models/user-model';

export const DeleteUserDialog = () => {
  const [isOpen, setIsOpen, onKeyDown] = useDialog();
  const [isSecondOpen, setIsSecondOpen, onSecondKeyDown] = useDialog();
  const userModel = useUserModel();

  const dialogCloseHandler = () => {
    setIsOpen(false);
  };

  const dialogSecondCloseHandler = () => {
    setIsSecondOpen(false);
  };

  const firstConfirmHandler = () => {
    setIsOpen(false);
    setIsSecondOpen(true);
  };

  const deleteHandler = async () => {
    try {
      await deleteUser(userModel.token, userModel.user);
    }
    catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Button
        type="button"
        style="link"
        icon={IconTypes.Bin}
        onClick={() => setIsOpen(true)}
      >
        Delete Account
      </Button>

      <Dialog
        title="Delete Account"
        isOpen={isOpen}
        onClose={dialogCloseHandler}
        onKeyDown={onKeyDown}
        hasCloseBtn={false}
      >
        <p>You are about to delete your account</p>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={firstConfirmHandler}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        title="Delete Account"
        isOpen={isSecondOpen}
        onClose={dialogSecondCloseHandler}
        onKeyDown={onSecondKeyDown}
        hasCloseBtn={false}
      >
        <p>This is permanent and you will lose all of your data.</p>
        <p>Are you sure?</p>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => setIsSecondOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={deleteHandler}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </Dialog>

    </>
  );
};
