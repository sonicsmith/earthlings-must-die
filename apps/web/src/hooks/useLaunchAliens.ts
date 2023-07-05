import { ADDRESSES, IDS } from 'chain';
import { useMemo } from 'react';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';
import aliensArtifacts from 'chain/artifacts/contracts/Aliens.sol/Aliens.json';
import battlefieldArtifacts from 'chain/artifacts/contracts/BattlefieldEarth.sol/BattlefieldEarth.json';
import { writeContract } from '@wagmi/core';

export const useLaunchAliens = () => {
  const { chain } = useNetwork();

  const battlefieldAddress = useMemo(() => {
    return ADDRESSES[chain?.id || IDS.POLYGON]!.BATTLEFIELD;
  }, [chain]);

  const launchAlien = async (tokenId: number) => {
    console.log('launchAlien', tokenId);
    const { hash } = await writeContract({
      address: battlefieldAddress,
      abi: battlefieldArtifacts.abi,
      functionName: 'attack',
      args: [tokenId],
    });
    console.log('launchAlien hash', hash);
    return hash;
  };

  return { launchAlien };
};
