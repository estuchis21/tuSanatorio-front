import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Inicio from "../paginas/Inicio";
import IniciarSesion from "../paginas/IniciarSesion";
import Registro from "../paginas/Registro";
import Home from "../paginas/Home";

import Paciente from "../paginas/Paciente";
import Medico from "../paginas/Medico";
import MisTurnos from "../paginas/MisTurnos"; // ✅ Importamos el nuevo componente

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

        {/* Ruta para pacientes con diseño */}
        <Route path="/paciente" element={<DiseñoPaciente />}>
          <Route index element={<Paciente />} />
          <Route path="turnos" element={<MisTurnos />} /> {/* ✅ Nueva ruta */}
        </Route>

        {/* Ruta para médicos con diseño */}
        <Route path="/medico" element={<DiseñoMedico />}>
          <Route index element={<Medico />} />
        </Route>

        {/* Ruta comodín para redirigir */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
