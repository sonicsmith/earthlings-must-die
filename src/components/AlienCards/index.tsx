import { Html } from '@react-three/drei';
import AlienCard from './AlienCard';
import { useAlienRaces } from '~/hooks/useAlienRaces';

const GROUP_POSITIONS = [
  '',
  'left-[-85px]',
  'left-[-100px]',
  'left-[-115px]',
  'left-[-130px]',
  'left-[-145px]',
  'left-[-160px]',
];
const CARD_POSITION = [
  'left-0',
  'left-8 -top-2',
  'left-16 -top-4',
  'left-24 -top-6',
  'left-32 -top-4',
  'left-40',
];

export default function AlienCards({ isShowing }: any) {
  const alienRaces = useAlienRaces();
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
