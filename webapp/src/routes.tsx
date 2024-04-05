import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard/DashboardPage.tsx'
import { SignInPage } from './pages/auth/sign-in/SignInPage.tsx'
import { SignUpPage } from './pages/auth/sign-up/SignUpPage.tsx'
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage.tsx'
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage.tsx'
import { UserSetupPage } from './pages/user-setup/UserSetupPage.tsx'
import { WaitForInvitePage } from './pages/user-setup/WaitForInvitePage.tsx'
import { CreateDomainPage } from './pages/user-setup/CreateDomainPage.tsx'
import { Layout } from './layout/Layout.tsx'
import { UserSetupGuard } from '@components/guards/UserSetupGuard.tsx'

export const authorizedRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" />,
    },
    {
        path: '/',
        element: <UserSetupGuard />,
        children: [
            {
                path: '',
                element: <Layout />,
                children: [
                    {
                        path: 'dashboard',
                        element: <DashboardPage />,
                    },
                ],
            },
        ],
    },
    {
        path: '/user-setup',
        children: [
            {
                path: '',
                element: <Navigate to="/user-setup/about-you" />,
            },
            {
                path: 'about-you',
                element: <UserSetupPage />,
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
