import { createSignal } from 'solid-js'

export type AuthenticatedUser = {
    id: string
    email: string
    displayName: string
}

export const authService = (() => {
    const [authUser, setAuthUser] = createSignal<AuthenticatedUser | null>({
        id: '123',
        displayName: 'Declan Price',
        email: 'declanprice1@gmail.com'
    })

    const signIn = (options: { email: string; password: string }) => {
        setAuthUser(() => ({
            id: '123',
            displayName: 'Declan Price',
            email: options.email
        }))
    }

    const signOut = () => {
        setAuthUser(() => null)
    }

    return {
        authUser,
        signIn,
        signOut
    }
})()
