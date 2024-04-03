import { create } from 'zustand'

import { devtools } from 'zustand/middleware'

type AuthStoreState = {
    user: AuthenticatedUser | null,
    signIn: () => void
}

type AuthenticatedUser = {
    userId: string,
    email: string,
    firstName: string,
    lastName: string
}

export const useAuthStore = create<AuthStoreState>(devtools((set) => ({
    user: null,
    signIn: () => set(state => ({
        user: {
            userId: '1',
            email: 'declanprice1@gmail.com',
            firstName: 'declan',
            lastName: 'price'
        }
    })),
})), {name: 'auth-store'});
