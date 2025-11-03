import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

// Páginas
import Home from "../paginas/Home";
import IniciarSesion from "../paginas/IniciarSesion";
import Inicio from "../paginas/Inicio";
import Medico from "../paginas/Medico";
import MisTurnos from "../paginas/MisTurnos";
import Registro from "../paginas/Registro";
import SacarTurno from '../paginas/SacarTurno';
import TurnosMedico from "../paginas/TurnosMedico";
import ModificarTurno from "../paginas/ModificarTurno";
// Navbar
import Navbar from "../components/NavBar"; // asegúrate de que exista en components
import CrearHistoria from "../paginas/CrearHistoria";
import ElegirMedicoPorEspecialidad from "../paginas/ElegirMedicoPorEspecialidad";
import VerHistoriasMedico from "../paginas/HistoriasClinicasMedico";
import HistoriasClinicasPaciente from "../paginas/HistoriasClinicasPaciente";
import MedicoOpciones from "../paginas/MedicosOpciones";
import ProfileView from "../paginas/ProfileView";
import SesiónActiva from "../paginas/SesiónActiva";
import TurnosDispInsert from "../paginas/TurnosDispInsert";

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
        <Route path="/sacarTurno" element={<SacarTurno/>}/>
        <Route path="/elegirTurnoPorEspecialidad" element={<ElegirMedicoPorEspecialidad/>}/>
        <Route path="/MisTurnos" element={<MisTurnos />} />
        <Route path="/sesionActiva" element={<SesiónActiva />} />
        <Route path="/historiaClinica-paciente" element={<HistoriasClinicasPaciente />} />
        <Route path="/profile" element={<ProfileView/>}/>
        <Route path="/modificarTurno" element={<ModificarTurno />} />

        {/* Rutas del médico */}
        <Route path="/medico" element={<Medico />} />
        <Route path="/medico/turnos" element={<TurnosMedico />} />
        <Route path="/insertTurnos" element={<TurnosDispInsert/>}/>
        <Route path="/medicosOpciones" element={<MedicoOpciones />} />
        <Route path="/crearHistoria" element={<CrearHistoria />} />
        <Route path="/verHistorias" element={<VerHistoriasMedico />} />
        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default RuteoApp;
