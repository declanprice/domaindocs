import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type UIStoreState = {
    isFullNavBar: boolean
    closeNavBar: () => void
    openNavBar: () => void
}

export const useUiStore = create<UIStoreState>()(
    devtools(
        immer((set) => ({
            isFullNavBar: true,
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
