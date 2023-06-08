import { Web3Auth } from '@web3auth/modal';
import { createContext } from 'react';

export const Web3AuthContext = createContext<Web3Auth | null>(null);
