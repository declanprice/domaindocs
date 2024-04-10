import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage.tsx'
import { SignInPage } from './pages/auth/sign-in/SignInPage.tsx'
import { SignUpPage } from './pages/auth/sign-up/SignUpPage.tsx'
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage.tsx'
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage.tsx'
import { AccountSetupPage } from './pages/account-setup/AccountSetupPage.tsx'
import { Layout } from './layout/Layout.tsx'
import { UserSetupGuard } from '@components/guards/UserSetupGuard.tsx'
import { SubdomainPageLayout } from './pages/subdomain/SubdomainPageLayout.tsx'
import { SubdomainOverviewPage } from './pages/subdomain/SubdomainOverviewPage.tsx'
import { SubdomainPeoplePage } from './pages/subdomain/SubdomainPeoplePage.tsx'
import { SubdomainTeamsPage } from './pages/subdomain/SubdomainTeamsPage.tsx'
import { SubdomainProjectsPage } from './pages/subdomain/SubdomainProjectsPage.tsx'
import { CreateDomainPage } from './pages/account-setup/CreateDomainPage.tsx'
import { DefaultDomainGuard } from '@components/guards/DefaultDomainGuard.tsx'
import { AuthGuard, authGuardLoader } from '@components/guards/AuthGuard.tsx'
import {
    NoAuthGuard,
    noAuthGuardLoader,
} from '@components/guards/NoAuthGuard.tsx'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/home" />,
    },
    {
        element: <AuthGuard />,
        loader: authGuardLoader,
        children: [
            {
                element: <UserSetupGuard />,
                children: [
                    {
                        element: <DefaultDomainGuard />,
                        children: [
                            {
                                element: <Layout />,
                                children: [
                                    {
                                        path: 'home',
                                        element: <HomePage />,
                                    },
                                    {
                                        path: 'subdomains/:id',
                                        element: <SubdomainPageLayout />,
                                        children: [
                                            {
                                                path: 'overview',
                                                element: (
                                                    <SubdomainOverviewPage />
                                                ),
                                            },
                                            {
                                                path: 'people',
                                                element: (
                                                    <SubdomainPeoplePage />
                                                ),
                                            },
                                            {
                                                path: 'teams',
                                                element: <SubdomainTeamsPage />,
                                            },
                                            {
                                                path: 'projects',
                                                element: (
                                                    <SubdomainProjectsPage />
                                                ),
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        element: <AuthGuard />,
        loader: authGuardLoader,
        children: [
            {
                path: 'user-setup',
                children: [
                    {
                        path: '',
                        element: <Navigate to="/user-setup/about-you" />,
                    },
                    {
                        path: 'about-you',
                        element: <AccountSetupPage />,
                    },
                    {
                        path: 'create-domain',
                        element: <CreateDomainPage />,
                    },
                ],
            },
        ],
    },
    {
        path: 'auth',
        children: [
            {
                element: <NoAuthGuard />,
                loader: noAuthGuardLoader,
                children: [
                    {
                        path: 'sign-in',
                        element: <SignInPage />,
                    },
                ],
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
        element: <Navigate to="/" />,
    },
])
