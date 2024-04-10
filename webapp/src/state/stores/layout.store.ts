import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type LayoutStoreState = {
    isFullNavBar: boolean
    closeNavBar: () => void
    openNavBar: () => void
}

export const useLayoutStore = create<LayoutStoreState>()(
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
        { name: 'layout-store' }
    )
)
