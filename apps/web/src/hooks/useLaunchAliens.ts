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

export const useLaunchAliens = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const aliensAddress = useMemo(() => {
    return ADDRESSES[chain?.id || IDS.POLYGON]!.ALIENS;
  }, [chain]);

  const battlefieldAddress = useMemo(() => {
    return ADDRESSES[chain?.id || IDS.POLYGON]!.BATTLEFIELD;
  }, [chain]);

  // const { config } = usePrepareContractWrite({
  //   address: aliensAddress,
  //   abi: aliensArtifacts.abi,
  //   functionName: 'setApprovalForAll',
  //   args: [battlefieldAddress, true],
  // });

  // const { data, isLoading } = useContractWrite(config);

  const launchAlien = async (tokenId: number) => {
    console.log('launchAlien', tokenId);
  };

  return { launchAlien };
};
