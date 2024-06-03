import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DomainOverviewPage } from './pages/domain/DomainOverviewPage';
import { SignInPage } from './pages/auth/sign-in/SignInPage';
import { SignUpPage } from './pages/auth/sign-up/SignUpPage';
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage';
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage';
import { RootLayout } from './root-layout/RootLayout';
import { PeoplePage } from './pages/people/PeoplePage';
import { TeamsPage } from './pages/teams/TeamsPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { AuthGuard } from './components/guards/AuthGuard';
import { UserSetupGuard } from './components/guards/UserSetupGuard';
import { DomainGuard } from './components/guards/DomainGuard';
import { SomethingWentWrongErrorPage } from './components/errors/SomethingWentWrongErrorPage';
import { PageNotFoundErrorPage } from './components/errors/PageNotFoundErrorPage';
import { ProjectOverviewPage } from './pages/project/ProjectOverviewPage';
import { ProjectDocsPage } from './pages/project/ProjectDocsPage';
import { DocsPage } from './pages/docs/DocsPage';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';
import { TeamOverviewPage } from './pages/team/TeamOverviewPage';
import { UserSettingsPage } from './pages/user-settings/UserSettingsPage';
import { PersonPage } from './pages/person/PersonPage';
import { WorkAreasPage } from './pages/work-areas/WorkAreasPage';
import { WorkAreaBoardPage } from './pages/work-area/WorkAreaBoardPage';
import { WorkAreaBacklogPage } from './pages/work-area/WorkAreaBacklogPage';
import { WorkAreaItemsPage } from './pages/work-area/WorkAreaItemsPage';
import { WorkAreaAutomationsPage } from './pages/work-area/WorkAreaAutomationsPage';
import { WorkAreaSettingsPage } from './pages/work-area/WorkAreaSettingsPage';
import { FormsPage } from './pages/forms/FormsPage';
import { FormsYourFormsPage } from './pages/forms/FormsYourFormsPage';
import { FormsYourSubmissionsPage } from './pages/forms/FormsYourSubmissionsPage';
import { FormOverviewPage } from './pages/form/FormOverviewPage';
import { FormFieldsPage } from './pages/form/FormFieldsPage';
import { FormAutomationsPage } from './pages/form/FormAutomationsPage';
import { FormSettingsPage } from './pages/form/FormSettingsPage';
import { DomainDocumentationPage } from './pages/domain/DomainDocumentationPage';
import { TeamDocsPage } from './pages/team/TeamDocsPage';
import { TeamSettingsPage } from './pages/team/TeamSettingsPage';
import { OnboardingGuidePage } from './pages/onboarding-guide/OnboardingGuidePage';
import { OnboardingGuideFormPage } from './pages/onboarding-guide-form/OnboardingGuideFormPage';
import { ProjectSettingsPage } from './pages/project/ProjectSettingsPage';
import { DomainSetupPage } from './pages/user-setup/DomainSetupPage';
import { UserSetupPage } from './pages/user-setup/UserSetupPage';
import { NoAuthGuard } from './components/guards/NoAuthGuard';
import { RootNavBar } from './root-layout/RootNavBar';
import { DomainSettingsPage } from './pages/domain/DomainSettingsPage';
import { DomainIntegrationsPage } from './pages/domain/DomainIntegrationsPage';
import { DomainSubdomainsPage } from './pages/domain/DomainSubdomainsPage';
import { DomainNavBar } from './pages/domain/DomainNavBar';
import { DashboardPage } from './pages/dashboard/DashboardPage';

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
                                children: [
                                    {
                                        path: '',
                                        element: <Navigate to={'domain'} />,
                                    },
                                    {
                                        path: 'dashboard',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <DashboardPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'domain',
                                        element: <RootLayout navbar={<DomainNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'overview'} />,
                                            },
                                            {
                                                path: 'overview',
                                                element: <DomainOverviewPage />,
                                            },
                                            {
                                                path: 'subdomains',
                                                element: <DomainDocumentationPage />,
                                            },
                                            {
                                                path: 'documentation',
                                                element: <DomainSubdomainsPage />,
                                            },
                                            {
                                                path: 'integrations',
                                                element: <DomainIntegrationsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <DomainSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'people',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <PeoplePage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'people/:userId',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <PersonPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'teams',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <TeamsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'teams/:teamId',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'overview'} />,
                                            },
                                            {
                                                path: 'overview',
                                                element: <TeamOverviewPage />,
                                            },
                                            {
                                                path: 'docs',
                                                element: <TeamDocsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <TeamSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'projects',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <ProjectsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'projects/:projectId',
                                        element: <RootLayout navbar={<RootNavBar />} />,
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
                                                path: 'docs',
                                                element: <ProjectDocsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <ProjectSettingsPage />,
                                            },
                                        ],
                                    },

                                    {
                                        path: 'docs',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'relevant'} />,
                                            },
                                            {
                                                path: 'relevant',
                                                element: <DocsPage />,
                                            },
                                            {
                                                path: 'all',
                                                element: <DocsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'work-areas',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <WorkAreasPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'work-areas/:areaId',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'board'} />,
                                            },
                                            {
                                                path: 'board',
                                                element: <WorkAreaBoardPage />,
                                            },
                                            {
                                                path: 'backlog',
                                                element: <WorkAreaBacklogPage />,
                                            },
                                            {
                                                path: 'items',
                                                element: <WorkAreaItemsPage />,
                                            },
                                            {
                                                path: 'automations',
                                                element: <WorkAreaAutomationsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <WorkAreaSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'help-desk',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <FormsPage />,
                                            },
                                            {
                                                path: 'your-submissions',
                                                element: <FormsYourSubmissionsPage />,
                                            },
                                            {
                                                path: 'your-forms',
                                                element: <FormsYourFormsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'help-desk/:formId',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'overview'} />,
                                            },
                                            {
                                                path: 'overview',
                                                element: <FormOverviewPage />,
                                            },
                                            {
                                                path: 'fields',
                                                element: <FormFieldsPage />,
                                            },
                                            {
                                                path: 'automations',
                                                element: <FormAutomationsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <FormSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'onboarding-centre',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: 'dashboard',
                                                element: <OnboardingPage />,
                                            },
                                            {
                                                path: 'new-guide',
                                                element: <OnboardingGuideFormPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'onboarding-centre/:guideId',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <OnboardingGuidePage />,
                                            },
                                            {
                                                path: 'edit-guide',
                                                element: <OnboardingGuideFormPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'user-settings',
                                        element: <UserSettingsPage />,
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
        path: 'setup',
        element: <AuthGuard />,
        children: [
            {
                path: 'user',
                element: <UserSetupPage />,
            },
            {
                path: 'domain',
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
