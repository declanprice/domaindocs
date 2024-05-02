import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { SignInPage } from './pages/auth/sign-in/SignInPage';
import { SignUpPage } from './pages/auth/sign-up/SignUpPage';
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage';
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage';
import { UserSetupPage } from './pages/user-setup/UserSetupPage';
import { RootLayout } from './layout/RootLayout';
import { DomainSetupPage } from './pages/domain-setup/DomainSetupPage';
import { PeoplePage } from './pages/people/PeoplePage';
import { TeamsPage } from './pages/teams/TeamsPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { AuthGuard } from './components/guards/AuthGuard';
import { UserSetupGuard } from './components/guards/UserSetupGuard';
import { DomainGuard } from './components/guards/DomainGuard';
import { NoAuthGuard } from './components/guards/NoAuthGuard';
import { SomethingWentWrongErrorPage } from './components/errors/SomethingWentWrongErrorPage';
import { PageNotFoundErrorPage } from './components/errors/PageNotFoundErrorPage';
import { ProjectOverviewPage } from './pages/project/ProjectOverviewPage';
import { ProjectDocumentationPage } from './pages/project/ProjectDocumentationPage';
import { ProjectFilesPage } from './pages/project/ProjectFilesPage';
import { DocumentationPage } from './pages/documentation/DocumentationPage';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';
import { TeamPage } from './pages/team/TeamPage';

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
                                        path: 'people',
                                        element: <PeoplePage />,
                                    },
                                    {
                                        path: 'teams',
                                        element: <TeamsPage />,
                                    },
                                    {
                                        path: 'teams/:teamId',
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'overview'} />,
                                            },
                                            {
                                                path: 'overview',
                                                element: <TeamPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'projects',
                                        element: <ProjectsPage />,
                                    },
                                    {
                                        path: 'projects/:projectId',
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'overview'} />,
                                            },
                                            {
                                                path: 'overview',
                                                element: <ProjectOverviewPage />,
                                            },
                                            {
                                                path: 'documentation',
                                                element: <ProjectDocumentationPage />,
                                            },
                                            {
                                                path: 'files',
                                                element: <ProjectFilesPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'documentation',
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'relevant'} />,
                                            },
                                            {
                                                path: 'relevant',
                                                element: <DocumentationPage />,
                                            },
                                            {
                                                path: 'all',
                                                element: <DocumentationPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'onboarding',
                                        element: <OnboardingPage />,
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
                element: <UserSetupPage />,
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
]);
