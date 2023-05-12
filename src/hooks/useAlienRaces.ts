import { useEffect, useState } from 'react';

export interface AlienRace {
  description: string;
  image: string;
  color: string;
}

const devDefault = [
  {
    image: '/images/aliens/001.jpg',
    description: `Skeletals: Fast and agile, Skeletals will kill in seconds`,
    color: '#c29519',
    power: 3,
  },
  {
    image: '/images/aliens/002.jpg',
    description: `Cognizance: This species kills with mind control techniques`,
    color: '#b03535',
    power: 4,
  },
  {
    image: '/images/aliens/003.jpg',
    description: `Octopods: This species kills with mind control techniques`,
    color: '#4287f5',
    power: 6,
  },
  {
    image: '/images/aliens/004.jpg',
    description: `Reptals: Pure muscle, Reptals may eat humans alive`,
    color: '#c29519',
    power: 3,
  },
  {
    image: '/images/aliens/005.jpg',
    description: `Apetans: Simple and strong, Apetans hate humans`,
    color: '#b03535',
    power: 4,
  },
  // {
  //   image: '/images/aliens/006.jpg',
  //   description: `Hexapodron: Agile and Ruthless Hunters`,
  //   color: '#4287f5',
  //   power: 6,
  // },
];

export const useAlienRaces = () => {
  const [aliens, setAliens] = useState<AlienRace[]>([]);

  useEffect(() => {
    const fetchAliens = async () => {
      setAliens(devDefault);
    };

    fetchAliens();
  }, []);

  return aliens;
};
