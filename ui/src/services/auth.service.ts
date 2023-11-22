import { createSignal } from 'solid-js'

export type AuthenticatedUser = {
    id: string
    email: string
    firstName: string
    lastName: string
}

export const [authUser, setAuthUser] = createSignal<AuthenticatedUser | null>(null)

export const signIn = (options: { email: string; password: string }) => {
    setAuthUser(() => ({
        id: 'a3718d47-1366-457a-8da5-1203f10598cd',
        firstName: 'Declan',
        lastName: 'Price',
        email: options.email
    }))
}

export const signOut = () => {
    setAuthUser(() => null)
}
