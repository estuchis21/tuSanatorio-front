import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Páginas
import Inicio from "../paginas/Inicio";
import IniciarSesion from "../paginas/IniciarSesion";
import Registro from "../paginas/Registro";
import Home from "../paginas/Home";
import Medico from "../paginas/Medico";
import MisTurnos from "../paginas/MisTurnos";
import SacarTurno from "../paginas/SacarTurno";
import TurnosMedico from "../paginas/TurnosMedico";

export default function RuteoApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />

        {/* Rutas del paciente */}
        {/* <Route path="/paciente" element={<Paciente />} /> */}
        <Route path="/paciente/mis-turnos" element={<MisTurnos />} />
        <Route path="/paciente/sacar-turno" element={<SacarTurno />} />

        {/* Rutas del médico */}
        <Route path="/medico" element={<Medico />} />
        <Route path="/medico/turnos" element={<TurnosMedico />} />

        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
