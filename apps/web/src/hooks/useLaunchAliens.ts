import { ADDRESSES, IDS } from 'chain';
import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import battlefieldArtifacts from 'chain/artifacts/contracts/BattlefieldEarth.sol/BattlefieldEarth.json';
import { prepareWriteContract, writeContract } from 'wagmi/actions';

export const useLaunchAliens = () => {
  const { chain } = useNetwork();

  const battlefieldAddress = useMemo(() => {
    return ADDRESSES[chain?.id || IDS.POLYGON]!.BATTLEFIELD;
  }, [chain]);

  const launchAlien = async (tokenId: number) => {
    // console.log('launchAlien', tokenId);
    // const { request } = await prepareWriteContract({
    //   address: battlefieldAddress,
    //   abi: battlefieldArtifacts.abi,
    //   functionName: 'attack',
    //   args: [tokenId],
    // });
    // const { hash } = await writeContract(request);
    // console.log('launchAlien hash', hash);
    // return hash;
  };

  return { launchAlien };
};
