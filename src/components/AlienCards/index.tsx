import { Html } from '@react-three/drei';
import AlienCard from './AlienCard';
import { useAlienRaces } from '~/hooks/useAlienRaces';

export default function AlienCards({ isShowing }: any) {
  const alienRaces = useAlienRaces();
  return (
    <Html center>
      <div
        className={`relative transition duration-700 ease-in-out ${
          isShowing ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className="absolute bottom-0 w-full">
          {alienRaces.map((alienDetails) => (
            <AlienCard {...alienDetails} />
          ))}
        </div>
      </div>
    </Html>
  );
}
