import '@fontsource/poppins'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import { theme } from './theme.tsx'
import { authorizedRoutes, unauthorizedRoutes } from './routes.tsx'
import { useAuthStore } from '@stores/auth.store.ts'
import {
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './graphql/client.ts'

const App = () => {
  const { userId } = useAuthStore();

  return <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
            <RouterProvider router={userId ? authorizedRoutes : unauthorizedRoutes} />
        </ChakraProvider>
    </QueryClientProvider>
}

export default App
