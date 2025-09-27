'use client';

import {
  Label,
  Input,
  Button,
  Dialog,
  DialogForm,
  DialogFooter,
  IconTypes,
} from '@nikelaz/bw-ui';
import { login, oauth } from '../../actions/user-actions';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../logo';

const initialState = {
  message: '',
};

type GoogleResponse = {
  credential: string,
};

enum OAuthProvider {
  GOOGLE = 1,
  APPLE = 2,
};

const APPLE_ERR_MESSAGE = 'An unexpected error occured while authenticating with Apple services. Please try again later.'; 

const Login = () => {
  const [state, formAction] = useFormState(login, initialState);
  const [showMoreAppleDetailsPopup, setShowMoreAppleDetailsPopup] = useState(false);
  const [appleIdToken, setAppleIdToken] = useState('');

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

    sessionStorage.setItem('apple_oauth_state', state);

    AppleID.auth.init({
      clientId : 'com.budgetwarden.app',
      scope : 'name email',
      redirectURI : 'https://app.budgetwarden.com/apple-auth',
      state,
      usePopup : true
    });
  };

  const signInWithApple = async () => {
    const data = await AppleID.auth.signIn()

    const state = data.authorization.state;

    if (state !== sessionStorage.getItem('apple_oauth_state')) {
      alert(APPLE_ERR_MESSAGE);
      return;
    }

    const token = data.authorization.id_token;
    if (!token) {
      throw new Error(APPLE_ERR_MESSAGE);
    }

    const firstName = data.user?.name?.firstName;
    const lastName = data.user?.name?.lastName;
   
    try {
      await oauth(token, OAuthProvider.APPLE, firstName, lastName);
    }
    catch (error) {
      if (!firstName || !lastName) {
        setAppleIdToken(token);
        setShowMoreAppleDetailsPopup(true);  
      }
      else {
        console.log(error);
        alert(APPLE_ERR_MESSAGE);
      }
    }
  };

  const signInWithAppleWithDetails = async (event: any) => {
    if (!appleIdToken) {
      alert(APPLE_ERR_MESSAGE);
      setShowMoreAppleDetailsPopup(false);
      return;
    }

    const formData = new FormData(event.target);
    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();
 
    if (!firstName || !lastName) {
      alert(APPLE_ERR_MESSAGE);
      setShowMoreAppleDetailsPopup(false);
      return;
    }

    try {
      await oauth(appleIdToken, OAuthProvider.APPLE, firstName, lastName);
    }
    catch (error) {
      alert(APPLE_ERR_MESSAGE);
    }
    finally {
      setShowMoreAppleDetailsPopup(false);
    }
  };

  const loadOAuthScriptsIfNecessary = () => {
    const googleScriptSrc = 'https://accounts.google.com/gsi/client';
    
    if (!document.querySelector(`script[src="${googleScriptSrc}"]`)) {
      const googleScript = document.createElement("script");
      googleScript.src = googleScriptSrc;
      googleScript.async = true;
      googleScript.onload = () => initGoogleAuth();
      document.body.appendChild(googleScript);
    }

    const appleScriptSrc = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';

    if (!document.querySelector(`script[src="${appleScriptSrc}"]`)) {
      const appleScript = document.createElement("script");
      appleScript.src = appleScriptSrc;
      appleScript.async = true;
      appleScript.onload = () => initAppleAuth();
      document.body.appendChild(appleScript);
    }
  };

  useEffect(loadOAuthScriptsIfNecessary, []);

  return (
    <>
      <div className="flex flex-col gap-10 min-h-screen justify-center items-center bg-grey1 py-14 px-6">
        <Logo />
        <div className="w-full shadow-lg rounded p-5 pb-7 bg-white dark:bg-grey4" style={{ maxWidth: '26rem' }}>
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
            <hr className="text-grey5" />
            <Button type="button" style="secondary" icon={IconTypes.Google} onClick={ () => google.accounts.id.prompt() }>Continue with Google</Button>
            <Button type="button" style="secondary" icon={IconTypes.Apple} onClick={signInWithApple}>Continue with Apple</Button>
            <Link href="/sign-up" className="block">
              <Button type="button" style="secondary" icon={IconTypes.Mail} className="w-full">Sign Up with Email</Button>
            </Link>
          </form>
        </div>
      </div>

      <Dialog
        isOpen={showMoreAppleDetailsPopup}
        onClose={() => setShowMoreAppleDetailsPopup(false)}
        title="Additional Details"
      >
        <form onSubmit={signInWithAppleWithDetails} method="dialog">
          <p className="mb-3 max-w-full">We could not retrieve your first and last name from Apple. Please provide these details to continue.</p>

          <DialogForm>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input autoFocus={true} required={true} name="firstName" type="text" id="firstName" />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input autoFocus={true} required={true} name="lastName" type="text" id="lastName" />
            </div>
          </DialogForm>

          <DialogFooter className='gap-4'>
            <Button style="secondary" type="button" onClick={() => setShowMoreAppleDetailsPopup(false)}>Cancel</Button>
            <Button>Continue</Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default Login;
