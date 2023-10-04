import { useEffect, useMemo, useState } from 'react';
import aliensArtifacts from 'chain/artifacts/contracts/Aliens.sol/Aliens.json';
import { ADDRESSES } from 'chain';
import { useContractReads, useContractRead } from 'wagmi';
import { getAlienDetailsForId } from '~/utils';
import { AlienDetails } from '~/utils/getAlienDetailsForId';
import { useAppStore } from '~/store/appStore';

export interface PlayersAlienDetails extends AlienDetails {
  strength: string;
}

const chain = process.env.NEXT_PUBLIC_CHAIN!;

export const usePlayersAliens = () => {
  const address = useAppStore().address;

  const [aliens, setAliens] = useState<PlayersAlienDetails[]>([]);
  const [zeroStrengthAliens, setZeroStrengthAliens] = useState<number[]>([]);

  const aliensAddress = ADDRESSES[chain]!.ALIENS;

  const {
    data: balanceOf,
    isLoading: isBalanceLoading,
    refetch,
  } = useContractRead({
    address: aliensAddress,
    abi: aliensArtifacts.abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
    watch: true,
  });

  const tokenOfOwnerByIndexData = useMemo(() => {
    const length = Number(balanceOf);
    if (length > 0) {
      return Array.from({ length }, (v, index) => {
        return {
          address: aliensAddress,
          abi: aliensArtifacts.abi,
          functionName: 'tokenOfOwnerByIndex',
          args: [address, index],
        };
      });
    }
    return [];
  }, [balanceOf]);

  const { data: tokenIdResults, isLoading: isTokenOwnerLoading } =
    useContractReads({
      contracts: tokenOfOwnerByIndexData as any[],
      enabled: !!tokenOfOwnerByIndexData.length,
    });

  const allStrengthRequests = useMemo(() => {
    const numberOfAliens = (tokenIdResults as any[])?.length;
    if (tokenIdResults && numberOfAliens > 0) {
      return Array.from({ length: numberOfAliens }, (v, index) => {
        const tokenId = String(tokenIdResults[index]?.result);
        return {
          address: aliensAddress,
          abi: aliensArtifacts.abi,
          functionName: 'getAlienStrength',
          args: [tokenId],
        };
      });
    }
    return [];
  }, [tokenIdResults]);

  const { data: strengthData, isLoading: isStrengthDataLoading } =
    useContractReads({
      contracts: allStrengthRequests as any[],
      enabled: !!allStrengthRequests.length,
    });

  useEffect(() => {
    const fetchAndSetAliens = async () => {
      const zeroAliens: number[] = [];
      const alienDetails = tokenIdResults!.map((tokenId, index) => {
        const strength = String(strengthData?.[index]?.result || 0);
        if (!strength) {
          zeroAliens.push(Number(tokenId?.result));
        }
        return {
          ...getAlienDetailsForId(Number(tokenId?.result)),
          strength,
        };
      });
      setAliens(alienDetails);
      setZeroStrengthAliens(zeroAliens);
    };

    if (strengthData?.length && tokenIdResults?.length) {
      fetchAndSetAliens();
    }
  }, [tokenIdResults, strengthData]);

  return {
    refetch,
    aliens,
    zeroStrengthAliens,
    isLoading: isBalanceLoading || isTokenOwnerLoading || isStrengthDataLoading,
  };
};
