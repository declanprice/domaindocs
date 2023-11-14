import { createSignal } from 'solid-js'

export type AuthenticatedUser = {
    id: string
    email: string
    displayName: string
}

export const [authUser, setAuthUser] = createSignal<AuthenticatedUser | null>({
    id: 'a3718d47-1366-457a-8da5-1203f10598cd',
    displayName: 'Declan Price',
    email: 'declanprice1@gmail.com'
})

export const signIn = (options: { email: string; password: string }) => {
    setAuthUser(() => ({
        id: 'a3718d47-1366-457a-8da5-1203f10598cd',
        displayName: 'Declan Price',
        email: options.email
    }))
}

export const signOut = () => {
    setAuthUser(() => null)
}
