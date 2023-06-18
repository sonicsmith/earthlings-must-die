import { AlienOnPlanet } from '~/hooks/useAliensOnPlanet';
import SatelliteGroup from './SatelliteGroup';

export default function AlienSatellites({
  aliensOnPlanet,
}: {
  aliensOnPlanet: AlienOnPlanet[];
}) {
  return (
    <>
      {aliensOnPlanet.map(({ color }, i) => (
        <SatelliteGroup color={color} key={`alien${i}`} />
      ))}
    </>
  );
}
