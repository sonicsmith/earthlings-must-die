import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SkyBox from '../Skybox';
import Earth from '../Earth';
import { useWindowSize } from '~/hooks/useWindowSize';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import AlienCards from '../AlienCards';
import AlienSatellites from '../AlienSatellites';
import GUI from '../GUI';

const Dolly = ({ position }: any) => {
  const { z } = position;
  useFrame(({ clock, camera }) => {
    camera.position.lerp(position, 0.025);
  });
  return null;
};

export default function Scene() {
  const { width } = useWindowSize();
  const [isAlienDetailView, setIsAlienDetailView] = useState(false);

  const cameraPosition = useMemo(() => {
    const x = (width || 0) < 640 ? 6 : 5;
    return new Vector3(x, 0, 0);
  }, [width]);

  return (
    <Canvas camera={{ position: cameraPosition, fov: 50 }}>
      <GUI />
      <Earth
        onClick={() => {
          setIsAlienDetailView(!isAlienDetailView);
        }}
      />
      <AlienSatellites />
      <ambientLight intensity={0.005} />
      <pointLight position={[10, 0, 0]} intensity={0.5} />
      <Environment preset="night" background blur={0.5} />
      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.2}
      />
      <SkyBox />
      <AlienCards isShowing={isAlienDetailView} />
    </Canvas>
  );
}
