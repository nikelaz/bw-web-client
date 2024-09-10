import Scales from './scales';
import TransactionsGrid from '../(transactions)/transactions-grid';
import SankeyChart from './sankey-chart';

const Reporting = (props: any) => {
  return (
    <>
      <h1 className="text-2xl font-bold h-10 flex items-center">Summary</h1>
      <Scales />
      <SankeyChart />
      <hr className="text-grey6" />
      <TransactionsGrid token={props.token} />
    </>
  );
};

export default Reporting;
