import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { Toaster } from '~/components/ui/sonner';
import { useInitAuth } from '~/hooks/useInitAuth';
import { useSocket } from '~/hooks/useSocket';
import router from '~/router';
import { useThemeStore } from '~/stores/theme.store';

function Bootstrap() {
  const { theme, initTheme } = useThemeStore(
    useShallow((s) => ({
      theme: s.theme,
      initTheme: s.initTheme,
    })),
  );

  useInitAuth();

  useSocket();

  // Init theme
  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster theme={theme} />
    </>
  );
}

export default Bootstrap;
