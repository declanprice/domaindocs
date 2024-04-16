import '@fontsource/poppins';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './state/query-client';
import { theme } from './theme';
import { routes } from './routes';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        <RouterProvider router={routes} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
