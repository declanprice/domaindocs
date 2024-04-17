import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless';
import { immer } from 'zustand/middleware/immer';
import SuperTokens from 'supertokens-web-js';
import { usersApi } from '../api/users-api';
import { DomainDto, UserDto } from '@domaindocs/lib';

SuperTokens.init({
  appInfo: {
    apiDomain: 'http://localhost:3000',
    apiBasePath: '/api/auth',
    appName: 'Domaindocs',
  },
  recipeList: [Passwordless.init(), Session.init()],
});

type AuthStoreState = {
  userId: string | null;
  user: UserDto | null;
  setUserId: (userId: string) => void;
  setUser: (user: UserDto) => void;
  setUserDomains: (domain: DomainDto) => void;
  signIn: (linkCode: string, preAuthSessionId: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
};

export const useAuthStore = create<AuthStoreState>()(
  devtools(
    immer((set) => {
      return {
        userId: null,
        user: null,
        setUserId: (userId: string) => {
          set((state) => {
            state.userId = userId;
          });
        },
        setUser: (user: UserDto) => {
          set((state) => {
            state.user = user;
          });
        },
        setUserDomains: (domain: DomainDto) => {
          set((state) => {
            if (state.user) {
              state.user.domains = [domain];
            }
          });
        },
        signOut: async () => {
          await Session.signOut();

          set((state) => {
            state.userId = null;
            state.user = null;
          });
        },
        signIn: async (linkCode: string, preAuthSessionId: string) => {
          const response = await Passwordless.consumeCode({
            linkCode,
            preAuthSessionId,
          } as any);

          if (response.status === 'OK') {
            const userId = response.user.id;

            const result = await usersApi.getAuthUser();

            set((state) => {
              state.userId = userId;
              state.user = result;
            });
          }
        },
        checkSession: async () => {
          const hasSession = await Session.doesSessionExist();

          if (!hasSession) return;

          const userId = await Session.getUserId();

          const result = await usersApi.getAuthUser();

          set((state) => {
            state.userId = userId;
            state.user = result;
          });
        },
      };
    }),
    { name: 'auth-store' },
  ),
);
