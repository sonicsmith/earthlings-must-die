import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const getRadians = () => {
  const currentDate = new Date();
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  const timeDiff = midnight.getTime() - currentDate.getTime();
  const secondsDiff = timeDiff / 1000;
  return (secondsDiff / 86400) * (2 * Math.PI);
};

export default function Earth({ onClick }: any) {
  const { nodes, materials } = useGLTF('/models/earth.glb') as any;

  const rotation = useMemo(() => getRadians(), []);

  return (
    <group onClick={onClick} dispose={null} rotation={[0, rotation, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={17}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.earth_Earth_0.geometry}
              material={materials.Earth}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/earth.glb');
