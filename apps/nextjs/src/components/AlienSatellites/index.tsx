import { useAlienRaces } from '~/hooks/useAlienRaces';
import SatelliteGroup from './SatelliteGroup';

export default function AlienSatellites() {
  const alienRaces = useAlienRaces();
  return (
    <>
      {alienRaces.map(({ color }, i) => (
        <SatelliteGroup color={color} key={`alien${i}`} />
      ))}
    </>
  );
}
