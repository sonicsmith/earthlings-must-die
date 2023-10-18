import equipmentArtifacts from 'chain/artifacts/contracts/Equipment.sol/Equipment.json';
import { ADDRESSES } from 'chain';
import { useContractRead } from 'wagmi';
import { useAppStore } from '~/store/appStore';

const chain = process.env.NEXT_PUBLIC_CHAIN!;

export const usePlayersEquipment = () => {
  const address = useAppStore().address;

  const equipmentAddress = ADDRESSES[chain]!.EQUIPMENT;

  const {
    data: fuelBalance,
    isLoading: isFuelBalanceLoading,
    refetch,
  } = useContractRead({
    address: equipmentAddress,
    abi: equipmentArtifacts.abi,
    functionName: 'balanceOf',
    args: [address, 1],
    enabled: !!address,
    watch: true,
  });

  const { data: rewardBalance, isLoading: isRewardBalanceLoading } =
    useContractRead({
      address: equipmentAddress,
      abi: equipmentArtifacts.abi,
      functionName: 'balanceOf',
      args: [address, 100],
      enabled: !!address,
      watch: true,
    });

  return {
    refetch,
    fuelBalance: Number(fuelBalance),
    rewardBalance: Number(rewardBalance),
    isLoading: isFuelBalanceLoading || isRewardBalanceLoading,
  };
};
