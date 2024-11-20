import React from 'react';
import { Cloud, Sky } from '@react-three/drei';

function CloudyHills() {
  return (
    <>
      <Sky sunPosition={[0, 1, 0]} turbidity={10} rayleigh={2} />
      <Cloud position={[0, 5, -10]} opacity={0.4} />
      <Cloud position={[5, 5, -5]} opacity={0.4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="darkgreen" />
      </mesh>
    </>
  );
}

export default CloudyHills;
