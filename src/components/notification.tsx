import { BellIcon, CheckCircle2Icon, InfoIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useSocketEvent } from '~/hooks/useSocketEvent';
import { socket } from '~/lib/socket';

type Task = {
  id: string;
  documentNo: string;
  section: string;
};

export function Notification() {
  const { t } = useTranslation(['common']);

  const [taskPending, setTaskPending] = useState<Task[]>([]);

  useSocketEvent('get_task_pending', (data: Task[]) => {
    setTaskPending(data);
  });

  useEffect(() => {
    socket.emit('get_task_pending');
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'icon-sm'}
          variant={'ghost'}
          className='relative'
          title={t('common:notification')}
        >
          <BellIcon />
          {taskPending.length > 0 && (
            <span className='absolute top-0 left-0 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white'>
              {taskPending.length >= 99 ? '99' : taskPending.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {taskPending.length === 0 ? (
          <Alert className='w-sm'>
            <InfoIcon />
            <AlertTitle>No notifications</AlertTitle>
            <AlertDescription>You have no notifications</AlertDescription>
          </Alert>
        ) : (
          <>
            {taskPending.map((task) => (
              <DropdownMenuItem key={task.id} className='w-sm'>
                <Alert>
                  <InfoIcon />
                  <AlertTitle>{task.documentNo}</AlertTitle>
                  <AlertDescription>{task.section}</AlertDescription>
                </Alert>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
