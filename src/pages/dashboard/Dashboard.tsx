import { useEffect } from 'react';
import { socket } from '~/lib/socket';
import { BarChartExample } from '~/components/chart/bar';
import { PieChartExample } from '~/components/chart/pie';

export default function DashboardPage() {
  useEffect(() => {
    const handler = (data: string) => {
      console.log(data);
    };

    socket.on('socket_connected', handler);

    return () => {
      socket.off('socket_connected', handler);
    };
  }, []);

  return (
    <div className='flex flex-wrap gap-2'>
      <BarChartExample />
      <PieChartExample />
    </div>
  );
}
