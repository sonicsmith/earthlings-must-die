import { SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { createContext } from 'react';

interface Web3AuthContextValue {
  web3Auth: Web3Auth | null;
  provider: SafeEventEmitterProvider | null;
  connect: () => Promise<void>;
}

export const Web3AuthContext = createContext<Web3AuthContextValue>({
  web3Auth: null,
  provider: null,
  connect: () => Promise.resolve(),
});
