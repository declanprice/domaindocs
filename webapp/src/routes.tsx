import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DomainOverviewPage } from './pages/domain/DomainOverviewPage';
import { SignInPage } from './pages/auth/sign-in/SignInPage';
import { SignUpPage } from './pages/auth/sign-up/SignUpPage';
import { VerifyMagicLinkPage } from './pages/auth/VerifyMagicLinkPage';
import { MagicLinkSentPage } from './pages/auth/MagicLinkSentPage';
import { RootLayout } from './root-layout/RootLayout';
import { PeoplePage } from './pages/people/PeoplePage';
import { TeamsPage } from './pages/teams/TeamsPage';
import { ComponentsPage } from './pages/components/ComponentsPage';
import { AuthGuard } from './components/guards/AuthGuard';
import { UserSetupGuard } from './components/guards/UserSetupGuard';
import { DomainGuard } from './components/guards/DomainGuard';
import { SomethingWentWrongErrorPage } from './components/errors/SomethingWentWrongErrorPage';
import { PageNotFoundErrorPage } from './components/errors/PageNotFoundErrorPage';
import { ComponentOverviewPage } from './pages/component/ComponentOverviewPage';
import { ComponentDocsPage } from './pages/component/ComponentDocsPage';
import { DocsPage } from './pages/docs/DocsPage';
import { TeamOverviewPage } from './pages/team/TeamOverviewPage';
import { UserSettingsPage } from './pages/user-settings/UserSettingsPage';
import { PersonOverviewPage } from './pages/person/PersonOverviewPage';
import { WorkAreasPage } from './pages/work-areas/WorkAreasPage';
import { WorkAreaBoardPage } from './pages/work-area/WorkAreaBoardPage';
import { WorkAreaBacklogPage } from './pages/work-area/WorkAreaBacklogPage';
import { WorkAreaItemsPage } from './pages/work-area/WorkAreaItemsPage';
import { WorkAreaIntegrationsPage } from './pages/work-area/WorkAreaIntegrationsPage';
import { WorkAreaSettingsPage } from './pages/work-area/WorkAreaSettingsPage';
import { TicketDeskDashboardPage } from './pages/ticket-desk/TicketDeskDashboardPage';
import { TicketDeskBrowsePage } from './pages/ticket-desk/TicketDeskBrowsePage';
import { TicketDeskYourSubmissionsPage } from './pages/ticket-desk/TicketDeskYourSubmissionsPage';
import { TicketOverviewPage } from './pages/ticket/TicketOverviewPage';
import { TicketFieldsPage } from './pages/ticket/TicketFieldsPage';
import { TicketIntegrationsPage } from './pages/ticket/TicketIntegrationsPage';
import { TicketSettingsPage } from './pages/ticket/TicketSettingsPage';
import { DomainDocumentationPage } from './pages/domain/DomainDocumentationPage';
import { TeamDocsPage } from './pages/team/TeamDocsPage';
import { TeamSettingsPage } from './pages/team/TeamSettingsPage';
import { OnboardingGuidePage } from './pages/onboarding-guide/OnboardingGuidePage';
import { ComponentSettingsPage } from './pages/component/ComponentSettingsPage';
import { DomainSetupPage } from './pages/user-setup/DomainSetupPage';
import { UserSetupPage } from './pages/user-setup/UserSetupPage';
import { NoAuthGuard } from './components/guards/NoAuthGuard';
import { RootNavBar } from './root-layout/RootNavBar';
import { DomainSettingsPage } from './pages/domain/DomainSettingsPage';
import { DomainIntegrationsPage } from './pages/domain/DomainIntegrationsPage';
import { DomainSubdomainsPage } from './pages/domain/DomainSubdomainsPage';
import { DomainNavBar } from './pages/domain/DomainNavBar';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { PersonPageNavBar } from './pages/person/PersonPageNavBar';
import { PersonWorkPage } from './pages/person/PersonWorkPage';
import { TeamPageNavBar } from './pages/team/TeamPageNavBar';
import { TeamWorkPage } from './pages/team/TeamWorkPage';
import { ComponentPageNavBar } from './pages/component/ComponentPageNavBar';
import { ComponentWorkPage } from './pages/component/ComponentWorkPage';
import { ComponentAnnouncementsPage } from './pages/component/ComponentAnnouncementsPage';
import { ComponentDependenciesPage } from './pages/component/ComponentDependenciesPage';
import { TicketDeskPageNavBar } from './pages/ticket-desk/TicketDeskPageNavBar';
import { TicketPageNavBar } from './pages/ticket/TicketPageNavBar';
import { TicketSubmissionPage } from './pages/ticket-submission/TicketSubmissionPage';
import { TicketSubmissionPageNavBar } from './pages/ticket-submission/TicketSubmissionPageNavBar';
import { OnboardingCentreDashboardPage } from './pages/onboarding-centre/OnboardingCentreDashboardPage';
import { OnboardingCentrePageNavBar } from './pages/onboarding-centre/OnboardingCentrePageNavBar';
import { OnboardingCentreBrowsePage } from './pages/onboarding-centre/OnboardingCentreBrowsePage';
import { OnboardingGuidePageNavBar } from './pages/onboarding-guide/OnboardingGuidePageNavBar';
import { OnboardingGuideStepsPage } from './pages/onboarding-guide/OnboardingGuideStepsPage';
import { OnboardingGuideSettingsPage } from './pages/onboarding-guide/OnboardingGuideSettingsPage';
import { WorkAreaPageNavBar } from './pages/work-area/WorkAreaPageNavBar';

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
                                                path: 'documentation',
                                                element: <DomainDocumentationPage />,
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
                                        element: <RootLayout navbar={<PersonPageNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'overview'} />,
                                            },
                                            {
                                                path: 'overview',
                                                element: <PersonOverviewPage />,
                                            },
                                            {
                                                path: 'work',
                                                element: <PersonWorkPage />,
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
                                        element: <RootLayout navbar={<TeamPageNavBar />} />,
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
                                                path: 'work',
                                                element: <TeamWorkPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <TeamSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'components',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <ComponentsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'components/:componentId',
                                        element: <RootLayout navbar={<ComponentPageNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'overview'} />,
                                            },
                                            {
                                                path: 'overview',
                                                element: <ComponentOverviewPage />,
                                            },
                                            {
                                                path: 'docs',
                                                element: <ComponentDocsPage />,
                                            },
                                            {
                                                path: 'work',
                                                element: <ComponentWorkPage />,
                                            },
                                            {
                                                path: 'deps',
                                                element: <ComponentDependenciesPage />,
                                            },
                                            {
                                                path: 'announcements',
                                                element: <ComponentAnnouncementsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <ComponentSettingsPage />,
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
                                        element: <RootLayout navbar={<WorkAreaPageNavBar />} />,
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
                                        path: 'ticket-desk',
                                        element: <RootLayout navbar={<TicketDeskPageNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'dashboard'} />,
                                            },
                                            {
                                                path: 'dashboard',
                                                element: <TicketDeskDashboardPage />,
                                            },
                                            {
                                                path: 'browse',
                                                element: <TicketDeskBrowsePage />,
                                            },
                                            {
                                                path: 'submissions',
                                                element: <TicketDeskYourSubmissionsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'ticket-desk/:ticketId',
                                        element: <RootLayout navbar={<TicketPageNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'overview'} />,
                                            },
                                            {
                                                path: 'overview',
                                                element: <TicketOverviewPage />,
                                            },
                                            {
                                                path: 'fields',
                                                element: <TicketFieldsPage />,
                                            },
                                            {
                                                path: 'integrations',
                                                element: <TicketIntegrationsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <TicketSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'ticket-desk/:ticketId/submissions/:submissionId',
                                        element: <RootLayout navbar={<TicketSubmissionPageNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'submission'} />,
                                            },
                                            {
                                                path: 'submission',
                                                element: <TicketSubmissionPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'onboarding-centre',
                                        element: <RootLayout navbar={<OnboardingCentrePageNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'dashboard'} />,
                                            },
                                            {
                                                path: 'dashboard',
                                                element: <OnboardingCentreDashboardPage />,
                                            },
                                            {
                                                path: 'browse',
                                                element: <OnboardingCentreBrowsePage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'onboarding-centre/:guideId',
                                        element: <RootLayout navbar={<OnboardingGuidePageNavBar />} />,
                                        children: [
                                            {
                                                path: '',
                                                element: <Navigate to={'guide'} />,
                                            },
                                            {
                                                path: 'guide',
                                                element: <OnboardingGuidePage />,
                                            },
                                            {
                                                path: 'steps',
                                                element: <OnboardingGuideStepsPage />,
                                            },
                                            {
                                                path: 'settings',
                                                element: <OnboardingGuideSettingsPage />,
                                            },
                                        ],
                                    },
                                    {
                                        path: 'user-settings',
                                        element: <RootLayout navbar={<RootNavBar />} />,
                                        children: [
                                            {
                                                path: '',
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
