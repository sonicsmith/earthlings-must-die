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
    color: '#eea',
    power: 5,
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
