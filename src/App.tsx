import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';
import Bootstrap from '~/Bootstrap';
import '~/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen items-center justify-center'>
          <Loader2Icon className='h-8 w-8 animate-spin' />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <Bootstrap />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
