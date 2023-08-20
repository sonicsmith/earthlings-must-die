import { create, useStore } from 'zustand';
import {
  CallContractReturnType,
  PaperEmbeddedWalletSdk,
  RecoveryShareManagement,
  UserStatus,
} from '@paperxyz/embedded-wallet-service-sdk';
import { getChain } from '~/utils';

export type EVMAddress = `0x${string}` | null;

export type EmbeddedWallet = {
  gasless: {
    callContract: (args: {
      contractAddress: string;
      methodInterface: `function ${string}(${string})${string}` | string;
      methodArgs: Array<unknown>;
    }) => Promise<CallContractReturnType>;
  };
};

export interface AppState {
  appView: 'home' | 'store';
  setAppView: (view: 'home' | 'store') => void;
  email: string | null;
  address: EVMAddress;
  paperSdk: PaperEmbeddedWalletSdk<RecoveryShareManagement.USER_MANAGED> | null;
  wallet: EmbeddedWallet | undefined;
  showMenu: boolean;
  isAlienSelectionView: boolean;
  initPaper: () => void;
  connect: () => Promise<void>;
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
  wallet: undefined,
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
    set({
      address: user?.walletAddress as EVMAddress,
      email: user?.authDetails.email,
      wallet: user?.wallet,
    });
  },
  setShowMenu: (showMenu) => set({ showMenu }),
  setIsAlienSelectionView: (isAlienSelectionView) =>
    set({ isAlienSelectionView }),
}));

export const useAppStore = () => useStore(store);
