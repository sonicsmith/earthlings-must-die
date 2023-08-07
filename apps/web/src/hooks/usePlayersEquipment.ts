import equipmentArtifacts from 'chain/artifacts/contracts/Equipment.sol/Equipment.json';
import { ADDRESSES } from 'chain';
import { useContractRead } from 'wagmi';
import { AppState, useAppStore } from '~/store/appStore';
import { usePersistentStore } from './usePersistentStore';

type BalanceResult = { data: { result: bigint }; isLoading: boolean };

const chain = process.env.NEXT_PUBLIC_CHAIN!;

export const usePlayersEquipment = () => {
  const { address } = usePersistentStore<AppState, any>(
    useAppStore,
    (state) => state.address
  );

  const equipmentAddress = ADDRESSES[chain]!.EQUIPMENT;

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
    fuelBalance: Number(fuelBalance),
    rewardBalance: Number(rewardBalance),
    isLoading: isFuelBalanceLoading || isRewardBalanceLoading,
  };
};
