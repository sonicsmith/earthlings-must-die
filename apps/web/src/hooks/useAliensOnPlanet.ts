import { useEffect, useState } from 'react';
import { battlefieldArtifacts } from 'chain';
import { MUMBAI, ADDRESSES } from '~/data/contracts';
import { useContractRead, useNetwork } from 'wagmi';
import { getAlienDetailsForId } from '~/utils';

export interface AlienOnPlanet {
  name: string;
  image: string;
  color: string;
  strength: number;
  owner: string;
  rewardsGiven: number;
}

type BattlefieldAliens = {
  owner: string;
  tokenId: number;
  strength: number;
  rewardsGiven: number;
};

export const useAliensOnPlanet = () => {
  const { chain } = useNetwork();
  const [aliens, setAliens] = useState<AlienOnPlanet[]>([]);

  const { data } = useContractRead({
    address: ADDRESSES[chain?.id || MUMBAI]!.BATTLEFIELD,
    abi: battlefieldArtifacts.abi,
    functionName: 'getAliens',
  });

  useEffect(() => {
    const battleAliens = data as BattlefieldAliens[];
    if (battleAliens?.length) {
      const combinedAlienData: AlienOnPlanet[] = battleAliens.map(
        (onPlanet) => {
          const detail = getAlienDetailsForId(onPlanet.tokenId);
          return {
            name: detail.name,
            image: detail.image,
            color: detail.color,
            strength: onPlanet.strength,
            owner: onPlanet.owner,
            rewardsGiven: onPlanet.rewardsGiven,
          };
        }
      );
      setAliens(combinedAlienData);
    }
  }, [data]);

  return aliens;
};
