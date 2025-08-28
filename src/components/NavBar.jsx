// src/components/Navbar.js
import "../estilos/Navbar.css";

export default function Navbar({ isPaciente }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">TuSanatorio</div>
      <ul className="navbar-links">
        <li><a href="/login">Login</a></li>
        {isPaciente && (
          <>
            <li><a href="/paciente/mis-turnos">Ver Turnos</a></li>
            <li><a href="/paciente/sacar-turno">Crear Turno</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}
