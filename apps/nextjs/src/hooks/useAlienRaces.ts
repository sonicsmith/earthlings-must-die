import { useContext, useEffect, useState } from 'react';
import alienJson from './../../../hardhat/artifacts/contracts/Aliens.sol/Aliens.json';
import battlefieldJson from './../../../hardhat/artifacts/contracts/BattleFieldEarth.sol/BattleFieldEarth.json';

import { addresses } from '~/data/contracts';
import { useContractRead, useNetwork } from 'wagmi';

export interface AlienRace {
  description: string;
  image: string;
  color: string;
}

const devDefault = [
  {
    image: '/images/aliens/001.jpg',
    description: `Skeletals: Fast and agile, Skeletals will kill in seconds`,
    color: '#FFAFFA',
    power: 3,
  },
  {
    image: '/images/aliens/002.jpg',
    description: `Cognizance: This species kills with mind control techniques`,
    color: '#EFBFFB',
    power: 4,
  },
  {
    image: '/images/aliens/003.jpg',
    description: `Octopods: This species kills with mind control techniques`,
    color: '#DFCFFC',
    power: 6,
  },
  {
    image: '/images/aliens/004.jpg',
    description: `Reptals: Pure muscle, Reptals may eat humans alive`,
    color: '#CFDFFD',
    power: 3,
  },
  {
    image: '/images/aliens/005.jpg',
    description: `Apetans: Simple and strong, Apetans hate humans`,
    color: '#BFEFFE',
    power: 4,
  },
];

export const useAlienRaces = () => {
  const [aliens, setAliens] = useState<AlienRace[]>([]);
  const { chain } = useNetwork();

  const { data, isError, isLoading } = useContractRead({
    address: addresses[chain?.id || 137]!.aliens,
    abi: battlefieldJson.abi,
    functionName: 'getAliens',
  });

  console.log({ data, isError, isLoading });

  useEffect(() => {
    const fetchAliens = async () => {
      setAliens(devDefault);
    };

    fetchAliens();
  }, []);

  return aliens;
};
