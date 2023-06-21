import { alienNames, alienColors } from '~/data/alien';
import { getThreeDigitNumber } from '~/utils';

export interface AlienDetails {
  name: string;
  image: string;
  color: string;
}

export const getAlienDetailsForId = (tokenId: number): AlienDetails => {
  const stringNumber = getThreeDigitNumber(tokenId);
  return {
    image: `/images/aliens/${stringNumber}.jpg`,
    name: alienNames[tokenId] || '',
    color: alienColors[tokenId] || '#FFF',
  };
};
