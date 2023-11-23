import './App.css'
import { authUser, fetchSelectableOrganisations, selectedOrganisation } from '@services'
import { Route, Router, Routes } from '@solidjs/router'
import { createEffect, Match, Switch } from 'solid-js'
import { Layout } from './layout/Layout.tsx'
import { AuthSignInPage } from './pages/auth/AuthSignInPage.tsx'
import { AuthSignUpPage } from './pages/auth/AuthSignUpPage.tsx'
import { OrganisationPage } from './pages/organisation/OrganisationPage.tsx'
import { NoOrganisationPage } from './pages/organisation/NoOrganisationPage.tsx'
import { Toaster } from 'solid-toast'

const App = () => {
    createEffect(async () => {
        const user = authUser()

        if (user === null) return

        await fetchSelectableOrganisations(user.id)
    })

    return (
        <>
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
                        <Match when={selectedOrganisation() === null}>
                            <NoOrganisationPage />
                        </Match>

                        <Match when={selectedOrganisation() !== null}>
                            <Router>
                                <Layout>
                                    <Routes>
                                        <Route path="/organisation/:organisationId" component={OrganisationPage} />

                                        <Route path="/*" component={OrganisationPage} />
                                    </Routes>
                                </Layout>
                            </Router>
                        </Match>
                    </Switch>
                </Match>
            </Switch>
            <Toaster />
        </>
    )
}

export default App
