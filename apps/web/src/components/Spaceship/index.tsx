import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import * as THREE from 'three';

const DESTINATION = new Vector3(0, 0, 0);
const SPEED = 0.2;
const RED = new THREE.Color(0x55ff55);

export default function Spaceship({
  cameraPosition,
  setIsLaunching,
}: {
  cameraPosition: Vector3;
  setIsLaunching: (isLaunching: boolean) => void;
}) {
  const { nodes, materials } = useGLTF('/models/spaceship.glb') as any;

  const shipRef = useRef();
  const lightRef = useRef();

  const [hasBeenPositioned, setHasBeenPositioned] = useState(false);
  const [startDistance, setStartDistance] = useState(0);

  useEffect(() => {
    console.log('cameraPosition', cameraPosition);
    if (shipRef.current) {
      console.log('Setting spaceship position');
      // Spaceship
      const current = shipRef.current as any;
      current.position.x = cameraPosition.x;
      current.position.y = cameraPosition.y + 0.04;
      current.position.z = cameraPosition.z - 0.03;
      // rotate
      current.rotation.z = 0.05;
      setHasBeenPositioned(true);
      setStartDistance(cameraPosition.distanceTo(DESTINATION));
    }
  }, []);

  useFrame(() => {
    if (shipRef.current) {
      const current = shipRef.current as any;
      const distanceLeft = current.position.distanceTo(DESTINATION) - 1;
      //
      const normalisedTraveled = startDistance / distanceLeft;

      current.rotation.y += 0.015;
      current.rotation.z += 0.00001;

      const SLOW_DOWN = distanceLeft * 100;
      current.position.lerp(DESTINATION, SPEED / SLOW_DOWN);
      current.position.z += normalisedTraveled * 0.0001;
      if (distanceLeft < 1 && hasBeenPositioned) {
        setIsLaunching(false);
      }
      if (lightRef.current) {
        (lightRef.current as any).intensity = 1 / (normalisedTraveled * 1.5);
      }
    }
  });

  return (
    <>
      <pointLight
        position={cameraPosition}
        intensity={0.5}
        color={RED}
        ref={lightRef as any}
      />
      <group dispose={null} scale={0.01} ref={shipRef as any}>
        <group position={[0, -0.004, 0]} scale={1.125}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_7.geometry}
            material={materials.Dark_Chrome}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.Swirly_underbelly_stones}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_9.geometry}
            material={materials.Dark_Rim}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials.Yellow_Disc_Rim}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_11.geometry}
            material={materials.Chrome}
          />
        </group>
        <group
          position={[1.977, -0.615, -1.895]}
          rotation={[0.259, 0.878, 1.255]}
          scale={0.057}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_23.geometry}
            material={materials.Dark_Chrome}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_24.geometry}
            material={materials.Dome_Top}
          />
        </group>
        <group
          position={[-2.011, -0.616, 1.898]}
          rotation={[2.868, -0.918, -1.905]}
          scale={0.057}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_26.geometry}
            material={materials.Dark_Chrome}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_27.geometry}
            material={materials.Dome_Top}
          />
        </group>
        <group
          position={[-2.007, -0.611, -1.903]}
          rotation={[2.938, 0.624, -1.566]}
          scale={0.057}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_29.geometry}
            material={materials.Dark_Chrome}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_30.geometry}
            material={materials.Dome_Top}
          />
        </group>
        <group
          position={[1.971, -0.631, 1.903]}
          rotation={[0.208, -0.654, 1.584]}
          scale={0.057}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_32.geometry}
            material={materials.Dark_Chrome}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_33.geometry}
            material={materials.Dome_Top}
          />
        </group>
        <group position={[-0.235, 0.256, -0.908]} rotation={[0, -0.529, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_36.geometry}
            material={materials.Dark_Rim}
            position={[-0.001, 0.001, -0.005]}
            rotation={[-1.535, 0.071, 0.26]}
            scale={[0.009, 0.002, 0.01]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_38.geometry}
            material={materials.Chrome}
            position={[-0.206, -0.417, -0.534]}
            rotation={[3.11, 0.879, 2.932]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_40.geometry}
            material={materials.Chrome}
            position={[-0.135, -0.121, -0.387]}
            rotation={[1.307, 0.347, -0.622]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_42.geometry}
            material={materials.Chrome}
            position={[-0.232, -0.435, -0.579]}
            rotation={[3.11, 0.879, 2.932]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_44.geometry}
            material={materials.Chrome}
            position={[-0.262, -0.454, -0.63]}
            rotation={[3.11, 0.879, 2.932]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_46.geometry}
            material={materials.Chrome}
            position={[0.001, 0.001, 0.002]}
            rotation={[-1.545, 0.074, 0.385]}
            scale={[0.017, 0.003, 0.019]}
          />
        </group>
        <group position={[-0.144, 0.251, -0.901]} rotation={[0, -0.439, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_51.geometry}
            material={materials.Chrome}
            position={[-0.206, -0.414, -0.537]}
            rotation={[3.109, 0.883, 2.932]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_53.geometry}
            material={materials.Chrome}
            position={[-0.135, -0.116, -0.385]}
            rotation={[1.316, 0.405, -0.536]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_55.geometry}
            material={materials.Chrome}
            position={[-0.228, -0.43, -0.584]}
            rotation={[3.109, 0.883, 2.932]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_57.geometry}
            material={materials.Chrome}
            position={[-0.254, -0.448, -0.638]}
            rotation={[3.109, 0.883, 2.932]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_59.geometry}
            material={materials.Chrome}
            position={[0.001, 0.001, 0.002]}
            rotation={[-1.545, 0.074, 0.385]}
            scale={[0.017, 0.003, 0.019]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_61.geometry}
            material={materials.Dark_Rim}
            position={[-0.001, 0.001, -0.005]}
            rotation={[-1.535, 0.071, 0.26]}
            scale={[0.009, 0.002, 0.01]}
          />
        </group>
        <group
          position={[-0.004, 0.197, -1.142]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.177, 0.49, 0.177]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_63.geometry}
            material={materials.Yellow_Disc_Rim}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_64.geometry}
            material={materials.Chrome}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_65.geometry}
            material={materials.Dome_Under}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_66.geometry}
            material={materials.Swirly_underbelly_stones}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_67.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_68.geometry}
            material={materials.Dark_Rim}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.material}
          position={[0, -0.004, 0]}
          scale={1.168}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_13.geometry}
          material={materials.material}
          position={[0, 0.483, 0]}
          scale={[1.231, 0.936, 1.231]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_15.geometry}
          material={materials.Dome_Top}
          position={[0, 0.528, 0]}
          scale={[1.231, 1.329, 1.231]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_17.geometry}
          material={materials.Dome_Under}
          position={[0, 0.2, 0]}
          scale={1.308}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_19.geometry}
          material={materials.Dark_Chrome}
          position={[-0.03, -0.142, 0]}
          rotation={[0, 0, Math.PI]}
          scale={[1.097, 1.204, 1.115]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_21.geometry}
          material={materials.Dome_Top}
          position={[0, 0.483, 0]}
          scale={[1.184, 0.9, 1.184]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_48.geometry}
          material={materials.Dome_Top}
          position={[0, 0.528, 0]}
          scale={[1.231, 1.329, 1.231]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_70.geometry}
          material={materials.Dark_Rim}
          position={[0.18, 0.005, -1.065]}
          rotation={[Math.PI, 0, Math.PI / 2]}
          scale={[-0.141, 0.141, 0.141]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_72.geometry}
          material={materials.Dark_Rim}
          position={[-0.179, 0.005, -1.065]}
          rotation={[Math.PI, 0, Math.PI / 2]}
          scale={[-0.141, 0.141, 0.141]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_74.geometry}
          material={materials.Dark_Rim}
          position={[-0.177, 0.238, -0.933]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.077}
        />
      </group>
    </>
  );
}

useGLTF.preload('/models/spaceship.glb');
