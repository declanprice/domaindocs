import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard/DashboardPage.tsx'
import { SignInPage } from './pages/auth/sign-in/SignInPage.tsx'
import { SignUpPage } from './pages/auth/sign-up/SignUpPage.tsx'

export const authenticatedRoutes = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />,
    },
]);

export const unauthenticatedRoutes = createBrowserRouter([
    {
        path: '/',
        element: <SignInPage/>
    },
    {
        path: '/sign-up',
        element: <SignUpPage/>
    },
    {
        path: '*',
        element: <Navigate replace to={'/'}/>
    }
])