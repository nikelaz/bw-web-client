import { Button, IconTypes } from '@nikelaz/bw-ui';
import { ThemeSelect } from './theme-select';
import { getTheme } from '@/actions/settings-actions';
import { UserModelContextProvider } from '@/view-models/user-model';
import { useAuth } from '@/helpers/auth';
import { CurrencySelect } from './currency-select';
import { UserNameFields } from './user-name-fields';
import { ChangePasswordDialog } from './change-password-dialog';

const Settings = () => {
  const [token, user] = useAuth();
  const theme = getTheme();

  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col gap-8 flex-1 bg-grey2 min-h-screen p-6 overflow-hidden" style={{ maxWidth: '50%' }}>
        <h1 className="text-3xl font-bold h-10 flex items-center mb-1">Settings</h1>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <hr className="text-grey6" />
          </div>

          <ThemeSelect theme={theme} />

          <UserModelContextProvider user={user}>
            <CurrencySelect token={token} />

            <div>
              <h2 className="text-xl font-bold mb-4">User Details</h2>
              <hr className="text-grey6" />
            </div>

            <UserNameFields token={token} />

            <ChangePasswordDialog token={token} />

          </UserModelContextProvider>
        </div>
      </div>
    </main>
  );
};

export default Settings;
