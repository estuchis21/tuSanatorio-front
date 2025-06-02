import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "../paginas/Inicio";
import IniciarSesion from "../paginas/IniciarSesion";
import Registro from "../paginas/Registro";
// Luego agregaremos rutas protegidas para paciente y médico

export default function RuteoApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />

        {/* Si la ruta no existe, redirigir a '/' */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
