import { useEffect, useMemo, useState } from 'react';
import aliensArtifacts from 'chain/artifacts/contracts/Aliens.sol/Aliens.json';
import { IDS, ADDRESSES } from 'chain';
import {
  useContractReads,
  useAccount,
  useContractRead,
  useNetwork,
} from 'wagmi';
import { getAlienDetailsForId } from '~/utils';
import { AlienDetails } from '~/utils/getAlienDetailsForId';
import { useAppStore } from '~/store/appStore';

export interface PlayersAlienDetails extends AlienDetails {
  strength: string;
}

export const usePlayersAliens = () => {
  const { chain } = useNetwork();
  const address = useAppStore().address;
  console.log('address', address);
  const [aliens, setAliens] = useState<PlayersAlienDetails[]>([]);

  const aliensAddress = useMemo(() => {
    return ADDRESSES[chain?.id || IDS.POLYGON]!.ALIENS;
  }, [chain]);

  const { data: balanceOf, isLoading: isBalanceLoading } = useContractRead({
    address: aliensAddress,
    abi: aliensArtifacts.abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
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
      const alienDetails = tokenIdResults!.map((tokenId, index) => {
        return {
          ...getAlienDetailsForId(Number(tokenId?.result)),
          strength: String(strengthData?.[index]?.result || 0),
        };
      });
      setAliens(alienDetails);
    };

    if (strengthData?.length && tokenIdResults?.length) {
      fetchAndSetAliens();
    }
  }, [tokenIdResults, strengthData]);

  console.log('Players aliens:', aliens);

  return {
    aliens,
    isLoading: isBalanceLoading || isTokenOwnerLoading || isStrengthDataLoading,
  };
};
