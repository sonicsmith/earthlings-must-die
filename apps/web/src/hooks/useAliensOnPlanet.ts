import { useEffect, useMemo, useState } from 'react';
import battlefieldArtifacts from 'chain/artifacts/contracts/BattlefieldEarth.sol/BattlefieldEarth.json';
import { ADDRESSES, IDS } from 'chain';
import { useContractRead, useNetwork } from 'wagmi';
import { getAlienDetailsForId } from '~/utils';
import { Console } from 'console';

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

  const battlefieldAddress = useMemo(() => {
    return ADDRESSES[chain?.id || IDS.POLYGON]!.BATTLEFIELD;
  }, [chain]);

  const { data } = useContractRead({
    address: battlefieldAddress,
    abi: battlefieldArtifacts.abi,
    functionName: 'getAliens',
  });

  useEffect(() => {
    console.log(data);
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
      console.log(combinedAlienData);
      setAliens(combinedAlienData);
    }
  }, [data]);

  return aliens;
};
