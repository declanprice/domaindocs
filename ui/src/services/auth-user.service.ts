import { createSignal } from 'solid-js'
import { AuthenticatedClaims, AuthenticatedUser } from 'shared-lib'
import axiosClient from './axiosClient.ts'

export const [authUser, setAuthUser] = createSignal<AuthenticatedUser | null>(null)

export const signIn = async (options: { email: string; password: string }): Promise<void> => {
    console.log(options)

    const { data } = await axiosClient.get<AuthenticatedUser>('/users')

    setAuthUser({
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
    })
}

export const signOut = () => {
    setAuthUser(() => null)
}

export const getAuthToken = (): AuthenticatedClaims => {
    return {
        'cognito:username': 'a3718d47-1366-457a-8da5-1203f10598cd',
        email: 'declanprice1@gmail.com',
        'custom:signUpFirstName': 'Declan',
        'custom:signUpLastName': 'Price'
    }
}
