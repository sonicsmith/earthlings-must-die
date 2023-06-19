import { useEffect, useState } from 'react';
import { aliensArtifacts } from 'chain';
import { IDS, ADDRESSES } from 'chain';
import { readContracts, useAccount, useContractRead, useNetwork } from 'wagmi';

export interface AlienOnPlanet {
  name: string;
  image: string;
  color: string;
  strength: number;
  owner: string;
  rewardsGiven: number;
}

export const usePlayersAliens = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [aliens, setAliens] = useState<AlienOnPlanet[]>([]);

  const { data: totalSupply } = useContractRead({
    address: ADDRESSES[chain?.id || IDS.POLYGON]!.ALIENS,
    abi: aliensArtifacts.abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  useEffect(() => {
    const fetchAndSetAliens = async () => {
      //
    };
    fetchAndSetAliens();
  }, [totalSupply]);

  return aliens;
};
