import React from "react";
import { Link } from "react-router-dom";
import "../estilos/Layout.css";

export default function DiseñoPaciente({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Portal del Paciente</h1>
        <nav>
          <Link to="/home">Inicio</Link>
          <Link to="/paciente">Mis Turnos</Link>
          <Link to="/">Cerrar sesión</Link>
        </nav>
      </header>
      <main className="layout-contenido">
        {children}
      </main>
    </div>
  );
}

