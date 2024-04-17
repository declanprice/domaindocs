import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { DomainDto } from '@domaindocs/lib';

type UIStoreState = {
  isFullNavBar: boolean;
  activeDomain: DomainDto | null;
  setActiveDomain: (domain: DomainDto) => void;
  closeNavBar: () => void;
  openNavBar: () => void;
};

export const useUiStore = create<UIStoreState>()(
  devtools(
    immer((set) => ({
      isFullNavBar: true,
      activeDomain: null,
      setActiveDomain: (domain: DomainDto) => {
        set((state) => {
          state.activeDomain = domain;
        });
      },
      closeNavBar: () => {
        set((state) => {
          state.isFullNavBar = false;
        });
      },
      openNavBar: () => {
        set((state) => {
          state.isFullNavBar = true;
        });
      },
    })),
    { name: 'ui-store' },
  ),
);
