import { Loader2 } from 'lucide-react';
import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { Toaster } from '~/components/ui/sonner';
import router from '~/router';
import authServices from '~/services/auth.service';
import meServices from '~/services/me.service';
import { useAuthStore } from '~/stores/auth.store';
import { useThemeStore } from '~/stores/theme.store';

function Bootstrap() {
  const theme = useThemeStore((s) => s.theme);

  const initTheme = useThemeStore((s) => s.initTheme);
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

  // Init theme
  useEffect(() => {
    initTheme();
  }, [initTheme]);

  // Khi reload app mà đã đăng nhập rồi thì fetch lại token và thông tin user
  useEffect(() => {
    async function init() {
      try {
        if (!isAuthenticated) return;

        if (!accessToken) {
          const refreshRes = await authServices.refresh();

          if (!refreshRes.success) {
            return resetAuth();
          }

          const newAccessToken = refreshRes.data!.accessToken;
          setAuth({ accessToken: newAccessToken });
        }

        const meRes = await meServices.getMe();

        if (!meRes.success) {
          return resetAuth();
        }

        setMe(meRes.data!);
      } catch {
        resetAuth();
      } finally {
        setInitialized(true);
      }
    }

    init();
  }, [isAuthenticated]);

  return (
    <Suspense
      fallback={
        <div className='flex h-screen items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      }
    >
      <RouterProvider router={router} />
      <Toaster theme={theme} />
    </Suspense>
  );
}

export default Bootstrap;
