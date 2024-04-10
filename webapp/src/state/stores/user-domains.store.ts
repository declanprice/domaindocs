import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Domain, domainApi } from '@state/api/domain-api.ts'

type UserDomainsState = {
    domains: Domain[]
}

export const useUserDomainsStore = create<UserDomainsState>()(
    devtools(
        immer((set) => ({
            domains: [],
            getUserDomains: async () => {
                const result = await domainApi.getUserDomains()

                console.log(result)

                set((state) => {
                    state.domains = result
                })

                return result
            },
        })),
        { name: 'user-domains-store' }
    )
)
