import './App.css'
import { authUser } from '@services'
import { Layout } from './layout/Layout.tsx'
import { Route, Router, Routes } from '@solidjs/router'
import { AuthSignInPage } from './pages/auth/AuthSignInPage.tsx'
import { AuthSignUpPage } from './pages/auth/AuthSignUpPage.tsx'
import { DomainPage } from './pages/domain/DomainPage.tsx'
import { DomainSettingsPage } from './pages/domain-settings/DomainSettingsPage.tsx'
import { SubDomainPage } from './pages/sub-domain/SubDomainPage.tsx'
import { ServicePage } from './pages/service/ServicePage.tsx'
import { UserSettingsPage } from './pages/user/UserSettingsPage.tsx'
import { Match, Switch } from 'solid-js'
import { DocumentationPage } from './pages/documentation/DocumentationPage.tsx'
import { DocumentationUploadFilesPage } from './pages/documentation/DocumentationUploadFilesPage.tsx'

const App = () => {
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
                <Router>
                    <Layout>
                        <Routes>
                            <Route
                                path="/domain/:domainId"
                                component={DomainPage}
                            />
                            <Route
                                path="/domain/:domainId/settings"
                                component={DomainSettingsPage}
                            />
                            <Route
                                path={
                                    '/domain/:domainId/subdomain/:subDomainId'
                                }
                                component={SubDomainPage}
                            />
                            <Route
                                path={
                                    '/domain/:domainId/subdomain/:subDomainId/service/:serviceId'
                                }
                                component={ServicePage}
                            />

                            <Route
                                path={'/documentation'}
                                component={DocumentationPage}
                            />

                            <Route
                                path={'/documentation/:folderId/upload-files'}
                                component={DocumentationUploadFilesPage}
                            />

                            <Route
                                path={'/settings'}
                                component={UserSettingsPage}
                            />
                            <Route path="/*" component={DomainPage} />
                        </Routes>
                    </Layout>
                </Router>
            </Match>
        </Switch>
    )
}

export default App
