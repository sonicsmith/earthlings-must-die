import { create, useStore } from 'zustand';
import {
  PaperEmbeddedWalletSdk,
  RecoveryShareManagement,
  UserStatus,
} from '@paperxyz/embedded-wallet-service-sdk';
import { getChain } from '~/utils';
import { ECDSAProvider } from '@zerodev/sdk';

export type EVMAddress = `0x${string}` | null;

export interface AppState {
  appView: 'home' | 'inventory';
  setAppView: (view: 'home' | 'inventory') => void;
  email: string | null;
  address: EVMAddress;
  paperSdk: PaperEmbeddedWalletSdk<RecoveryShareManagement.USER_MANAGED> | null;
  ecdsaProvider: ECDSAProvider | null;
  showMenu: boolean;
  isAlienSelectionView: boolean;
  initPaper: () => void;
  connect: () => Promise<void>;
  logout: () => void;
  setShowMenu: (show: boolean) => void;
  setIsAlienSelectionView: (isShowing: boolean) => void;
}

const paperClientId = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || '';
const chain = getChain(process.env.NEXT_PUBLIC_CHAIN);

const store = create<AppState>()((set, get) => ({
  appView: 'home',
  setAppView: (appView) => set({ appView }),
  email: null,
  address: null,
  paperSdk: null,
  ecdsaProvider: null,
  showMenu: false,
  isAlienSelectionView: false,
  initPaper: () => {
    // Only create once
    if (get().paperSdk === null) {
      const paperSdk = new PaperEmbeddedWalletSdk({
        clientId: paperClientId,
        chain,
      });
      set({ paperSdk });
    }
  },
  connect: async () => {
    let user = await get().paperSdk?.getUser();
    if (user?.status !== UserStatus.LOGGED_IN_WALLET_INITIALIZED) {
      const res = await get().paperSdk?.auth.loginWithPaperModal();
      user = res?.user;
    }
    const signer = await user?.wallet.getEthersJsSigner();
    if (!signer) {
      throw new Error('No signer');
    }
    const ecdsaProvider = await ECDSAProvider.init({
      projectId: 'ce825d97-e037-498f-87ea-7ac1962a2471',
      owner: signer as any, // TODO: Fix this
    });
    const address = await ecdsaProvider.getAddress();
    set({
      address,
      ecdsaProvider,
      email: user?.authDetails.email,
    });
  },
  logout: () => {
    const paperSdk = get().paperSdk;
    if (!!paperSdk) {
      paperSdk?.auth.logout().then(console.log);
      set({
        address: null,
        email: null,
      });
    }
  },
  setShowMenu: (showMenu) => set({ showMenu }),
  setIsAlienSelectionView: (isAlienSelectionView) =>
    set({ isAlienSelectionView }),
}));

export const useAppStore = () => useStore(store);
