import { ThemeSelect } from './theme-select';
import { getTheme } from '@/actions/settings-actions';
import { UserModelContextProvider } from '@/view-models/user-model';
import { useAuth } from '@/helpers/auth';
import { CurrencySelect } from './currency-select';
import { UserNameFields } from './user-name-fields';
import { ChangePasswordDialog } from './change-password-dialog';

const Settings = async () => {
  const [token, user] = useAuth();
  const theme = await getTheme();
  console.log("settings/theme", theme);

  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col gap-4 sm:gap-8 flex-1 bg-grey4 min-h-screen p-6 overflow-hidden w-full xl:w-1/2" style={{maxWidth: '55rem'}}>
        <h1 className="text-3xl font-bold h-10 flex items-center mb-1">Settings</h1>
        <div className="flex flex-col gap-4 sm:gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <hr className="text-grey6" />
          </div>

          <ThemeSelect theme={theme} />

          <UserModelContextProvider user={user}>
            <CurrencySelect token={token} />

            <div className='mt-3'>
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
