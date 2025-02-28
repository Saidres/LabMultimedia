import React from "react";
import Lab1 from "../components/lab1";

const Laboratorio1 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Laboratorio 1: Integración de un Escenario con Animación Mediante useFrame()</h1>
      <p>
        Crear un nuevo escenario donde al menos una figura geométrica tenga una animación usando useFrame().
      </p>
      <div style={{ height: "600px" }}>
        <Lab1 />
      </div>
    </div>
  );
};

export default Laboratorio1;
