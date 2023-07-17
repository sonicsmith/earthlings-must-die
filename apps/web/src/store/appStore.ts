import { create, useStore } from 'zustand';
import {
  PaperEmbeddedWalletSdk,
  RecoveryShareManagement,
} from '@paperxyz/embedded-wallet-service-sdk';

export type EVMAddress = `0x${string}` | null;

export interface AppState {
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
    const res = await get().paperSdk?.auth.loginWithPaperModal();
    const address = res?.user.walletAddress as EVMAddress;
    set({ address });
  },
  setShowMenu: (showMenu) => set({ showMenu }),
  setIsAlienSelectionView: (isAlienSelectionView) =>
    set({ isAlienSelectionView }),
}));

export const useAppStore = () => useStore(store);
