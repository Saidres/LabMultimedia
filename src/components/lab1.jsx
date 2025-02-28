import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';

function RotatingBox() {
  const meshRef = useRef(null);
  const texture = useLoader(TextureLoader, "/assets/alpha.png", (loader) => {
    loader.manager.onError = (url) => {
      console.error(`Could not load ${url}`);
    };
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[-8, 1, 0]} onClick={() => (meshRef.current.rotation.y += 0.5)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function TexturedSphere() {
  const texture = useLoader(TextureLoader, "/assets/alpha.png", (loader) => {
    loader.manager.onError = (url) => {
      console.error(`Could not load ${url}`);
    };
  });

  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function TexturedCone() {
  const texture = useLoader(TextureLoader, "/assets/alpha.png", (loader) => {
    loader.manager.onError = (url) => {
      console.error(`Could not load ${url}`);
    };
  });

  return (
    <mesh position={[4, 1, 0]}>
      <coneGeometry args={[1, 3, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function TexturedTorus() {
  const texture = useLoader(TextureLoader, "/assets/alpha.png", (loader) => {
    loader.manager.onError = (url) => {
      console.error(`Could not load ${url}`);
    };
  });

  return (
    <mesh position={[-4, 1, 0]}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function TexturedCylinder() {
  const albedoTexture = useLoader(TextureLoader, "/assets/alpha.png", (loader) => {
    loader.manager.onError = (url) => {
      console.error(`Could not load ${url}`);
    };
  });
  const alphaTexture = useLoader(TextureLoader, "/assets/alpha.png", (loader) => {
    loader.manager.onError = (url) => {
      console.error(`Could not load ${url}`);
    };
  });

  return (
    <mesh position={[8, 1, 0]}>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial map={albedoTexture} alphaMap={alphaTexture} transparent />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <OrbitControls />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      <RotatingBox />
      <TexturedSphere />
      <TexturedCone />
      <TexturedTorus />
      <TexturedCylinder />
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