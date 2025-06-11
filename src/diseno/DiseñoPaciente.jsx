import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../estilos/Layout.css";

export default function DiseñoPaciente() {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Portal del Paciente</h1>
        <nav>
          <Link to="/paciente/sacar-turno">Sacar Turnos</Link>
          <Link to="/paciente/mis-turnos">Mis Turnos</Link>
          <Link to="/">Cerrar sesión</Link>
        </nav>
      </header>
      <main className="layout-contenido">
        <Outlet />
      </main>
    </div>
  );
}
