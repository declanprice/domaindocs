import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import Session from 'supertokens-web-js/recipe/session'
import Passwordless from 'supertokens-web-js/recipe/passwordless'
import { immer } from 'zustand/middleware/immer'
import SuperTokens from 'supertokens-web-js'
import { GET_USER } from '../graphql/user/queries.ts'
import { User } from '@types/user.ts'
import { gqlClient } from '../graphql/client.ts'

SuperTokens.init({
    appInfo: {
        apiDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        appName: 'Domaindocs',
    },
    recipeList: [Passwordless.init(), Session.init()],
})

type AuthStoreState = {
    userId: string | null
    user: User | null
    setUserId: (userId: string) => void
    setUser: (user: User) => void
    signIn: (linkCode: string, preAuthSessionId: string) => Promise<void>
    signOut: () => Promise<void>
    checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthStoreState>(
    devtools(
        immer((set) => {
            return {
                userId: null,
                user: null,
                setUserId: (userId: string) => {
                    set((state) => {
                        state.userId = userId
                    })
                },
                setUser: (user: User) => {
                    set((state) => {
                        state.user = user
                    })
                },
                signOut: async () => {
                    await Session.signOut()

                    set((state) => {
                        state.userId = null
                    })
                },
                signIn: async (linkCode: string, preAuthSessionId: string) => {
                    const response = await Passwordless.consumeCode({
                        linkCode,
                        preAuthSessionId,
                    } as any)

                    if (response.status === 'OK') {
                        const userId = response.user.id

                        const result: any = await gqlClient.request(GET_USER, {
                            userId,
                        })

                        set((state) => {
                            state.userId = userId
                            state.user = result.user
                        })
                    }
                },
                checkSession: async () => {
                    const doesExist = await Session.doesSessionExist()

                    if (doesExist) {
                        const userId = await Session.getUserId()

                        const result: any = await gqlClient.request(GET_USER, {
                            userId,
                        })

                        set((state) => {
                            state.userId = userId
                            state.user = result.user
                        })
                    }
                },
            }
        }),
        { name: 'auth-store' }
    )
)
