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

export const usePlayersAliens = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [aliens, setAliens] = useState<AlienDetails[]>([]);

  const aliensAddress = useMemo(() => {
    return ADDRESSES[chain?.id || IDS.POLYGON]!.ALIENS;
  }, [chain]);

  const { data: balanceOf } = useContractRead({
    address: aliensAddress,
    abi: aliensArtifacts.abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  const contractReads = useMemo(() => {
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

  const { data: tokenIds } = useContractReads({
    contracts: contractReads,
  });

  useEffect(() => {
    const fetchAndSetAliens = async () => {
      const alienDetails = tokenIds!.map((tokenId) => {
        return getAlienDetailsForId(Number(tokenId));
      });
      setAliens(alienDetails);
    };
    if (tokenIds?.length) {
      fetchAndSetAliens();
    }
  }, [tokenIds]);

  return aliens;
};
