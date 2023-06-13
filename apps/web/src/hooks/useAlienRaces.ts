import { useEffect, useState } from 'react';
import { battlefieldArtifacts, aliensArtifacts } from 'chain';
import { FUNCTIONS, MUMBAI, ADDRESSES } from '~/data/contracts';
import { readContracts, useContractRead, useNetwork } from 'wagmi';
import { getThreeDigitNumber } from '~/utils/getThreeDigitNumber';
import { alienSpecies } from '~/data/alien';

export interface AlienRace {
  description: string;
  image: string;
  color: string;
  power: string;
}

type BattlefieldAliens = {
  owner: string;
  tokenId: number;
};

export const useAlienRaces = () => {
  const [aliens, setAliens] = useState<AlienRace[]>([]);
  const { chain } = useNetwork();

  const { data: alienData } = useContractRead({
    address: ADDRESSES[chain?.id || MUMBAI]!.BATTLEFIELD,
    abi: battlefieldArtifacts.abi,
    functionName: FUNCTIONS.ALIENS.getAliens,
  });

  useEffect(() => {
    const fetchAliens = async () => {
      const contracts = (alienData as BattlefieldAliens[]).map(
        ({ tokenId }) => ({
          address: ADDRESSES[chain?.id || MUMBAI]!.ALIENS,
          abi: aliensArtifacts.abi,
          functionName: FUNCTIONS.ALIENS.getAlienStrength,
          args: [tokenId],
        })
      );
      const strengthData = (await readContracts({ contracts })) as BigInt[];
      setAliens(
        (alienData as BattlefieldAliens[]).map(({ tokenId }, index) => {
          const stringNumber = getThreeDigitNumber(tokenId);
          return {
            image: `/images/aliens/${stringNumber}.jpg`,
            description: alienSpecies[tokenId]?.description || '',
            color: alienSpecies[tokenId]?.color || '#FFF',
            power: strengthData?.[index]?.toString() || '0',
          };
        })
      );
    };

    if ((alienData as BattlefieldAliens[])?.length) {
      fetchAliens();
    }
  }, [alienData]);

  return aliens;
};
