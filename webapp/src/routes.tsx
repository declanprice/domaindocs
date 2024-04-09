import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage.tsx'
import { SignInPage } from './pages/auth/sign-in/SignInPage.tsx'
import { SignUpPage } from './pages/auth/sign-up/SignUpPage.tsx'
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage.tsx'
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage.tsx'
import { AccountSetupPage } from './pages/account-setup/AccountSetupPage.tsx'
import { Layout } from './layout/Layout.tsx'
import { AccountSetupGuard } from '@components/guards/AccountSetupGuard.tsx'

export const authorizedRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/home" />,
    },
    {
        path: '/',
        element: <AccountSetupGuard />,
        children: [
            {
                path: '',
                element: <Layout />,
                children: [
                    {
                        path: 'home',
                        element: <HomePage />,
                    },
                ],
            },
        ],
    },
    {
        path: '/account-setup',
        children: [
            {
                path: '',
                element: <Navigate to="/account-setup/about-you" />,
            },
            {
                path: 'about-you',
                element: <AccountSetupPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
])

export const unauthorizedRoutes = createBrowserRouter([
    {
        path: '/auth',
        children: [
            {
                path: 'sign-in',
                element: <SignInPage />,
            },
            {
                path: 'sign-up',
                element: <SignUpPage />,
            },
            {
                path: 'verify',
                element: <VerifyMagicLinkPage />,
            },
            {
                path: 'magic-link-sent',
                element: <MagicLinkSentPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={'/auth/sign-in'} replace />,
    },
])
