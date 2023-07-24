import { ADDRESSES, IDS } from 'chain';
import { useCallback } from 'react';
import { useNetwork } from 'wagmi';
import { useAppStore } from '~/store/appStore';

export const useLaunchAliens = () => {
  const wallet = useAppStore().wallet;
  const { chain } = useNetwork();

  const launchAlien = useCallback(
    async (tokenId: number) => {
      const chainId = chain?.id || IDS.POLYGON;
      const contractAddress = ADDRESSES[chainId]?.BATTLEFIELD as string;
      const result = await wallet?.gasless.callContract({
        contractAddress,
        methodInterface: 'function attack(uint256 _tokenId) public',
        methodArgs: [tokenId],
      });
      return result?.transactionHash;
    },
    [wallet, chain]
  );

  return { launchAlien };
};
