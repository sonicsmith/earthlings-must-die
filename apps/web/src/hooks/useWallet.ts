import { useCallback } from 'react';
import { PaperEmbeddedWalletSdk } from '@paperxyz/embedded-wallet-service-sdk';

const paperClientId = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || '';

const paper = new PaperEmbeddedWalletSdk({
  clientId: paperClientId,
  chain: 'Mumbai',
});

export const connectToAuth = async () => {
  return paper.auth.loginWithPaperModal();
};

export const useWallet = () => {
  const connect = useCallback(() => {
    const res = paper.auth.loginWithPaperModal();
  }, []);

  return { connect };
};
