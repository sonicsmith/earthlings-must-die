import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Swarm({ count = 30, color = 'red' }: any) {
  const mesh = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 3 + Math.random() * 1;
      const speed = 0.01 + Math.random() / 200;
      temp.push({ t, factor, speed, mx: 0, my: 0, mz: 0 });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed } = particle;
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

      dummy.position.set(dummyX, dummyY, dummyZ);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      (mesh.current as any).setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) {
      (mesh.current as any).instanceMatrix.needsUpdate = true;
    }
  });
  const size = 0.03;
  return (
    <>
      <instancedMesh ref={mesh as any} args={[null, null, count] as any}>
        <dodecahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} />
      </instancedMesh>
    </>
  );
}
