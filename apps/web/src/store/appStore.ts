import { create, useStore } from 'zustand';
import {
  PaperEmbeddedWalletSdk,
  RecoveryShareManagement,
  UserStatus,
} from '@paperxyz/embedded-wallet-service-sdk';

export type EVMAddress = `0x${string}` | null;

export interface AppState {
  email: string | null;
  address: EVMAddress;
  paperSdk: PaperEmbeddedWalletSdk<RecoveryShareManagement.USER_MANAGED> | null;
  showMenu: boolean;
  isAlienSelectionView: boolean;
  initPaper: () => void;
  connect: () => Promise<void>;
  setShowMenu: (show: boolean) => void;
  setIsAlienSelectionView: (isShowing: boolean) => void;
}

const paperClientId = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || '';

const store = create<AppState>()((set, get) => ({
  email: null,
  address: null,
  paperSdk: null,
  showMenu: false,
  isAlienSelectionView: false,
  initPaper: () => {
    // Only create once
    if (get().paperSdk === null) {
      const paperSdk = new PaperEmbeddedWalletSdk({
        clientId: paperClientId,
        chain: 'Mumbai',
      });
      set({ paperSdk });
    }
  },
  connect: async () => {
    const user = await get().paperSdk?.getUser();
    if (user?.status === UserStatus.LOGGED_IN_WALLET_INITIALIZED) {
      const address = user.walletAddress as EVMAddress;
      set({ address, email: user.authDetails.email });
    } else {
      const res = await get().paperSdk?.auth.loginWithPaperModal();
      const address = res?.user.walletAddress as EVMAddress;
      set({ address, email: res?.user.authDetails.email });
    }
  },
  setShowMenu: (showMenu) => set({ showMenu }),
  setIsAlienSelectionView: (isAlienSelectionView) =>
    set({ isAlienSelectionView }),
}));

export const useAppStore = () => useStore(store);
