import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
/**
 * Componente que renderiza varios ejemplos de geometrías de Three.js.
 * Se muestran distintos tipos de geometrías para ilustrar cómo usarlas.
 */
const Lab2 = () => {
  // Componente para la esfera con rotación continua
function RotatingSphere() {
    const sphereRef = useRef();
    
    useFrame(() => {
      if (sphereRef.current) {
        // Rotación continua en el eje Y
        sphereRef.current.rotation.y += 0.01;
      }
    });
    
    return (
      <mesh ref={sphereRef} position={[-2, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
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
      <mesh ref={cubeRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="lightblue" />
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
        position={[2, 0, 0]} 
        onClick={handleClick}
      >
        <coneGeometry args={[1, 2, 32]} />
        <meshStandardMaterial color={isClicked ? "limegreen" : "orange"} />
      </mesh>
    );
  }
  
  // Escenario principal que contiene las tres figuras geométricas
  function Scene() {
    return (
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingSphere />
        <OscillatingCube />
        <InteractiveCone />
        <OrbitControls />
        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />
      </Canvas>
    );
  }
  
    return <Scene />;
};

export default Lab2;