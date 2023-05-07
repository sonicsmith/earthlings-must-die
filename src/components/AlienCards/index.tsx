import { Html } from '@react-three/drei';
import AlienCard from './AlienCard';
import { useAlienRaces } from '~/hooks/useAlienRaces';

export default function AlienCards({ isShowing }: any) {
  const alienRaces = useAlienRaces();
  const left = 200;
  console.log(alienRaces);
  return (
    <Html center>
      <div
        className={`relative transition duration-700 ease-in-out ${
          isShowing ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className={`absolute bottom-0 left-[-${left}px]`}>
          <div className="relative flex flex-row">
            {alienRaces.map((alienDetails, index) => (
              // <div className={`absolute left-[100px]`}>
              <AlienCard {...alienDetails} />
              // </div>
            ))}
          </div>
        </div>
      </div>
    </Html>
  );
}
