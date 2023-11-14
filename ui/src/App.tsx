import './App.css'
import { authUser, fetchSelectableDomains, selectedDomain } from '@services'
import { Layout } from './layout/Layout.tsx'
import { Route, Router, Routes } from '@solidjs/router'
import { AuthSignInPage } from './pages/auth/AuthSignInPage.tsx'
import { AuthSignUpPage } from './pages/auth/AuthSignUpPage.tsx'
import { DomainPage } from './pages/domain/DomainPage.tsx'
import { DomainSettingsPage } from './pages/domain-settings/DomainSettingsPage.tsx'
import { SubDomainPage } from './pages/sub-domain/SubDomainPage.tsx'
import { ServicePage } from './pages/service/ServicePage.tsx'
import { UserSettingsPage } from './pages/user/UserSettingsPage.tsx'
import { createEffect, lazy, Match, Switch } from 'solid-js'
import { CreateDomainPage } from './pages/domain/CreateDomainPage.tsx'

const DocumentationPage = lazy(() => import('./pages/documentation/DocumentationPage.tsx'))

const DocumentationUploadFilesPage = lazy(() => import('./pages/documentation/DocumentationUploadFilesPage.tsx'))

const DocumentationTextEditorPage = lazy(() => import('./pages/documentation/DocumentationTextEditorPage.tsx'))

const App = () => {
    createEffect(async () => {
        const user = authUser()

        if (user === null) return

        await fetchSelectableDomains(user.id)
    })

    return (
        <Switch>
            <Match when={authUser() === null}>
                <Router>
                    <Routes>
                        <Route path="/sign-in" component={AuthSignInPage} />
                        <Route path="/sign-up" component={AuthSignUpPage} />
                        <Route path="/*" component={AuthSignInPage} />
                    </Routes>
                </Router>
            </Match>
            <Match when={authUser()}>
                <Switch>
                    <Match when={selectedDomain() === null}>
                        <CreateDomainPage />
                    </Match>

                    <Match when={selectedDomain() !== null}>
                        <Router>
                            <Layout>
                                <Routes>
                                    <Route path="/domain/:domainId" component={DomainPage} />

                                    <Route path="/domain/:domainId/settings" component={DomainSettingsPage} />

                                    <Route
                                        path={'/domain/:domainId/subdomain/:subDomainId'}
                                        component={SubDomainPage}
                                    />

                                    <Route
                                        path={'/domain/:domainId/subdomain/:subDomainId/service/:serviceId'}
                                        component={ServicePage}
                                    />

                                    <Route path={'/documentation'} component={DocumentationPage} />

                                    <Route
                                        path={'/documentation/:folderId/upload-files'}
                                        component={DocumentationUploadFilesPage}
                                    />

                                    <Route
                                        path={'/documentation/:folderId/text-editor'}
                                        component={DocumentationTextEditorPage}
                                    />

                                    <Route path={'/settings'} component={UserSettingsPage} />

                                    <Route path="/*" component={DomainPage} />
                                </Routes>
                            </Layout>
                        </Router>
                    </Match>
                </Switch>
            </Match>
        </Switch>
    )
}

export default App
