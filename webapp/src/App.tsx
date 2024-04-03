import '@fontsource/poppins'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import { theme } from './theme.tsx'
import { authorizedRoutes, unauthorizedRoutes } from './routes.tsx'
import { useAuthStore } from '@stores/auth.store.ts'

const App = () => {
  const { userId } = useAuthStore();

  return <ChakraProvider theme={theme}>
      <RouterProvider router={userId ? authorizedRoutes : unauthorizedRoutes} />
  </ChakraProvider>
}

export default App
