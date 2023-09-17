import { create, useStore } from 'zustand';
import { sequence } from '0xsequence';

export type EVMAddress = `0x${string}` | null;

export interface AppState {
  appView: 'home' | 'store';
  setAppView: (view: 'home' | 'store') => void;
  email: string | null;
  address: EVMAddress;
  wallet: sequence.provider.SequenceProvider | null;
  showMenu: boolean;
  isAlienSelectionView: boolean;
  connect: () => Promise<void>;
  setShowMenu: (show: boolean) => void;
  setIsAlienSelectionView: (isShowing: boolean) => void;
}

const store = create<AppState>()((set, get) => ({
  appView: 'home',
  setAppView: (appView) => set({ appView }),
  email: null,
  address: null,
  wallet: null,
  showMenu: false,
  isAlienSelectionView: false,
  connect: async () => {
    const wallet = await sequence.initWallet({ defaultNetwork: 'mumbai' });
    const connectDetails = await wallet.connect({
      app: 'Earthlings Must Die',
    });
    console.log(connectDetails);
    if (connectDetails.connected) {
      // const { email } = connectDetails;
      const address = wallet.getAddress() as EVMAddress;
      set({ address, wallet });
    }
  },
  setShowMenu: (showMenu) => set({ showMenu }),
  setIsAlienSelectionView: (isAlienSelectionView) =>
    set({ isAlienSelectionView }),
}));

export const useAppStore = () => useStore(store);
