import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
      <Bootstrap />
    </QueryClientProvider>
  );
}

export default App;
