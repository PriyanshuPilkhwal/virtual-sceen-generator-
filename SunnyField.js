import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';

function Sun() {
  return (
    <mesh position={[5, 10, -10]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
}

function SunnyField() {
  return (
    <>
      <Sky sunPosition={[10, 10, 10]} />
      <Sun />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
}

export default SunnyField;
