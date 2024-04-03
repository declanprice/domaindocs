import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardPage } from './pages/dashboard/DashboardPage.tsx'
import { SignInPage } from './pages/auth/sign-in/SignInPage.tsx'
import { SignUpPage } from './pages/auth/sign-up/SignUpPage.tsx'
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage.tsx'
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage.tsx'
import { AccountSetupPage } from './pages/account-setup/AccountSetupPage.tsx'
import { WaitForInvitePage } from './pages/account-setup/WaitForInvitePage.tsx'
import { CreateDomainPage } from './pages/account-setup/CreateDomainPage.tsx'
import { LayoutShell } from './layout/shell/LayoutShell.tsx'

export const authorizedRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/dashboard'/>
    },
    {
        path: '/',
        element: <LayoutShell/>,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
        ]
    },
    {
        path: '/account-setup',
        children: [
            {
                path: 'about-you',
                element: <AccountSetupPage/>,
            },
            {
                path: 'new-domain',
                element: <CreateDomainPage />
            },
            {
                path: 'wait-for-invite',
                element: <WaitForInvitePage/>
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to='/dashboard'/>
    }
]);

export const unauthorizedRoutes = createBrowserRouter([
    {
        path: '/auth',
        children: [
            {
                path: 'sign-in',
                element: <SignInPage/>
            },
            {
                path: 'sign-up',
                element: <SignUpPage/>
            },
            {
                path: 'verify',
                element: <VerifyMagicLinkPage/>
            },
            {
                path: 'magic-link-sent',
                element: <MagicLinkSentPage/>
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to={'/auth/sign-in'} replace/>
    }
])