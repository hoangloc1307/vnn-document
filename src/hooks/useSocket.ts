import { useEffect } from 'react';
import { socket } from '~/lib/socket';
import { useAuthStore } from '~/stores/auth.store';

export function useSocket() {
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    socket.auth = { token: accessToken };

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [accessToken]);
}
