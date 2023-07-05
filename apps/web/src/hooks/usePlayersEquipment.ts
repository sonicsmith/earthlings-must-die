import { useMemo } from 'react';
import equipmentArtifacts from 'chain/artifacts/contracts/Equipment.sol/Equipment.json';
import { IDS, ADDRESSES } from 'chain';
import { useAccount, useContractRead, useNetwork } from 'wagmi';

type BalanceResult = { data: { result: bigint }; isLoading: boolean };

export const usePlayersEquipment = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const equipmentAddress = useMemo(() => {
    return ADDRESSES[chain?.id || IDS.POLYGON]!.EQUIPMENT;
  }, [chain]);

  const { data: fuelBalance, isLoading: isFuelBalanceLoading } =
    useContractRead({
      address: equipmentAddress,
      abi: equipmentArtifacts.abi,
      functionName: 'balanceOf',
      args: [address, 0],
      enabled: !!address,
    }) as BalanceResult;

  const { data: rewardBalance, isLoading: isRewardBalanceLoading } =
    useContractRead({
      address: equipmentAddress,
      abi: equipmentArtifacts.abi,
      functionName: 'balanceOf',
      args: [address, 1],
      enabled: !!address,
    }) as BalanceResult;

  return {
    fuelBalance: Number(fuelBalance?.result),
    rewardBalance: Number(rewardBalance?.result),
    isLoading: isFuelBalanceLoading || isRewardBalanceLoading,
  };
};
