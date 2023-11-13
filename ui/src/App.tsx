import './App.css'
import { authService } from '@services'
import { Layout } from './layout/Layout.tsx'
import { Route, Router, Routes } from '@solidjs/router'
import { AuthSignInPage } from './pages/auth/AuthSignInPage.tsx'
import { AuthSignUpPage } from './pages/auth/AuthSignUpPage.tsx'
import { DomainPage } from './pages/domain/DomainPage.tsx'
import { DomainSettingsPage } from './pages/domain-settings/DomainSettingsPage.tsx'

const App = () => {
    const user = authService.authUser()

    if (user === null) {
        return (
            <Router>
                <Routes>
                    <Route path="/sign-in" component={AuthSignInPage} />
                    <Route path="/sign-up" component={AuthSignUpPage} />
                    <Route path="/*" component={AuthSignInPage} />
                </Routes>
            </Router>
        )
    }

    return (
        <Layout>
            <Router>
                <Routes>
                    <Route path="/domain/:domainId" component={DomainPage} />

                    <Route
                        path="/domain/:domainId/settings"
                        component={DomainSettingsPage}
                    />

                    <Route path="/*" component={DomainPage} />
                </Routes>
            </Router>
        </Layout>
    )
}

export default App
