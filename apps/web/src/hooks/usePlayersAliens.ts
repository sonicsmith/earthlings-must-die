import { useEffect, useState } from 'react';
import { aliensArtifacts } from 'chain';
import { MUMBAI, ADDRESSES } from '~/data/contracts';
import { readContracts, useContractRead, useNetwork } from 'wagmi';

export const usePlayersAliens = () => {
  // ToDO, get balance from contract
  const tokenIds = [1, 2, 3];

  // const aliens = useAliensFromIds(tokenIds);

  return []; //aliens;
};
