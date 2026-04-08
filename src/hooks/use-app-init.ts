import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useRefresh } from '~/hooks/queries/auth/use-refresh';
import { useGetMe } from '~/hooks/queries/me/use-get-me';
import { useAuthStore } from '~/stores/auth.store';
import { useThemeStore } from '~/stores/theme.store';

export function useAppInit() {
  const initTheme = useThemeStore((s) => s.initTheme);

  const { accessToken, isAuthenticated, setMe } = useAuthStore(
    useShallow((s) => ({
      accessToken: s.accessToken,
      isAuthenticated: s.isAuthenticated,
      setMe: s.setMe,
    })),
  );

  const refresh = useRefresh();

  const getMe = useGetMe({
    enabled: isAuthenticated && !!accessToken,
  });

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    if (isAuthenticated && !accessToken) {
      refresh.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    if (getMe.data?.data) {
      setMe(getMe.data.data);
    }
  }, [getMe.data, setMe]);
}
