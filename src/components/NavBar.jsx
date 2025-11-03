import { useState } from "react";
import Logo from '../assets/224868501-removebg-preview (2).png';
import "../estilos/Navbar.css";

export default function Navbar() {
  const idRol = Number(localStorage.getItem("id_rol")); // 1 = paciente, 2 = médico
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const renderLinks = () => {
    if (idRol === 1) {
      return (
        <>
          <li><a href="/">Volver al inicio</a></li>
          <li><a href="/elegirTurnoPorEspecialidad">Elegir turnos por especialidad</a></li>
          <li><a href="/MisTurnos">Ver todos los turnos</a></li>
          <li><a href="/historiaClinica-paciente">Ver historias clínicas</a></li>
          <li><a href="/profile">Ver perfil</a></li>
        </>
      );
    } else if (idRol === 2) {
      return (
        <>
          <li><a href="/">Volver al inicio</a></li>
          <li><a href="/insertTurnos">Ingresar turnos disponibles</a></li>
          <li><a href="/medico/turnos">Ver turnos del médico</a></li>
          <li><a href="/medicosOpciones">Historias clínicas</a></li>
          <li><a href="/profile">Ver perfil</a></li>
        </>
      );
    }
    return null;
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="logo" className="logo"/>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {renderLinks()}
      </ul>
    </nav>
  );
}
