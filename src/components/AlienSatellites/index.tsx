import { useAlienRaces } from '~/hooks/useAlienRaces';
import SatelliteGroup from './SateliteGroup';

export default function AlienSatellites() {
  const alienRaces = useAlienRaces();
  console.log('alienRaces', alienRaces);
  return (
    <>
      {alienRaces.map(({ color }, i) => (
        <SatelliteGroup color={color} key={`alien${i}`} />
      ))}
    </>
  );
}
