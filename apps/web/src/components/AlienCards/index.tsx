import { Html } from '@react-three/drei';
import AlienCard from './AlienCard';
import { AlienRace } from '~/hooks/useAlienRaces';

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

export default function AlienCards({
  isShowing,
  alienRaces,
}: {
  alienRaces: AlienRace[];
  isShowing: boolean;
}) {
  const xPos = GROUP_POSITIONS[alienRaces.length];

  return (
    <Html center>
      <div
        className={`relative transition duration-700 ease-in-out ${
          isShowing ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className={`absolute bottom-64 ${xPos}`}>
          <div className="flex flex-row">
            {alienRaces.map((alienDetails, index) => {
              const className = `absolute ${CARD_POSITION[index]}`;
              return (
                <div className={className} key={`alienCard${index}`}>
                  <AlienCard {...alienDetails} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Html>
  );
}
