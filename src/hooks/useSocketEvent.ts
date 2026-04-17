import { useEffect, useRef } from 'react';
import { socket } from '~/lib/socket';

export function useSocketEvent<T>(event: string, handler: (data: T) => void) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = handlerRef.current;

    socket.on(event, listener);

    return () => {
      socket.off(event, listener);
    };
  }, [event]);
}
