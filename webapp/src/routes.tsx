import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage.tsx'
import { SignInPage } from './pages/auth/sign-in/SignInPage.tsx'
import { SignUpPage } from './pages/auth/sign-up/SignUpPage.tsx'
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage.tsx'
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage.tsx'
import { AccountSetupPage } from './pages/account-setup/AccountSetupPage.tsx'
import { Layout } from './layout/Layout.tsx'
import { SubdomainPageLayout } from './pages/subdomain/SubdomainPageLayout.tsx'
import { SubdomainOverviewPage } from './pages/subdomain/SubdomainOverviewPage.tsx'
import { SubdomainPeoplePage } from './pages/subdomain/SubdomainPeoplePage.tsx'
import { SubdomainTeamsPage } from './pages/subdomain/SubdomainTeamsPage.tsx'
import { SubdomainProjectsPage } from './pages/subdomain/SubdomainProjectsPage.tsx'
import { DomainSetupPage } from './pages/domain-setup/DomainSetupPage.tsx'
import { AuthGuard } from '@components/guards/AuthGuard.tsx'
import { NoAuthGuard } from '@components/guards/NoAuthGuard.tsx'
import { DomainGuard } from '@components/guards/DomainGuard.tsx'
import { UserSetupGuard } from '@components/guards/UserSetupGuard.tsx'
import { PageNotFoundError } from '@components/errors/PageNotFoundError.tsx'

export const routes = createBrowserRouter([
    {
        path: '',
        element: <AuthGuard />,
        children: [
            {
                path: '',
                element: <UserSetupGuard />,
                children: [
                    {
                        path: '',
                        element: <DomainGuard />,
                        children: [
                            {
                                path: ':domainSlug',
                                element: <Layout />,
                                children: [
                                    {
                                        path: 'home',
                                        element: <HomePage />,
                                    },
                                    {
                                        path: 'subdomains/:subdomainSlug',
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
        path: 'user-setup',
        element: <AuthGuard />,
        children: [
            {
                path: '',
                element: <AccountSetupPage />,
            },
        ],
    },
    {
        path: 'domain-setup',
        element: <AuthGuard />,
        children: [
            {
                path: '',
                element: <DomainSetupPage />,
            },
        ],
    },
    {
        path: 'auth',
        element: <NoAuthGuard />,
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
        path: 'page-not-found',
        element: <PageNotFoundError />,
    },
    {
        path: '*',
        element: <Navigate to={''} />,
    },
])
