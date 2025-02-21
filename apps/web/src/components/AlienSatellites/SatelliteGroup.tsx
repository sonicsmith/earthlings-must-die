import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const UFO_SIZE = 0.02;

export default function SatelliteGroup({ count = 30, color }: any) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 3 + Math.random() * 1;
      const speed = Math.random() / 100;
      temp.push({
        t,
        factor,
        speed,
        mx: 0,
        my: 0,
        mz: 0,
        angle: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, angle } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2;
      // Update the dummy object
      const divFactor = 20;
      const dummyX = particle.mx + Math.sin(t);
      const dummyY =
        particle.my +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / divFactor;
      const dummyZ =
        particle.mz / 10 +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / divFactor;
      dummy.rotation.set(angle, angle, angle + 0.01);
      dummy.position.set(dummyX, dummyY, dummyZ);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      (mesh.current as any).setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) {
      (mesh.current as any).instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={mesh as any} args={[null, null, count] as any}>
        <dodecahedronGeometry args={[UFO_SIZE, 0]} />
        <meshStandardMaterial color={color} />
      </instancedMesh>
    </>
  );
}
