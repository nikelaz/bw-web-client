export {};

declare global {
  interface Window {
    google: typeof google;
    AppleID: typeof AppleID;
  }

  namespace google {
    namespace accounts.id {
      function initialize(options: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
      }): void;

      function prompt(): void;

      interface CredentialResponse {
        credential: string;
        select_by: string;
      }
    }
  }

  namespace AppleID {
    namespace auth {
      interface InitOptions {
        clientId: string;
        scope?: string; // "name email"
        redirectURI: string;
        state?: string;
        nonce?: string;
        usePopup?: boolean;
      }

      function init(options: InitOptions): void;

      function signIn(): Promise<AuthResponse>;
    }

    interface AuthResponse {
      authorization: {
        code: string; // short-lived authorization code
        id_token?: string; // JWT if returned
        state?: string;
      };
      user?: {
        email?: string;
        name?: {
          firstName?: string;
          lastName?: string;
        };
      };
    }
  }
}
