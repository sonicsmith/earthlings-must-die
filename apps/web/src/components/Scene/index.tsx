import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
import Spaceship from '../Spaceship';
import { useAppStore } from '~/store/appStore';

const SUN_POSITION = new Vector3(10, 1, 0);

export default function Scene() {
  const { width } = useWindowSize();
  const [isAlienDetailView, setIsAlienDetailView] = useState(false);
  const aliensOnPlanet = useAliensOnPlanet();
  const { launchAlien } = useLaunchAliens();

  const [isLaunching, setIsLaunching] = useState(false);
  const {
    showMenu,
    setShowMenu,
    setIsAlienSelectionView,
    isAlienSelectionView,
  } = useAppStore();

  const initialCameraPosition = useMemo(() => {
    const x = (width || 0) < 640 ? 6 : 5;
    return new Vector3(x, 0, 0);
  }, [width, isLaunching]);

  const beginLaunch = async (tokenId: number) => {
    setIsAlienSelectionView(false);
    setIsLaunching(true);
    const transactionHash = await launchAlien(tokenId);
  };

  const [currentCameraPosition, setCurrentCameraPosition] = useState(
    initialCameraPosition
  );

  return (
    <Suspense
      fallback={
        <div className="h-full bg-black">
          <div className="pt-48">
            <Loading />
          </div>
        </div>
      }
    >
      <Canvas camera={{ position: initialCameraPosition, fov: 50 }}>
        <GUI />
        <Earth
          onClick={() => {
            setIsAlienDetailView(!isAlienDetailView);
          }}
        />
        <AlienSatellites aliensOnPlanet={aliensOnPlanet} />
        <ambientLight intensity={0.005} />
        {/* SUN */}
        <pointLight position={SUN_POSITION} intensity={1} />
        <OrbitControls
          enableZoom={false}
          enableRotate={
            !isLaunching && !isAlienDetailView && !isAlienSelectionView
          }
          onEnd={(event) => {
            const target = event?.target;
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
              beginLaunch={beginLaunch}
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
