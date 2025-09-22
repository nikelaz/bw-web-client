'use client';

import { useUserModel } from '@/view-models/user-model';
import { Label, Input } from '@nikelaz/bw-ui';

enum OAuthProvider {
  GOOGLE = 1,
  APPLE = 2,
};

export const OAuthProviderDisplay = () => {
  const userModel = useUserModel();

  let provider = "";

  switch (userModel.user.oAuthProvider) {
    case OAuthProvider.GOOGLE:
      provider = 'Google Account';
      break;
    case OAuthProvider.APPLE:
      provider = 'Apple Account';
      break;
  }
  
  if (userModel.user.oAuthProvider === OAuthProvider.GOOGLE) {
    return (
      <div>
        <Label>Authentication Provider</Label>
        <Input type="text" disabled={true} value={provider} />
      </div>
    );
  }

  return null
};
