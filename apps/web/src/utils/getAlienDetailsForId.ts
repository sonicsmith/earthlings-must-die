import { aliensArtifacts } from 'chain';
import { readContracts, useNetwork } from 'wagmi';
import { alienSpecies } from '~/data/alien';
import { getThreeDigitNumber } from '~/utils';

export const getAlienDetailsForId = (tokenId: number) => {
  const stringNumber = getThreeDigitNumber(tokenId);
  return {
    image: `/images/aliens/${stringNumber}.jpg`,
    name: alienSpecies[tokenId]?.name || '',
    color: alienSpecies[tokenId]?.color || '#FFF',
  };
};
