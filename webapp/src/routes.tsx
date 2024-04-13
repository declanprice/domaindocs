import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage.tsx'
import { SignInPage } from './pages/auth/sign-in/SignInPage.tsx'
import { SignUpPage } from './pages/auth/sign-up/SignUpPage.tsx'
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage.tsx'
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage.tsx'
import { AccountSetupPage } from './pages/user-setup/AccountSetupPage.tsx'
import { RootLayout } from './layout/RootLayout.tsx'
import { SubdomainRootPage } from './pages/subdomains/SubdomainRootPage.tsx'
import { SubdomainOverviewPage } from './pages/subdomains/SubdomainOverviewPage.tsx'
import { SubdomainPeoplePage } from './pages/subdomains/SubdomainPeoplePage.tsx'
import { SubdomainTeamsPage } from './pages/subdomains/SubdomainTeamsPage.tsx'
import { SubdomainProjectsPage } from './pages/subdomains/SubdomainProjectsPage.tsx'
import { DomainSetupPage } from './pages/domain-setup/DomainSetupPage.tsx'
import { AuthGuard } from '@components/guards/AuthGuard.tsx'
import { NoAuthGuard } from '@components/guards/NoAuthGuard.tsx'
import { DomainGuard } from '@components/guards/DomainGuard.tsx'
import { UserSetupGuard } from '@components/guards/UserSetupGuard.tsx'
import { PageNotFoundErrorPage } from '@components/errors/PageNotFoundErrorPage.tsx'
import { PeoplePageLayout } from './pages/people/PeoplePageLayout.tsx'
import { OnboardingPageLayout } from './pages/onboarding/OnboardingPageLayout.tsx'
import { SecretsPageLayout } from './pages/secrets/SecretsPageLayout.tsx'
import { FilesPageLayout } from './pages/files/FilesPageLayout.tsx'
import { DocumentationPageLayout } from './pages/documentation/DocumentationPageLayout.tsx'
import { SomethingWentWrongErrorPage } from '@components/errors/SomethingWentWrongErrorPage.tsx'
import { SubdomainGuard } from '@components/guards/SubdomainGuard.tsx'
import { SubdomainCreatePage } from './pages/subdomains/SubdomainCreatePage.tsx'
import { PeoplePage } from './pages/people/PeoplePage.tsx'

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
                                path: ':domainId',
                                element: <RootLayout />,
                                children: [
                                    {
                                        path: '',
                                        element: <Navigate to={'home'} />,
                                    },
                                    {
                                        path: 'home',
                                        element: <HomePage />,
                                    },
                                    {
                                        path: 'sd-create',
                                        element: <SubdomainCreatePage />,
                                    },
                                    {
                                        path: 'sd',
                                        element: <SubdomainGuard />,
                                        children: [
                                            {
                                                path: ':subdomainId',
                                                element: <SubdomainRootPage />,
                                                children: [
                                                    {
                                                        path: '',
                                                        element: (
                                                            <Navigate
                                                                to={'overview'}
                                                            />
                                                        ),
                                                    },
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
                                                        element: (
                                                            <SubdomainTeamsPage />
                                                        ),
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
                                    {
                                        path: 'people',
                                        element: <PeoplePageLayout />,
                                        children: [
                                            {
                                                path: '',
                                                element: <PeoplePage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'teams',
                                        element: <PeoplePageLayout />,
                                    },
                                    {
                                        path: 'projects',
                                        element: <PeoplePageLayout />,
                                    },
                                    {
                                        path: 'documentation',
                                        element: <DocumentationPageLayout />,
                                    },
                                    {
                                        path: 'files',
                                        element: <FilesPageLayout />,
                                    },
                                    {
                                        path: 'secrets',
                                        element: <SecretsPageLayout />,
                                    },
                                    {
                                        path: 'onboarding',
                                        element: <OnboardingPageLayout />,
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
        path: 'users-setup',
        element: <AuthGuard />,
        children: [
            {
                path: '',
                element: <AccountSetupPage />,
            },
        ],
    },
    {
        path: 'domains-setup',
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
        path: 'something-went-wrong',
        element: <SomethingWentWrongErrorPage />,
    },
    {
        path: 'page-not-found',
        element: <PageNotFoundErrorPage />,
    },
    {
        path: '*',
        element: <Navigate to={''} />,
    },
])
