import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomeDashboardPage } from './pages/home/HomeDashboardPage';
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
import { ProjectDocsPage } from './pages/project/ProjectDocsPage';
import { DocsPage } from './pages/docs/DocsPage';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';
import { TeamOverviewPage } from './pages/team/TeamOverviewPage';
import { UserSettingsPage } from './pages/user-settings/UserSettingsPage';
import { PersonPage } from './pages/person/PersonPage';
import { InboxPage } from './pages/inbox/InboxPage';
import { WorkAreasPage } from './pages/work-areas/WorkAreasPage';
import { WorkAreaBoardPage } from './pages/work-area/WorkAreaBoardPage';
import { WorkAreaBacklogPage } from './pages/work-area/WorkAreaBacklogPage';
import { WorkAreaItemsPage } from './pages/work-area/WorkAreaItemsPage';
import { WorkAreaIntegrationsPage } from './pages/work-area/WorkAreaIntegrationsPage';
import { WorkAreaSettingsPage } from './pages/work-area/WorkAreaSettingsPage';
import { FormsPage } from './pages/forms/FormsPage';
import { FormsYourFormsPage } from './pages/forms/FormsYourFormsPage';
import { FormsYourSubmissionsPage } from './pages/forms/FormsYourSubmissionsPage';
import { FormSubmissionsPage } from './pages/form/FormSubmissionsPage';
import { FormFieldsPage } from './pages/form/FormFieldsPage';
import { FormIntegrationsPage } from './pages/form/FormIntegrationsPage';
import { FormSettingsPage } from './pages/form/FormSettingsPage';
import { IntegrationsConnectionsPage } from './pages/integrations/IntegrationsConnectionsPage';
import { IntegrationRulesPage } from './pages/integrations/IntegrationRulesPage';
import { DomainSettingsPage } from './pages/domain-settings/DomainSettingsPage';
import { HomeDocsPage } from './pages/home/HomeDocsPage';
import { HomeNoticeBoardPage } from './pages/home/HomeNoticeBoardPage';
import { TeamDocsPage } from './pages/team/TeamDocsPage';
import { TeamSettingsPage } from './pages/team/TeamSettingsPage';
import { OnboardingGuidePage } from './pages/onboarding-guide/OnboardingGuidePage';
import { OnboardingGuideFormPage } from './pages/onboarding-guide-form/OnboardingGuideFormPage';

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
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'dashboard'} />,
                                            },
                                            {
                                                path: 'dashboard',
                                                element: <HomeDashboardPage />,
                                            },
                                            {
                                                path: 'notice-board',
                                                element: <HomeNoticeBoardPage />,
                                            },
                                            {
                                                path: 'docs',
                                                element: <HomeDocsPage />,
                                            },
                                            {
                                                path: 'files',
                                                element: <HomeDocsPage />,
                                            },
                                        ],
                                    },

                                    {
                                        path: 'people',
                                        element: <PeoplePage />,
                                    },
                                    {
                                        path: 'people/:userId',
                                        element: <PersonPage />,
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
                                                path: 'docs',
                                                element: <ProjectDocsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'docs',
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
                                        element: <WorkAreasPage />,
                                    },
                                    {
                                        path: 'work-areas/:workAreaId',
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
                                                path: 'integrations',
                                                element: <WorkAreaIntegrationsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <WorkAreaSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'forms',
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
                                        path: 'forms/:formId',
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'submissions'} />,
                                            },
                                            {
                                                path: 'submissions',
                                                element: <FormSubmissionsPage />,
                                            },
                                            {
                                                path: 'fields',
                                                element: <FormFieldsPage />,
                                            },
                                            {
                                                path: 'integrations',
                                                element: <FormIntegrationsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <FormSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'onboarding',
                                        element: <OnboardingPage />,
                                    },
                                    {
                                        path: 'onboarding/new',
                                        element: <OnboardingGuideFormPage />,
                                    },
                                    {
                                        path: 'onboarding/:guideId',
                                        element: <OnboardingGuidePage />,
                                    },
                                    {
                                        path: 'onboarding/:guideId/edit',
                                        element: <OnboardingGuideFormPage />,
                                    },
                                    {
                                        path: 'user-settings',
                                        element: <UserSettingsPage />,
                                    },
                                    {
                                        path: 'inbox',
                                        element: <InboxPage />,
                                    },
                                    {
                                        path: 'integrations',
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'connections'} />,
                                            },
                                            {
                                                path: 'connections',
                                                element: <IntegrationsConnectionsPage />,
                                            },
                                            {
                                                path: 'rules',
                                                element: <IntegrationRulesPage />,
                                            },
                                        ],
                                    },
                                    { path: 'settings', element: <DomainSettingsPage /> },
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
