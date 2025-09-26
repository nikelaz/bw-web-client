'use client';

import { useUserModel } from '@/view-models/user-model';
import { Label, Input, Select } from '@nikelaz/bw-ui';
import { updateUser as updateUserAction } from '@/actions/user-actions';
import { countries } from '@/data/countries';

enum Field {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  COUNTRY = 'country',
};

type UserNameFieldsProps = Readonly<{
  token: string | undefined,
}>;

export const UserNameFields = (props: UserNameFieldsProps) => {
  const userModel = useUserModel();
  const token = props.token;

  const updateUser = (field: Field, value: string) => {
    if (!token) return;
    updateUserAction(token, {
      [field]: value
    });
  };

  return (
    <>
      <div>
        <Label>First Name</Label>
        <Input
          type="text"
          defaultValue={userModel.user.firstName}
          onBlur={(event) => updateUser(Field.FIRST_NAME, event.currentTarget.value)}
        />
      </div>

      <div>
        <Label>Last Name</Label>
        <Input
          type="text"
          defaultValue={userModel.user.lastName}
          onBlur={(event) => updateUser(Field.LAST_NAME, event.currentTarget.value)}
        />
      </div>

      <div>
        <Label>Country</Label>
        <Select
          defaultValue={userModel.user.country}
          onChange={(event) => updateUser(Field.COUNTRY, event.currentTarget.value)}
        >
          {countries.map(country => <option key={country} value={country}>{country}</option>)}
        </Select>
      </div>
    </>
  );
};
