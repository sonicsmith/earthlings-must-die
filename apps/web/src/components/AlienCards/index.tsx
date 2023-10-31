import { Html } from '@react-three/drei';
import AlienCard from './AlienCard';
import type { AlienOnPlanet } from '~/hooks/useAliensOnPlanet';
import { useMemo } from 'react';
import { useAppStore } from '~/store/appStore';
import { Menu } from '../TopBar/Menu';

const GROUP_POSITIONS = [
  '',
  '-left-20',
  '-left-24',
  '-left-28',
  '-left-32',
  '-left-36',
  '-left-40',
];
const CARD_POSITION = [
  'left-0 top-0',
  'left-8 -top-2',
  'left-16 -top-4',
  'left-24 -top-2',
  'left-32 top-0',
  'left-40',
];

const AlienStatus = ({ numberOwned }: { numberOwned: number }) => {
  return (
    <div className="absolute -left-32 -top-72 w-64 text-xl text-white">
      <div className="text-center">Aliens on planet: 4</div>

      <div className="text-center text-gray-300">
        {numberOwned > 0 ? (
          <>(Owned by you: {numberOwned})</>
        ) : (
          <>Buy aliens to gather resources</>
        )}
      </div>
    </div>
  );
};

export default function AlienCards({
  isShowing,
  aliensOnPlanet,
}: {
  aliensOnPlanet: AlienOnPlanet[];
  isShowing: boolean;
}) {
  const address = useAppStore().address;

  const numberOwned = useMemo(() => {
    return aliensOnPlanet.reduce((acc, alien) => {
      if (alien.owner === address) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [aliensOnPlanet, address]);

  const xPos = GROUP_POSITIONS[aliensOnPlanet.length] || '';

  return (
    <Html center>
      <div
        className={`relative transition duration-700 ease-in-out ${
          isShowing ? 'scale-100' : 'scale-0'
        }`}
      >
        <AlienStatus numberOwned={numberOwned} />
        <div className={`absolute -top-52 ${xPos}`}>
          <div className="flex flex-row">
            {aliensOnPlanet.map((alienDetails, index) => {
              const cardPosClass = CARD_POSITION[index] || '';
              const className = `absolute ${cardPosClass}`;
              return (
                <div
                  className={className}
                  key={`alienCard${index}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    // setSelected(index);
                  }}
                >
                  <AlienCard alienDetails={alienDetails} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={`absolute -left-14 top-6 w-96`}>
          <Menu />
        </div>
      </div>
    </Html>
  );
}
