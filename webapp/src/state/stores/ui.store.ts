import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Domain } from '@state/api/domains-api.ts'

type UIStoreState = {
    isFullNavBar: boolean
    activeDomain: Domain | null
    setActiveDomain: (domain: Domain) => void
    closeNavBar: () => void
    openNavBar: () => void
}

export const useUiStore = create<UIStoreState>()(
    devtools(
        immer((set) => ({
            isFullNavBar: true,
            activeDomain: null,
            setActiveDomain: (domain: Domain) => {
                set((state) => {
                    state.activeDomain = domain
                })
            },
            closeNavBar: () => {
                set((state) => {
                    state.isFullNavBar = false
                })
            },
            openNavBar: () => {
                set((state) => {
                    state.isFullNavBar = true
                })
            },
        })),
        { name: 'ui-store' }
    )
)
