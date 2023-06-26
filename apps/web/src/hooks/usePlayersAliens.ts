import { useEffect, useMemo, useState } from 'react';
import { aliensArtifacts } from 'chain';
import { IDS, ADDRESSES } from 'chain';
import {
  useContractReads,
  useAccount,
  useContractRead,
  useNetwork,
} from 'wagmi';
import { getAlienDetailsForId } from '~/utils';
import { AlienDetails } from '~/utils/getAlienDetailsForId';

export interface PlayersAlienDetails extends AlienDetails {
  strength: string;
}

export const usePlayersAliens = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
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

  const { data: tokenIds, isLoading: isTokenOwnerLoading } = useContractReads({
    contracts: tokenOfOwnerByIndexData,
  });

  const getStrengthData = useMemo(() => {
    const numberOfAliens = (tokenIds as bigint[])?.length;
    if (tokenIds && numberOfAliens > 0) {
      return Array.from({ length: numberOfAliens }, (v, index) => {
        return {
          address: aliensAddress,
          abi: aliensArtifacts.abi,
          functionName: 'getAlienStrength',
          args: [String(tokenIds[index])],
        };
      });
    }
    return [];
  }, [tokenIds]);

  const { data: strengthData, isLoading: isStrengthDataLoading } =
    useContractReads({
      contracts: getStrengthData,
    });

  useEffect(() => {
    const fetchAndSetAliens = async () => {
      const alienDetails = tokenIds!.map((tokenId, index) => {
        return {
          ...getAlienDetailsForId(Number(tokenId)),
          strength: String(strengthData?.[index] || 0),
        };
      });
      setAliens(alienDetails);
    };
    if (strengthData?.length && tokenIds?.length) {
      fetchAndSetAliens();
    }
  }, [tokenIds, strengthData]);

  return {
    aliens,
    isLoading: isBalanceLoading || isTokenOwnerLoading || isStrengthDataLoading,
  };
};
