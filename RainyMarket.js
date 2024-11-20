import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Raindrop({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function RainyMarket() {
  const raindrops = Array.from({ length: 100 }, () => [
    (Math.random() - 0.5) * 10,
    Math.random() * 10,
    (Math.random() - 0.5) * 10,
  ]);

  return (
    <>
      <ambientLight intensity={0.2} />
      {raindrops.map((pos, index) => (
        <Raindrop key={index} position={pos} />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  );
}

export default RainyMarket;
