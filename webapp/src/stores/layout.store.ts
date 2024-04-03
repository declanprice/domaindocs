import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type LayoutStoreState = {
    isNavBarOpen: boolean,
    closeNavBar: () => void;
}

export const useLayoutStore = create<LayoutStoreState>(devtools((set) => ({
    isNavBarOpen: false,
    closeNavBar: () => set({isNavBarOpen: false}),
})), {name: 'layout-store'});
