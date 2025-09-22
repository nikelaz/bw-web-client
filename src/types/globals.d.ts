export {};

declare global {
  interface Window {
    google: typeof google;
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
}
