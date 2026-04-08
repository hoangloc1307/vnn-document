import { RouterProvider } from 'react-router-dom';
import { Toaster } from '~/components/ui/sonner';
import { useAppInit } from '~/hooks/use-app-init';
import router from '~/router';
import { useThemeStore } from '~/stores/theme.store';

function Bootstrap() {
  const theme = useThemeStore((s) => s.theme);

  useAppInit();

  return (
    <>
      <RouterProvider router={router} />
      <Toaster theme={theme} />
    </>
  );
}

export default Bootstrap;
