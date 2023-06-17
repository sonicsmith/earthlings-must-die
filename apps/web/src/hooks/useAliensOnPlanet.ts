import { useEffect, useMemo, useState } from 'react';
import { battlefieldArtifacts } from 'chain';
import { MUMBAI, ADDRESSES } from '~/data/contracts';
import { useContractRead, useNetwork } from 'wagmi';
import { getAlienDataFromIds } from '~/utils';

export interface AlienRace {
  description: string;
  image: string;
  color: string;
  power: string;
  owner?: string;
}

type BattlefieldAliens = {
  owner: string;
  tokenId: number;
};

export const useAliensOnPlanet = () => {
  const { chain } = useNetwork();
  const [aliens, setAliens] = useState<AlienRace[]>([]);

  const { data } = useContractRead({
    address: ADDRESSES[chain?.id || MUMBAI]!.BATTLEFIELD,
    abi: battlefieldArtifacts.abi,
    functionName: 'getAliens',
  });

  const tokenIds = useMemo(() => {
    const battleAliens = data as BattlefieldAliens[];
    if (battleAliens?.length) {
      return battleAliens.map((b) => b.tokenId);
    }
    return [];
  }, [data]);

  useEffect(() => {
    if (tokenIds.length) {
      getAlienDataFromIds({ tokenIds, chainId: chain?.id || MUMBAI }).then(
        (alienData) => {
          const battleAliens = data as BattlefieldAliens[];
          setAliens(
            alienData.map((alien, index) => {
              const owner = battleAliens?.[index]?.owner;
              return { ...alien, owner };
            })
          );
        }
      );
    }
  }, [tokenIds]);

  return aliens;
};
