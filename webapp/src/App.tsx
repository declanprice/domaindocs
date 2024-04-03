import '@fontsource/poppins'
import { ChakraProvider } from '@chakra-ui/react'
import { LayoutShell } from './layout/shell/LayoutShell.tsx'
import {
    RouterProvider
} from 'react-router-dom'
import { useAuthStore } from '@stores/auth.store.ts'
import { authenticatedRoutes, unauthenticatedRoutes } from './routes.tsx'
import { theme } from './theme.tsx'

const App = () => {
  const { user } = useAuthStore();

  return (
    <ChakraProvider theme={theme}>
        {
            user ? (
                <LayoutShell>
                    <RouterProvider router={authenticatedRoutes}/>
                </LayoutShell>
            ) : (
                <RouterProvider router={unauthenticatedRoutes}/>
            )
        }
    </ChakraProvider>
  )
}

export default App
