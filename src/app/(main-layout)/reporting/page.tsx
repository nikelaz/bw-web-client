import { useAuth } from '@/helpers/auth';
import ModelsContainer from '@/app/(main-layout)/budget/models-container';
import Scales from '../budget/(reporting)/scales';
import SankeyChart from '../budget/(reporting)/sankey-chart';

const Reporting = async () => {
  const [token, user] = useAuth();

  return (
    <main className="flex min-h-screen">
      <ModelsContainer token={token} user={user}>
        {/* left column */}
        <div className="flex flex-col gap-2 sm:gap-8 flex-1 bg-grey4 min-h-screen p-6 overflow-hidden w-full" style={{maxWidth: '55rem'}}>
          <h1 className="text-2xl font-bold h-10 flex items-center">Reporting</h1>
          <Scales />
          <SankeyChart aspectRatio={3/2} aspectRatioStr="3/2" />
        </div>
      </ModelsContainer>
    </main>
  );
}

export default Reporting;
