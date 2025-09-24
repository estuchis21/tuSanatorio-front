// src/components/Navbar.js
import "../estilos/Navbar.css";

export default function Navbar() {
  const idRol = Number(localStorage.getItem("id_rol")); // 1 = paciente, 2 = médico

  return (
    <nav className="navbar">
      <div className="navbar-logo">TuSanatorio</div>
      <ul className="navbar-links">
        {/* <li><a href="/login">Login</a></li> */}

        {idRol === 1 ? (
          // Opciones para paciente
          <>
            <li><a href="/">Volver al inicio</a></li>
            <li><a href="/sesionActiva">Elegir turnos por especialidad</a></li>
            <li><a href="/MisTurnos">Ver Turnos pasados</a></li>
            <li><a href="/historiaClinica-paciente">Ver historias clínicas</a></li>
            <li><a href="/updateInfoUser">Ver perfil</a></li>
          </>
        ) : idRol === 2 ? (
          // Opciones para médico
          <>
            <li><a href="/medico/turnos">Ver turnos del médico</a></li>
            <li><a href="/historiaClinica-paciente">Ver historias clínicas</a></li>
            <li><a href="/verPerfil">Ver perfil</a></li>
          </>
        ) : null}
      </ul>
    </nav>
  );
}
