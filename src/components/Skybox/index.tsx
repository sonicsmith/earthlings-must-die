import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Skybox = () => {
  const texture = useLoader(TextureLoader, '/images/stars.jpg');

  return (
    <Suspense fallback={null}>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={1} />
      </mesh>
    </Suspense>
  );
};

export default Skybox;
