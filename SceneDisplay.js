import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Cloud, Stars } from '@react-three/drei';
import { Color, MathUtils } from 'three';

// Animated Sun Component
const Sun = ({ weather }) => {
  const sunRef = useRef();
  const intensity = weather === 'sunny' ? 1 : 0.3;

  useFrame(({ clock }) => {
    if (sunRef.current) {
      // Gentle pulsing effect
      sunRef.current.scale.x = MathUtils.lerp(0.95, 1.05, Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
      sunRef.current.scale.y = sunRef.current.scale.x;
      sunRef.current.scale.z = sunRef.current.scale.x;
    }
  });

  if (weather === 'rainy' || weather === 'snowy') return null;

  return (
    <group position={[50, 40, -10]}>
      <mesh ref={sunRef}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      {/* Sun glow effect */}
      <pointLight color="#FDB813" intensity={intensity} distance={100} />
    </group>
  );
};

// Animated Tree Component
const Tree = ({ position, scale = 1, season }) => {
  const treeRef = useRef();
  const leafRef = useRef();

  const leafColor = useMemo(() => {
    switch(season) {
      case 'summer': return '#1a472a';  // Rich forest green
      case 'autumn': return ['#8B4513', '#CD853F', '#D2691E', '#8B0000'][Math.floor(Math.random() * 4)]; // Random autumn colors
      case 'winter': return '#2F4F4F';  // Dark slate gray
      case 'spring': return '#228B22';  // Forest green
      default: return '#2d5a27';
    }
  }, [season]);

  useFrame(({ clock }) => {
    if (treeRef.current && leafRef.current) {
      // Gentle swaying motion
      const time = clock.getElapsedTime();
      treeRef.current.rotation.x = Math.sin(time * 0.5) * 0.02;
      treeRef.current.rotation.z = Math.cos(time * 0.3) * 0.02;
      leafRef.current.rotation.y = Math.sin(time * 0.2) * 0.01;
    }
  });

  return (
    <group position={position} ref={treeRef}>
      {/* Trunk with texture */}
      <mesh position={[0, scale * 0.75, 0]}>
        <cylinderGeometry args={[scale * 0.2, scale * 0.3, scale * 1.5, 8]} />
        <meshStandardMaterial 
          color="#3d2817"  // Dark brown
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      {/* Leaves with animation */}
      <group ref={leafRef}>
        <mesh position={[0, scale * 2, 0]}>
          <coneGeometry args={[scale * 1, scale * 2, 8]} />
          <meshStandardMaterial 
            color={leafColor}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};

// Animated Cloud Component
const AnimatedCloud = ({ position, opacity, speed, scale }) => {
  const cloudRef = useRef();

  useFrame(({ clock }) => {
    if (cloudRef.current) {
      // Drift motion
      cloudRef.current.position.x += Math.sin(clock.getElapsedTime() * 0.2) * 0.01;
      cloudRef.current.position.y += Math.cos(clock.getElapsedTime() * 0.1) * 0.002;
    }
  });

  return (
    <Cloud
      ref={cloudRef}
      position={position}
      opacity={opacity}
      speed={speed}
      width={10 * scale}
      depth={1.5 * scale}
    />
  );
};

// Enhanced Ground Component
const Ground = ({ color, season, weather }) => {
  const groundRef = useRef();

  const groundColor = useMemo(() => {
    if (weather === 'snowy') return '#e6eef4';  // Bluish white for snow
    switch(season) {
      case 'summer': 
        return '#2e4424';  // Deep grass green
      case 'autumn': 
        return '#8B4513';  // Saddle brown
      case 'winter': 
        return '#4a5d23';  // Muted green
      case 'spring': 
        return '#567d46';  // Fresh spring green
      default: 
        return color;
    }
  }, [season, weather, color]);

  return (
    <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100, 32, 32]} />
      <meshStandardMaterial 
        color={groundColor}
        roughness={0.8}
        metalness={0.2}
        wireframe={false}
      />
    </mesh>
  );
};

// Weather Effects with Animation
const WeatherEffects = ({ weather, count = 3000 }) => {
  const particlesRef = useRef();

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        // Gravity effect
        positions[i + 1] -= 0.1;  // Y position
        if (positions[i + 1] < -10) {
          positions[i + 1] = 20;  // Reset to top
        }
        // Add some randomness to X and Z for more natural movement
        positions[i] += (Math.random() - 0.5) * 0.1;
        positions[i + 2] += (Math.random() - 0.5) * 0.1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (weather === 'snowy' || weather === 'rainy') {
    return (
      <points ref={particlesRef}>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 50)}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={weather === 'snowy' ? 0.1 : 0.05}
          color={weather === 'snowy' ? '#ffffff' : '#aaddff'}
          transparent={true}
          opacity={0.6}
        />
      </points>
    );
  }
  return null;
};

// Scene Compositions
const BaseScene = ({ weather, season, children }) => {
  const atmosphereColor = useMemo(() => {
    switch(weather) {
      case 'cloudy': return '#94a3b8';  // Slate gray
      case 'rainy': return '#64748b';   // Cool gray
      case 'snowy': return '#cbd5e1';   // Light gray
      default: return '#7dd3fc';        // Light blue
    }
  }, [weather]);

  return (
    <>
      {weather === 'sunny' && <Sky distance={450000} sunPosition={[50, 40, -10]} />}
      {weather !== 'sunny' && <color attach="background" args={[atmosphereColor]} />}
      {weather !== 'sunny' && <fog attach="fog" args={[atmosphereColor, 10, 50]} />}
      
      {/* Always render sun, but with different intensities */}
      <Sun weather={weather} />
      
      {/* Dynamic cloud system */}
      {Array.from({ length: weather === 'cloudy' ? 12 : 6 }).map((_, i) => (
        <AnimatedCloud
          key={i}
          position={[
            (Math.random() - 0.5) * 40,
            10 + Math.random() * 10,
            (Math.random() - 0.5) * 40
          ]}
          opacity={weather === 'cloudy' ? 0.8 : 0.4}
          speed={0.2}
          scale={Math.random() * 0.5 + 0.8}
        />
      ))}
      
      <WeatherEffects weather={weather} />
      <Ground weather={weather} season={season} />
      {children}
    </>
  );
};

// Scene Compositions remain the same but use enhanced components
const OpenField = ({ weather, season }) => (
  <BaseScene weather={weather} season={season}>
    <Tree position={[-5, 0, -5]} scale={1.2} season={season} />
    <Tree position={[3, 0, -2]} season={season} />
    <Tree position={[7, 0, -7]} scale={0.8} season={season} />
  </BaseScene>
);

const CrowdedMarket = ({ weather, season }) => (
  <BaseScene weather={weather} season={season}>
    <group position={[-10, 0, -10]}>
      <Tree position={[-2, 0, -2]} season={season} />
      <Tree position={[2, 0, 2]} season={season} />
    </group>
    {Array.from({ length: 5 }).map((_, i) => (
      <mesh key={i} position={[i * 3 - 6, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#8B4513"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    ))}
  </BaseScene>
);

const HillyTerrain = ({ weather, season }) => (
  <BaseScene weather={weather} season={season}>
    <Tree position={[-15, 3, -15]} scale={1.5} season={season} />
    <Tree position={[10, 4, -20]} season={season} />
    <Tree position={[-3, 0, -3]} season={season} />
    <Tree position={[5, 0, -5]} season={season} />
    <Tree position={[-8, 0, -8]} scale={1.2} season={season} />
  </BaseScene>
);

// Main Scene Display Component
const SceneDisplay = ({ scene, weather, season }) => {
  const renderScene = () => {
    switch(scene) {
      case 'openField':
        return <OpenField weather={weather} season={season} />;
      case 'crowdedMarket':
        return <CrowdedMarket weather={weather} season={season} />;
      case 'hillyTerrain':
        return <HillyTerrain weather={weather} season={season} />;
      default:
        return <OpenField weather={weather} season={season} />;
    }
  };

  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={weather === 'sunny' ? 1 : 0.5} 
        castShadow
      />
      {renderScene()}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        maxPolarAngle={Math.PI / 2.1}  // Prevent camera from going below ground
      />
    </Canvas>
  );
};

export default SceneDisplay;