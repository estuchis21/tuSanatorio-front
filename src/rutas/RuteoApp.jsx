import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "../paginas/Inicio";
import IniciarSesion from "../paginas/IniciarSesion";
import Registro from "../paginas/Registro";
import Home from "../paginas/Home"; // Ruta corregida

export default function RuteoApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />

        {/* Ruta comodín para redirigir */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

