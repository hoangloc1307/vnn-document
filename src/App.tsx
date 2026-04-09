import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import Bootstrap from '~/Bootstrap';
import '~/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Bootstrap />
      {/* </Suspense> */}
    </QueryClientProvider>
  );
}

export default App;
