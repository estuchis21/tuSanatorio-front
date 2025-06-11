import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Inicio from "../paginas/Inicio";
import IniciarSesion from "../paginas/IniciarSesion";
import Registro from "../paginas/Registro";
import Home from "../paginas/Home";

import Paciente from "../paginas/Paciente";
import Medico from "../paginas/Medico";
import MisTurnos from "../paginas/MisTurnos";
import SacarTurno from "../paginas/SacarTurno";

import DiseñoPaciente from "../diseno/DiseñoPaciente";
import DiseñoMedico from "../diseno/DiseñoMedico";

export default function RuteoApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />

        {/* Rutas del paciente con diseño */}
        <Route path="/paciente" element={<DiseñoPaciente />}>
          <Route index element={<Paciente />} />
          <Route path="mis-turnos" element={<MisTurnos />} />
          <Route path="sacar-turno" element={<SacarTurno />} />
        </Route>

        {/* Rutas del médico con diseño */}
        <Route path="/medico" element={<DiseñoMedico />}>
          <Route index element={<Medico />} />
        </Route>

        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
