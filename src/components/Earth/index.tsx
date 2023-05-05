import React, { useRef } from 'react';
import { Sphere, useGLTF } from '@react-three/drei';
import AlienParticles from '../AlienParticles';

export default function Earth() {
  const { nodes, materials } = useGLTF('/models/earth.gltf') as any;

  const ref = useRef();

  return (
    <>
      <group dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials['Material.001']}
          />
        </group>
      </group>
      {['red', 'blue', 'green'].map((color) => (
        <AlienParticles color={color} />
      ))}
    </>
  );
}

useGLTF.preload('/earth.gltf');
