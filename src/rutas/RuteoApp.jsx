import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

// Páginas
import Home from "../paginas/Home";
import IniciarSesion from "../paginas/IniciarSesion";
import Inicio from "../paginas/Inicio";
import Medico from "../paginas/Medico";
import MisTurnos from "../paginas/MisTurnos";
import Registro from "../paginas/Registro";
import SacarTurno from "../paginas/SacarTurno";
import TurnosMedico from "../paginas/TurnosMedico";

// Navbar
import Navbar from "../components/NavBar"; // asegúrate de que exista en components

function RuteoApp() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Rutas donde NO debe aparecer el navbar
  const hiddenNavbarRoutes = ["/", "/login", "/registro", "/home"];
  const shouldShowNavbar = !hiddenNavbarRoutes.includes(location.pathname);

  const isPaciente = true; // luego lo manejás según el rol real (auth)

  return (
    <>
      {shouldShowNavbar && <Navbar isPaciente={isPaciente} />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />

        {/* Rutas del paciente */}
        <Route path="/paciente/mis-turnos" element={<MisTurnos />} />
        <Route path="/paciente/sacar-turno" element={<SacarTurno />} />

        {/* Rutas del médico */}
        <Route path="/medico" element={<Medico />} />
        <Route path="/medico/turnos" element={<TurnosMedico />} />

        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default RuteoApp;
