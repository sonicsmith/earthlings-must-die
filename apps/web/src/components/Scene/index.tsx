import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SkyBox from '../Skybox';
import Earth from '../Earth';
import { useWindowSize } from '~/hooks/useWindowSize';
import { Suspense, use, useEffect, useMemo, useRef, useState } from 'react';
import THREE, { Color, Vector3 } from 'three';
import AlienCards from '../AlienCards';
import AlienSatellites from '../AlienSatellites';
import GUI from '../GUI';
import Loading from '../Loading';
import { useAliensOnPlanet } from '~/hooks/useAliensOnPlanet';
import AlienSelectorDialog from '../AlienSelectorDialog';
import { useLaunchAliens } from '~/hooks/useLaunchAliens';
import Spaceship from '../Spaceship';

export default function Scene() {
  const { width } = useWindowSize();
  const [isAlienDetailView, setIsAlienDetailView] = useState(false);
  const [isAlienSelectionView, setIsAlienSelectionView] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const aliensOnPlanet = useAliensOnPlanet();
  const { launchAlien } = useLaunchAliens();

  const [isLaunching, setIsLaunching] = useState(false);

  const initialCameraPosition = useMemo(() => {
    const x = (width || 0) < 640 ? 6 : 5;
    return new Vector3(x, 0, 0);
  }, [width, isLaunching]);

  const sunPosition = useMemo(() => {
    return new Vector3(10, 1, 0);
  }, []);

  const beginLaunch = (tokenId: number) => {
    setIsAlienSelectionView(false);
    setIsLaunching(true);
    launchAlien(tokenId);
  };

  const [currentCameraPosition, setCurrentCameraPosition] = useState(
    initialCameraPosition
  );

  return (
    <Suspense fallback={<Loading />}>
      <Canvas camera={{ position: initialCameraPosition, fov: 50 }}>
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
        <AlienSatellites aliensOnPlanet={aliensOnPlanet} />
        <ambientLight intensity={0.005} />
        {/* SUN */}
        <pointLight position={sunPosition} intensity={1} />
        <OrbitControls
          enableZoom={false}
          enableRotate={
            !isLaunching && !isAlienDetailView && !isAlienSelectionView
          }
          onEnd={(o) => {
            const target = o?.target;
            target.saveState();
            setCurrentCameraPosition(target.position0);
          }}
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
        {!isLaunching && (
          <>
            <AlienCards
              isShowing={isAlienDetailView}
              aliensOnPlanet={aliensOnPlanet}
            />
            <AlienSelectorDialog
              isShowing={isAlienSelectionView}
              setIsAlienSelectionView={setIsAlienSelectionView}
              launchAlien={beginLaunch}
            />
          </>
        )}
        {isLaunching && (
          <Spaceship
            cameraPosition={currentCameraPosition}
            setIsLaunching={setIsLaunching}
          />
        )}
      </Canvas>
    </Suspense>
  );
}
