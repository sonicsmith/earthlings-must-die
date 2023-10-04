import { useEffect, useState } from 'react';
import battlefieldArtifacts from 'chain/artifacts/contracts/BattlefieldEarth.sol/BattlefieldEarth.json';
import { ADDRESSES } from 'chain';
import { useContractRead } from 'wagmi';
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

const chain = process.env.NEXT_PUBLIC_CHAIN!;

export const useAliensOnPlanet = () => {
  const [aliens, setAliens] = useState<AlienOnPlanet[]>([]);

  const battlefieldAddress = ADDRESSES[chain]!.BATTLEFIELD;

  const { data, refetch } = useContractRead({
    address: battlefieldAddress,
    abi: battlefieldArtifacts.abi,
    functionName: 'getAliens',
    cacheOnBlock: true,
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
            strength: Number(onPlanet.strength),
            owner: onPlanet.owner,
            rewardsGiven: Number(onPlanet.rewardsGiven),
          };
        }
      );
      setAliens(combinedAlienData);
    }
  }, [data]);

  return { aliens, refetch };
};
