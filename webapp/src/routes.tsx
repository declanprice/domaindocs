import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { SignInPage } from './pages/auth/sign-in/SignInPage';
import { SignUpPage } from './pages/auth/sign-up/SignUpPage';
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage';
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage';
import { UserSetupPage } from './pages/user-setup/UserSetupPage';
import { RootLayout } from './layout/RootLayout';
import { SubdomainOverviewPage } from './pages/subdomain/SubdomainOverviewPage';
import { SubdomainPeoplePage } from './pages/subdomain/SubdomainPeoplePage';
import { SubdomainTeamsPage } from './pages/subdomain/SubdomainTeamsPage';
import { SubdomainProjectsPage } from './pages/subdomain/SubdomainProjectsPage';
import { DomainSetupPage } from './pages/domain-setup/DomainSetupPage';
import { OnboardingPageLayout } from './pages/onboarding/OnboardingPageLayout';
import { SecretsPageLayout } from './pages/secrets/SecretsPageLayout';
import { FilesPageLayout } from './pages/files/FilesPageLayout';
import { DocumentationPageLayout } from './pages/documentation/DocumentationPageLayout';
import { SubdomainCreatePage } from './pages/subdomain/SubdomainCreatePage';
import { PeoplePage } from './pages/people/PeoplePage';
import { TeamsPage } from './pages/teams/TeamsPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { AuthGuard } from './components/guards/AuthGuard';
import { UserSetupGuard } from './components/guards/UserSetupGuard';
import { DomainGuard } from './components/guards/DomainGuard';
import { SubdomainGuard } from './components/guards/SubdomainGuard';
import { NoAuthGuard } from './components/guards/NoAuthGuard';
import { SomethingWentWrongErrorPage } from './components/errors/SomethingWentWrongErrorPage';
import { PageNotFoundErrorPage } from './components/errors/PageNotFoundErrorPage';
import { ProjectOverviewPage } from './pages/project/ProjectOverviewPage';
import { ProjectDocumentationPage } from './pages/project/ProjectDocumentationPage';
import { ProjectSecretsPage } from './pages/project/ProjectSecretsPage';
import { ProjectFilesPage } from './pages/project/ProjectFilesPage';

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
                        children: [
                          {
                            path: '',
                            element: <Navigate to={'overview'} />,
                          },
                          {
                            path: 'overview',
                            element: <SubdomainOverviewPage />,
                          },
                          {
                            path: 'people',
                            element: <SubdomainPeoplePage />,
                          },
                          {
                            path: 'teams',
                            element: <SubdomainTeamsPage />,
                          },
                          {
                            path: 'projects',
                            element: <SubdomainProjectsPage />,
                          },
                        ],
                      },
                    ],
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
                      {
                        path: 'secrets',
                        element: <ProjectSecretsPage />,
                      },
                    ],
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
