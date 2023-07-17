import { create, useStore } from 'zustand';
import {
  PaperEmbeddedWalletSdk,
  RecoveryShareManagement,
} from '@paperxyz/embedded-wallet-service-sdk';

export type EVMAddress = `0x${string}` | null;

export interface AppState {
  address: EVMAddress;
  paperSdk: PaperEmbeddedWalletSdk<RecoveryShareManagement.USER_MANAGED> | null;
  initPaper: () => void;
  connect: () => Promise<void>;
}

const paperClientId = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || '';

const store = create<AppState>()((set, get) => ({
  address: null,
  paperSdk: null,
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
}));

export const useAppStore = () => useStore(store);
