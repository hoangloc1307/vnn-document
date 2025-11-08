import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from '~/components/ui/sonner';
import '~/i18n';
import router from '~/router';
import { useThemeStore } from '~/stores/theme.store';

const queryClient = new QueryClient();

function App() {
  const init = useThemeStore((s) => s.init);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster theme={theme} />
    </QueryClientProvider>
  );
}

export default App;
