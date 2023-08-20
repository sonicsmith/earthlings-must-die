import { ADDRESSES } from 'chain';
import { useCallback } from 'react';
import { useAppStore } from '~/store/appStore';

const chain = process.env.NEXT_PUBLIC_CHAIN!;

export const useTransactions = () => {
  const wallet = useAppStore().wallet;

  const launchAlien = useCallback(
    async (tokenId: number) => {
      const result = await wallet?.gasless.callContract({
        contractAddress: ADDRESSES[chain]!.BATTLEFIELD,
        methodInterface: 'function attack(uint256 _tokenId) public',
        methodArgs: [tokenId],
      });
      return result?.transactionHash;
    },
    [wallet, chain]
  );

  const sellRewardTokens = useCallback(
    async (amount: number) => {
      const result = await wallet?.gasless.callContract({
        contractAddress: ADDRESSES[chain]!.BATTLEFIELD,
        methodInterface:
          'function sellRewardTokens(uint256 numberOfTokens) public',
        methodArgs: [amount],
      });
      return result?.transactionHash;
    },
    [wallet, chain]
  );

  return { launchAlien, sellRewardTokens };
};
