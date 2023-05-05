import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SkyBox from '../Skybox';
import Earth from '../Earth';
import { useWindowSize } from '~/hooks/useWindowSize';
import { useMemo } from 'react';
import { Vector3 } from 'three';

export default function Scene() {
  const { width } = useWindowSize();

  const cameraPosition = useMemo(() => {
    const x = (width || 0) < 640 ? 6 : 5;
    return new Vector3(x, 0, 0);
  }, [width]);

  return (
    <Canvas camera={{ position: cameraPosition, fov: 50 }}>
      <Earth />
      <Environment preset="sunset" background blur={0.5} />
      <OrbitControls />
      <SkyBox />
    </Canvas>
  );
}
