import { AlienRace } from '~/hooks/useAliensOnPlanet';
import SatelliteGroup from './SatelliteGroup';

export default function AlienSatellites({
  alienRaces,
}: {
  alienRaces: AlienRace[];
}) {
  return (
    <>
      {alienRaces.map(({ color }, i) => (
        <SatelliteGroup color={color} key={`alien${i}`} />
      ))}
    </>
  );
}
