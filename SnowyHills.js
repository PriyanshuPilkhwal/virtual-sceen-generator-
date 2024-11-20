import React from 'react';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Snowflake({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function SnowyHills() {
  const snowflakes = Array.from({ length: 100 }, () => [
    (Math.random() - 0.5) * 10,
    Math.random() * 10,
    (Math.random() - 0.5) * 10,
  ]);

  return (
    <>
      <ambientLight intensity={0.3} />
      {snowflakes.map((pos, index) => (
        <Snowflake key={index} position={pos} />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}

export default SnowyHills;
