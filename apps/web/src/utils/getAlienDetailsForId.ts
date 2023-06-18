import { aliensArtifacts } from 'chain';
import { readContracts, useNetwork } from 'wagmi';
import { alienNames, alienColors } from '~/data/alien';
import { getThreeDigitNumber } from '~/utils';

export const getAlienDetailsForId = (tokenId: number) => {
  const stringNumber = getThreeDigitNumber(tokenId);
  return {
    image: `/images/aliens/${stringNumber}.jpg`,
    name: alienNames[tokenId] || '',
    color: alienColors[tokenId] || '#FFF',
  };
};
