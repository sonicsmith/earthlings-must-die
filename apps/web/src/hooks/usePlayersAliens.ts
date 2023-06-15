import { useEffect, useState } from 'react';
import { aliensArtifacts } from 'chain';
import { MUMBAI, ADDRESSES } from '~/data/contracts';
import { readContracts, useContractRead, useNetwork } from 'wagmi';

export interface AlienRace {
  description: string;
  image: string;
  color: string;
  power: string;
}

export const usePlayersAliens = () => {
  const tokenIds = [1, 2, 3];

  // const aliens = useAliensFromIds(tokenIds);

  return []; //aliens;
};
