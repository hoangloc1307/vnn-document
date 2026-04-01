import { BarChartExample } from '~/components/chart/bar';
import { PieChartExample } from '~/components/chart/pie';

export default function DashboardPage() {
  return (
    <div className='flex flex-wrap gap-2'>
      <BarChartExample />
      <PieChartExample />
    </div>
  );
}
