// src/components/Navbar.js
import Logo from '../assets/224868501-removebg-preview (2).png';
import "../estilos/Navbar.css";

export default function Navbar() {
  const idRol = Number(localStorage.getItem("id_rol")); // 1 = paciente, 2 = médico

  return (
    <nav className="navbar">
      <div className="navbar-logo"><img src={Logo} alt="logo" className="logo"/></div>
      <ul className="navbar-links">
        {idRol === 1 ? (
          // Opciones para paciente
          <>
            <li><a href="/">Volver al inicio</a></li>
            <li><a href="/elegirTurnoPorEspecialidad">Elegir turnos por especialidad</a></li>
            <li><a href="/MisTurnos">Ver Turnos pasados</a></li>
            <li><a href="/historiaClinica-paciente">Ver historias clínicas</a></li>
            <li><a href="/profile">Ver perfil</a></li>
          </>
        ) : idRol === 2 ? (
          // Opciones para médico
          <>
            <li><a href="/">Volver al inicio</a></li>
            <li><a href="/insertTurnos">Ingresar turnos disponibles</a></li>
            <li><a href="/medico/turnos">Ver turnos del médico</a></li>
            <li><a href="/medicosOpciones">Historias clínicas</a></li>
            <li><a href="/profile">Ver perfil</a></li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}
