import { Web3Auth } from '@web3auth/modal';
import { createContext } from 'react';

interface Web3AuthContextValue {
  web3Auth: Web3Auth | null;
  connect: () => void;
}

export const Web3AuthContext = createContext<Web3Auth | null>(null);
