import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../estilos/Layout.css";

export default function DiseñoMedico() {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Portal del Médico</h1>
        <nav>
          <Link to="/medico/turnos">Turnos del Día</Link>
          <Link to="/">Cerrar sesión</Link>
        </nav>
      </header>
      <main className="layout-contenido">
        <Outlet />
      </main>
    </div>
  );
}

