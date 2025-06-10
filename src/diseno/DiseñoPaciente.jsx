import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../estilos/Layout.css";

export default function DiseñoPaciente() {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Portal del Paciente</h1>
        <nav>
          <Link to="/home">Inicio</Link>
          <Link to="/paciente/turnos">Mis Turnos</Link> {/* ✅ Enlace corregido */}
          <Link to="/">Cerrar sesión</Link>
        </nav>
      </header>
      <main className="layout-contenido">
        <Outlet /> {/* ✅ Para renderizar subrutas como Paciente y MisTurnos */}
      </main>
    </div>
  );
}

