import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function RotatingBox() {
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, "/assets/texture1.jpg");

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[-4, 1, 0]} onClick={() => (meshRef.current.rotation.y += 0.5)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function OscillatingSphere() {
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, "/assets/texture2.jpg");

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(clock.getElapsedTime()) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Scene() {
  const coneTexture = useLoader(TextureLoader, "/assets/alpha.png");

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      <RotatingBox />
      <OscillatingSphere />
      <mesh position={[4, 1, 0]}>
        <coneGeometry args={[1, 3, 32]} />
        <meshStandardMaterial map={coneTexture} />
      </mesh>
    </Canvas>
  );
}

const Lab1 = () => {
  return (
    <div style={{ height: "600px" }}>
      <Scene />
    </div>
  );
};

export default Lab1;