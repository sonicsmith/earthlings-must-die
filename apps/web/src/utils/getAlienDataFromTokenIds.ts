import { aliensArtifacts } from 'chain';
import { readContracts, useNetwork } from 'wagmi';
import { ADDRESSES, MUMBAI } from '~/data/contracts';
import { getThreeDigitNumber } from './getThreeDigitNumber';
import { alienSpecies } from '~/data/alien';

export const getAlienDataFromTokenIds = async (tokenIds: number[]) => {
  const { chain } = useNetwork();
  const contracts = tokenIds.map((tokenId) => ({
    address: ADDRESSES[chain?.id || MUMBAI]!.ALIENS,
    abi: aliensArtifacts.abi,
    functionName: 'getAlienStrength',
    args: [tokenId],
  }));
  const strengthData = (await readContracts({ contracts })) as BigInt[];

  return tokenIds.map((tokenId, index) => {
    const stringNumber = getThreeDigitNumber(tokenId);
    return {
      image: `/images/aliens/${stringNumber}.jpg`,
      description: alienSpecies[tokenId]?.description || '',
      color: alienSpecies[tokenId]?.color || '#FFF',
      power: strengthData?.[index]?.toString() || '0',
    };
  });
};
