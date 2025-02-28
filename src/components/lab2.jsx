import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Componente para el toroide con rotación continua en eje Y
function RotatingTorus() {
  const torusRef = useRef();
  
  useFrame(() => {
    if (torusRef.current) {
      // Rotación continua en el eje Y
      torusRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={torusRef} position={[-6, 0, 0]}>
      <torusGeometry args={[1, 0.4, 16, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

// Componente para el octaedro con rotación continua en eje X
function RotatingOctahedron() {
  const octaRef = useRef();
  
  useFrame(() => {
    if (octaRef.current) {
      // Rotación continua en el eje X
      octaRef.current.rotation.x += 0.01;
    }
  });
  
  return (
    <mesh ref={octaRef} position={[-2, 0, 0]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="turquoise" />
    </mesh>
  );
}

// Componente para el cubo con movimiento oscilatorio
function OscillatingCube() {
  const cubeRef = useRef();
  const [time, setTime] = useState(0);
  
  useFrame(() => {
    if (cubeRef.current) {
      // Incrementar el tiempo para la animación
      setTime(prevTime => prevTime + 0.02);
      
      // Movimiento oscilatorio en el eje Y
      cubeRef.current.position.y = Math.sin(time) * 1.5;
    }
  });
  
  return (
    <mesh ref={cubeRef} position={[2, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
}

// Componente para el cono con interacción del mouse
function InteractiveCone() {
  const coneRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.01);
  
  useFrame(() => {
    if (coneRef.current) {
      // Cambiar dirección de rotación según si fue clickeado
      coneRef.current.rotation.x += isClicked ? rotationSpeed : -rotationSpeed;
      coneRef.current.rotation.z += isClicked ? rotationSpeed : -rotationSpeed;
    }
  });
  
  const handleClick = () => {
    setIsClicked(!isClicked);
    // Cambiar velocidad de rotación con cada clic
    setRotationSpeed(Math.random() * 0.05 + 0.01);
  };
  
  return (
    <mesh 
      ref={coneRef} 
      position={[6, 0, 0]} 
      onClick={handleClick}
    >
      <coneGeometry args={[1, 2, 32]} />
      <meshStandardMaterial color={isClicked ? "royalblue" : "crimson"} />
    </mesh>
  );
}

// Escenario principal que contiene las cuatro figuras geométricas
function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingTorus />
      <RotatingOctahedron />
      <OscillatingCube />
      <InteractiveCone />
      <OrbitControls />
      <gridHelper args={[20, 20]} />
      <axesHelper args={[5]} />
    </Canvas>
  );
}

// Componente App para exportar
export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Scene />
    </div>
  );
}