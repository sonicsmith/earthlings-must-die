import { aliensArtifacts } from 'chain';
import { readContracts, useNetwork } from 'wagmi';
import { ADDRESSES, MUMBAI } from '~/data/contracts';
import { alienSpecies } from '~/data/alien';
import { getThreeDigitNumber } from '~/utils';
import { useEffect, useState } from 'react';

export interface AlienRace {
  name: string;
  description: string;
  image: string;
  color: string;
  power: string;
}

export const getAlienDataFromIds = async ({
  tokenIds,
  chainId,
}: {
  tokenIds: number[];
  chainId: number;
}) => {
  const contracts = tokenIds.map((tokenId) => ({
    address: ADDRESSES[chainId || MUMBAI]!.ALIENS,
    abi: aliensArtifacts.abi,
    functionName: 'getAlienStrength',
    args: [tokenId],
  }));
  return readContracts({ contracts }).then((strengthData: any) => {
    return tokenIds.map((tokenId, index) => {
      const stringNumber = getThreeDigitNumber(tokenId);
      return {
        image: `/images/aliens/${stringNumber}.jpg`,
        name: alienSpecies[tokenId]?.name || '',
        description: alienSpecies[tokenId]?.description || '',
        color: alienSpecies[tokenId]?.color || '#FFF',
        power: strengthData?.[index]?.toString() || '0',
      };
    });
  });
};
