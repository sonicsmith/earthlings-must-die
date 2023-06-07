import { useContext, useEffect, useState } from 'react';
import alienJson from './../../../hardhat/artifacts/contracts/Aliens.sol/Aliens.json';
import battlefieldJson from './../../../hardhat/artifacts/contracts/BattleFieldEarth.sol/BattleFieldEarth.json';

import { MUMBAI, addresses } from '~/data/contracts';
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

  const { data } = useContractRead({
    address: addresses[chain?.id || MUMBAI]!.battlefield,
    abi: battlefieldJson.abi,
    functionName: 'getAliens',
  });

  useEffect(() => {
    const fetchAliens = async () => {
      const alienData = data as BattlefieldAliens[];
      const contracts = alienData.map(({ tokenId }) => ({
        address: addresses[chain?.id || MUMBAI]!.aliens,
        abi: alienJson.abi,
        functionName: 'getAlienStrength',
        args: [tokenId],
      }));
      const strengthData = (await readContracts({ contracts })) as BigInt[];
      setAliens(
        alienData.map(({ tokenId }, index) => {
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

    if ((data as any)?.length) {
      fetchAliens();
    }
  }, [data]);

  return aliens;
};
