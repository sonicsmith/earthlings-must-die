import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

const SECONDS_IN_DAY = 86400;
const OFFSET = 1000 * 70;

const getRadians = () => {
  const midnight = new Date().setHours(0, 0, 0, 0);
  const currentTime = new Date().getTime();
  const timeDiff = midnight - currentTime;
  const secondsDiff = timeDiff / 1000 + OFFSET;
  return (secondsDiff / SECONDS_IN_DAY) * (2 * Math.PI);
};

export default function Earth({ onClick }: any) {
  const { nodes, materials } = useGLTF('/models/earth.glb') as any;

  const rotation = useMemo(getRadians, []);

  return (
    <group
      onClick={onClick}
      dispose={null}
      rotation={[0, rotation, 0]}
      scale={0.003}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Sphere002_01_-_Default_0'].geometry}
        material={materials['01_-_Default']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.029}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Sphere003_02_-_Default_0'].geometry}
        material={materials['02_-_Default']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.048}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Sphere004_03_-_Default_0'].geometry}
        material={materials['03_-_Default']}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.059}
      />
    </group>
  );
}

useGLTF.preload('/models/earth.glb');
