import '@fontsource/poppins'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import { theme } from './theme.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routes } from './routes.tsx'

const App = () => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ChakraProvider theme={theme}>
                <RouterProvider router={routes} />
            </ChakraProvider>
        </QueryClientProvider>
    )
}

export default App
