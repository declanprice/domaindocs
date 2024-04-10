import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import Session from 'supertokens-web-js/recipe/session'
import Passwordless from 'supertokens-web-js/recipe/passwordless'
import { immer } from 'zustand/middleware/immer'
import SuperTokens from 'supertokens-web-js'
import { userApi, User } from '@state/api/user-api.ts'

SuperTokens.init({
    appInfo: {
        apiDomain: 'http://localhost:3000',
        apiBasePath: '/api/auth',
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
    checkSession: () => Promise<boolean>
}

export type CheckSession = {
    hasSession: boolean
    user: User | null
}

export const useAuthStore = create<AuthStoreState>()(
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
                        state.user = null
                    })
                },
                signIn: async (linkCode: string, preAuthSessionId: string) => {
                    const response = await Passwordless.consumeCode({
                        linkCode,
                        preAuthSessionId,
                    } as any)

                    if (response.status === 'OK') {
                        const userId = response.user.id

                        const result = await userApi.getAuthUser()

                        set((state) => {
                            state.userId = userId
                            state.user = result
                        })
                    }
                },
                checkSession: async (): Promise<boolean> => {
                    const hasSession = await Session.doesSessionExist()

                    if (!hasSession) return false

                    const userId = await Session.getUserId()

                    const result = await userApi.getAuthUser()

                    set((state) => {
                        state.userId = userId
                        state.user = result
                    })

                    return true
                },
            }
        }),
        { name: 'auth-store' }
    )
)
