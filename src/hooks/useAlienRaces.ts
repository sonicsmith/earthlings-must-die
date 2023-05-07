import { useEffect, useState } from 'react';

export interface AlienRace {
  description: string;
  image: string;
  color: string;
}

const devDefault = [
  {
    image: '/images/aliens/001.jpg',
    description: `This is a description about the aliens and what they like to do and how
  they like.`,
    color: '#c29519',
    power: 3,
  },
  {
    image: '/images/aliens/002.jpg',
    description: `This is a description about the aliens and what they like to do and how
  they like.`,
    color: '#b03535',
    power: 4,
  },
  {
    image: '/images/aliens/003.jpg',
    description: `This is a description about the aliens and what they like to do and how
  they like.`,
    color: '#4287f5',
    power: 6,
  },
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
