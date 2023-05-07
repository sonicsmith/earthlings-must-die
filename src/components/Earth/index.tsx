import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Earth({ onClick }: any) {
  const { nodes, materials } = useGLTF('/models/earth.gltf') as any;

  return (
    <group onClick={onClick}>
      <group dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          {/* ICE */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.material}
          />
          {/* LAND */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Material}
          />
          {/* OCEAN */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials['Material.001']}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/earth.gltf');
