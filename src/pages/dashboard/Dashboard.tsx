import { useEffect } from 'react';
import { socket } from '~/lib/socket';
import { BarChartExample } from '~/components/chart/bar';
import { PieChartExample } from '~/components/chart/pie';

export default function DashboardPage() {
  useEffect(() => {
    const handler = (data: string) => {
      console.log('Message:', data);
    };

    socket.on('receive_message', handler);

    return () => {
      socket.off('receive_message', handler);
    };
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', {
      text: 'Hello from React',
    });
  };

  return (
    <div className='flex flex-wrap gap-2'>
      <BarChartExample />
      <PieChartExample />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
