import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import SkyBox from '../Skybox';
import Earth from '../Earth';
import { useWindowSize } from '~/hooks/useWindowSize';
import { Suspense, useMemo, useState } from 'react';
import { Vector3 } from 'three';
import AlienCards from '../AlienCards';
import AlienSatellites from '../AlienSatellites';
import TopBar from '../TopBar';
import Loading from '../Loading';
import { useAliensOnPlanet } from '~/hooks/useAliensOnPlanet';
import AlienSelectorDialog from '../AlienSelectorDialog';
import { useTransactions } from '~/hooks/useTransactions';
import Spaceship from '../Spaceship';
import { useAppStore } from '~/store/appStore';
import { MessageDialog } from '../MessageDialog';
import { TutorialDialog } from '../TutorialDialog';

const SUN_POSITION = new Vector3(10, 1, 0);

export default function Scene() {
  const {
    isAlienDetailView: showMenu,
    setIsAlienDetailView: setShowMenu,
    setIsAlienSelectionView,
    isAlienSelectionView,
    showTutorial,
    setShowTutorial,
    isAlienDetailView,
    setIsAlienDetailView,
  } = useAppStore();

  const { width } = useWindowSize();
  const { aliens, refetch: refetchAliens } = useAliensOnPlanet();
  const { launchAlien } = useTransactions();

  const [isLaunching, setIsLaunching] = useState(false);

  const [dialogContainer, setDialogContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [sceneMessage, setSceneMessage] = useState<string[]>([]);

  const initialCameraPosition = useMemo(() => {
    const x = (width || 0) < 640 ? 6 : 5;
    return new Vector3(x, 0, 0);
  }, [width, isLaunching]);

  const beginLaunch = async (tokenId: number) => {
    setIsAlienSelectionView(false);
    setIsLaunching(true);
    const transactionHash = await launchAlien(tokenId);
    console.log('transactionHash', transactionHash);
    refetchAliens();
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
        <TopBar />
        <Earth
          onClick={() => {
            setIsAlienDetailView(!isAlienDetailView);
          }}
        />
        <AlienSatellites aliensOnPlanet={aliens} />
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
            <AlienCards isShowing={isAlienDetailView} aliensOnPlanet={aliens} />
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
            landedCallback={() => {
              setSceneMessage([
                'Your invasion has successfully landed on Earth.',
                "You can see the alien's status by clicking on the planet.",
              ]);
              setIsLaunching(false);
              refetchAliens();
            }}
          />
        )}
        <Html center>
          {(sceneMessage.length > 0 || showTutorial) && (
            <div ref={setDialogContainer} className="h-96 w-96" />
          )}
          <MessageDialog
            setDialogMessage={setSceneMessage}
            message={sceneMessage}
            dialogContainer={dialogContainer}
          />
          <TutorialDialog
            setIsOpen={setShowTutorial}
            isOpen={showTutorial}
            dialogContainer={dialogContainer}
          />
        </Html>
      </Canvas>
    </Suspense>
  );
}
