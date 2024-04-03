import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import Session from 'supertokens-web-js/recipe/session'
import Passwordless from 'supertokens-web-js/recipe/passwordless'
import { immer } from 'zustand/middleware/immer'
import SuperTokens from 'supertokens-web-js'

SuperTokens.init({
    appInfo: {
        apiDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        appName: 'Domaindocs',
    },
    recipeList: [Passwordless.init(), Session.init()],
});

type AuthStoreState = {
    userId: string | null,
    setUserId: (userId: string) => void,
    signIn: (linkCode: string, preAuthSessionId: string) => Promise<void>,
    signOut: () => Promise<void>,
    checkSession: () => Promise<void>,
}

export const useAuthStore = create<AuthStoreState>(devtools(immer( (set) => {
    return {
        userId: null,
        setUserId: (userId: string) => {
            set((state) => {
                state.userId = userId;
            })
        },
        signOut: async () => {
            await Session.signOut();

            set((state) => {
                state.userId = null;
            })
        },
        signIn: async (linkCode: string, preAuthSessionId: string) => {
            const response = await Passwordless.consumeCode({
                linkCode,
                preAuthSessionId
            } as any);

            if (response.status === 'OK') {
                set((state) => {
                    state.userId = response.user.id;
                })
            }
        },
        checkSession: async () => {
            const doesExist = await Session.doesSessionExist();

            if (doesExist) {
                const userId = await Session.getUserId();

                set((state) => {
                    state.userId = userId;
                })
            }
        }
    }
})), {name: 'auth-store'});
