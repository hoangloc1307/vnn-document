import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import authServices from '~/services/auth.service';
import meServices from '~/services/me.service';
import { useAuthStore } from '~/stores/auth.store';

export function useInitAuth() {
  const { setMe, setAuth, resetAuth, setInitialized, isAuthenticated, accessToken } = useAuthStore(
    useShallow((s) => ({
      setMe: s.setMe,
      setAuth: s.setAuth,
      resetAuth: s.resetAuth,
      setInitialized: s.setInitialized,
      isAuthenticated: s.isAuthenticated,
      accessToken: s.accessToken,
    })),
  );

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        if (!isAuthenticated) {
          setInitialized(true);
          return;
        }

        if (!accessToken) {
          const refreshRes = await authServices.refresh();

          if (!refreshRes.success) {
            resetAuth();
            return;
          }

          if (!isMounted) return;
          setAuth({ accessToken: refreshRes.data!.accessToken });
        }

        const meRes = await meServices.getMe();

        if (!meRes.success) {
          resetAuth();
          return;
        }

        if (!isMounted) return;
        setMe(meRes.data!);
      } catch {
        resetAuth();
      } finally {
        if (isMounted) {
          setInitialized(true);
        }
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);
}
