import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Earth({ onClick }: any) {
  const { nodes, materials } = useGLTF('/models/earth.glb') as any;
  return (
    <group onClick={onClick} dispose={null}>
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
