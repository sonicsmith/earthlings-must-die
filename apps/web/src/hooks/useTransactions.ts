import { ADDRESSES } from 'chain';
import { useCallback } from 'react';
import { useAppStore } from '~/store/appStore';
import battlefieldArtifacts from 'chain/artifacts/contracts/BattlefieldEarth.sol/BattlefieldEarth.json';
import { encodeFunctionData } from 'viem';

const chain = process.env.NEXT_PUBLIC_CHAIN!;

const battleFieldContract = ADDRESSES[chain]!.BATTLEFIELD;

export const useTransactions = () => {
  const { ecdsaProvider } = useAppStore();

  const launchAlien = useCallback(
    async (tokenId: number) => {
      const userOp = {
        target: battleFieldContract,
        data: encodeFunctionData({
          abi: battlefieldArtifacts.abi,
          functionName: 'attack',
          args: [BigInt(tokenId)],
        }),
      };
      if (!ecdsaProvider) {
        throw new Error('No ecdsaProvider');
      }
      return ecdsaProvider.sendUserOperation(userOp);
    },
    [ecdsaProvider]
  );

  const sellRewardTokens = useCallback(
    async (amount: number) => {
      const userOp = {
        target: battleFieldContract,
        data: encodeFunctionData({
          abi: battlefieldArtifacts.abi,
          functionName: 'sellRewardTokens',
          args: [BigInt(amount)],
        }),
      };
      if (!ecdsaProvider) {
        throw new Error('No ecdsaProvider');
      }
      return ecdsaProvider.sendUserOperation(userOp);
    },
    [ecdsaProvider]
  );

  return { launchAlien, sellRewardTokens };
};
