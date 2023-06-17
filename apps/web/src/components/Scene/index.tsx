import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SkyBox from '../Skybox';
import Earth from '../Earth';
import { useWindowSize } from '~/hooks/useWindowSize';
import { Suspense, useMemo, useState } from 'react';
import { Vector3 } from 'three';
import AlienCards from '../AlienCards';
import AlienSatellites from '../AlienSatellites';
import GUI from '../GUI';
import Loading from '../Loading';
import { useAliensOnPlanet } from '~/hooks/useAliensOnPlanet';
import AlienSelectorDialog from '../AlienSelectorDialog';
import { useLaunchAliens } from '~/hooks/useLaunchAliens';

export default function Scene() {
  const { width } = useWindowSize();
  const [isAlienDetailView, setIsAlienDetailView] = useState(false);
  const [isAlienSelectionView, setIsAlienSelectionView] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const alienRaces = useAliensOnPlanet();
  const { launchAlien } = useLaunchAliens();

  const cameraPosition = useMemo(() => {
    const x = (width || 0) < 640 ? 6 : 5;
    return new Vector3(x, 0, 0);
  }, [width]);

  // TODO: Make this actually accurate to real life
  const sunPosition = useMemo(() => {
    return new Vector3(10, 0, 0);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        <GUI
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setIsAlienSelectionView={setIsAlienSelectionView}
        />
        <Earth
          onClick={() => {
            setIsAlienDetailView(!isAlienDetailView);
          }}
        />
        <AlienSatellites alienRaces={alienRaces} />
        <ambientLight intensity={0.005} />
        <pointLight position={sunPosition} intensity={1} />
        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.2}
        />
        <SkyBox
          onClick={() => {
            if (showMenu) {
              setShowMenu(false);
            }
            if (isAlienDetailView) {
              setIsAlienDetailView(false);
            }
          }}
        />
        <AlienCards isShowing={isAlienDetailView} alienRaces={alienRaces} />
        <AlienSelectorDialog
          isShowing={isAlienSelectionView}
          setIsAlienSelectionView={setIsAlienSelectionView}
          launchAlien={launchAlien}
        />
      </Canvas>
    </Suspense>
  );
}
