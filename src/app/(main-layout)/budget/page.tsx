import { Button, IconTypes } from '@nikelaz/bw-ui';
import Income from './income';
import { useAuth } from '@/helpers/auth';

const Budget = () => {
  const [user, token] = useAuth();

  return (
    <main className="flex min-h-screen">
      {/* left column */}
      <div className="flex flex-col gap-8 flex-1 bg-grey2 min-h-screen p-6">
        <div className="flex justify-end">
          <Button icon={IconTypes.Plus}>New Transaction</Button>
        </div>
        <Income />
      </div>

      {/* right column */}
      <div className="flex-1 bg-grey3 min-h-screen p-6">

      </div>
    </main>
  );
}

export default Budget;
