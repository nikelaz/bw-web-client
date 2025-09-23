'use client';

import {
  Label,
  Input,
  Button,
  IconTypes,
} from '@nikelaz/bw-ui';
import { login, oauth, OAuthProvider } from '../../actions/user-actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import Logo from '../logo';

const initialState = {
  message: '',
};

type GoogleResponse = {
  credential: string,
};

const Login = () => {
  const [state, formAction] = useFormState(login, initialState);

  const handleGoogleResponse = async (response: GoogleResponse) => {
    try {
      await oauth(response.credential, OAuthProvider.GOOGLE);
    }
    catch(error) {
      alert(error);
    }
  };

  const initGoogleAuth = () => {
    google.accounts.id.initialize({
      client_id: '158086281084-2ukh2g8718rf8r6k5honmkh8djem26bp.apps.googleusercontent.com',
      callback: handleGoogleResponse,
    });
  };

  const generateRandomString = (length = 32) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
  };

  const initAppleAuth = async () => {
    const state = generateRandomString(16);
    const nonce = generateRandomString(16);

    sessionStorage.setItem('apple_oauth_state', state);
    sessionStorage.setItem('apple_oauth_nonce', nonce);

    AppleID.auth.init({
      clientId : 'com.budgetwarden.app',
      scope : 'name email',
      redirectURI : 'https://stage-app.budgetwarden.com/apple-auth',
      state,
      nonce,
      usePopup : true
    });
  };

  const signInWithApple = async () => {
    try {
      const data = await AppleID.auth.signIn()
      
      const state = data.authorization.state;
      if (state !== sessionStorage.getItem('apple_oauth_state')) {
        throw new Error('Invalid state returned from Apple');
      }

      const token = data.authorization.id_token;
      if (!token) {
        throw new Error('An unexpected error occured while authenticating with Apple services. Please try again later.');
      }

      await oauth(token, OAuthProvider.APPLE);
    } catch ( error ) {
      alert(error);
    }
  };

  useEffect(() => {
    const googleScript = document.createElement("script");
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.async = true;
    googleScript.onload = () => initGoogleAuth();

    const appleScript = document.createElement("script");
    appleScript.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    appleScript.async = true;
    appleScript.onload = () => initAppleAuth();

    document.body.appendChild(googleScript);
    document.body.appendChild(appleScript);
  }, []);

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
          <Button icon={IconTypes.Lock}>Sign In with Email</Button>
          <hr />
          <Button type="button" icon={IconTypes.Lock} onClick={ () => google.accounts.id.prompt() }>Sign In with Google</Button>
          <Button type="button" icon={IconTypes.Lock} onClick={signInWithApple}>Sign In with Apple</Button>
          <Button type="button" icon={IconTypes.Lock}>Sign Up with Email</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
