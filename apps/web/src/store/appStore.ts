import { create, useStore } from 'zustand';
import {
  PaperEmbeddedWalletSdk,
  RecoveryShareManagement,
  UserStatus,
} from '@paperxyz/embedded-wallet-service-sdk';
import { getChain } from '~/utils';
import { ECDSAProvider } from '@zerodev/sdk';
import { SmartAccountSigner } from '@alchemy/aa-core';
import {
  TypedDataDomain,
  TypedDataField,
} from '@ethersproject/abstract-signer';

export type EVMAddress = `0x${string}` | null;
export interface AppState {
  appView: 'home' | 'inventory';
  setAppView: (view: 'home' | 'inventory') => void;
  email: string | null;
  address: EVMAddress;
  paperSdk: PaperEmbeddedWalletSdk<RecoveryShareManagement.USER_MANAGED> | null;
  ecdsaProvider: ECDSAProvider | null;
  isAlienDetailView: boolean;
  isAlienSelectionView: boolean;
  showTutorial: boolean;
  initPaper: () => void;
  connect: () => Promise<void>;
  logout: () => void;
  setIsAlienDetailView: (show: boolean) => void;
  setIsAlienSelectionView: (isShowing: boolean) => void;
  setShowTutorial: (show: boolean) => void;
}

const paperClientId = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || '';
const chain = getChain(process.env.NEXT_PUBLIC_CHAIN);
const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || '';

const store = create<AppState>()((set, get) => ({
  appView: 'home',
  setAppView: (appView) => set({ appView }),
  email: null,
  address: null,
  paperSdk: null,
  ecdsaProvider: null,
  isAlienDetailView: false,
  isAlienSelectionView: false,
  showTutorial: false,
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

    // Massage the signer into a SmartAccountSigner
    const smartAccountSigner: SmartAccountSigner = {
      signMessage: (msg) => signer.signMessage(msg) as Promise<`0x${string}`>,
      signTypedData: (params) => {
        const domain: TypedDataDomain = params.domain!;
        const types: Record<string, TypedDataField[]> = {
          ...params.types,
        } as any;
        const message = params.message;
        return signer._signTypedData(
          domain,
          types,
          message
        ) as Promise<`0x${string}`>;
      },
      getAddress: () => signer.getAddress() as Promise<`0x${string}`>,
    };

    const ecdsaProvider = await ECDSAProvider.init({
      projectId: zeroDevProjectId,
      owner: smartAccountSigner,
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
  setIsAlienDetailView: (isAlienDetailView) => set({ isAlienDetailView }),
  setIsAlienSelectionView: (isAlienSelectionView) =>
    set({ isAlienSelectionView }),
  setShowTutorial: (showTutorial) => set({ showTutorial }),
}));

export const useAppStore = () => useStore(store);
