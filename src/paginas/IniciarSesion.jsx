// src/paginas/IniciarSesion.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgLogin from "../assets/imgLogin.jpg";
import "../estilos/IniciarSesion.css";
import { getMedicoByUsuarioId, getPacienteByUsuarioId, login } from "../servicios/servicioAuth";

export default function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(username, contrasena);
      const usuario = res.user;

      localStorage.setItem("token", res.token);
      localStorage.setItem("id_usuario", usuario.id_usuario);
      localStorage.setItem("id_rol", usuario.id_rol);

      if (usuario.id_rol === 1) {
        // Paciente: obtener id_paciente y guardar
        const pacienteData = await getPacienteByUsuarioId(usuario.id_usuario);
        if (!pacienteData.id_paciente) {
          alert("No se encontró el paciente asociado a este usuario.");
          return;
        }
        localStorage.setItem("id_paciente", pacienteData.id_paciente);
        navigate("/paciente/mis-turnos");
      } else if (usuario.id_rol === 2) {
        // Médico: obtener id_medico y guardar
        const medicoData = await getMedicoByUsuarioId(usuario.id_usuario);
        if (!medicoData.id_medico) {
          alert("No se encontró el médico asociado a este usuario.");
          return;
        }
        localStorage.setItem("id_medico", medicoData.id_medico);
        navigate("/medico");
      } else {
        alert("Rol de usuario desconocido");
      }
    } catch (error) {
      alert(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-contenedor">
      <div className="login-imagen">
        <img src={imgLogin} alt="Imagen Login" />
      </div>

      <form className="login-formulario" onSubmit={handleSubmit}>
        <h2 className="login-titulo">Iniciar Sesión</h2>

        <label htmlFor="username" className="login-label">Usuario</label>
        <input
          type="text"
          id="username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="contrasena" className="login-label">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          className="login-input"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button type="submit" className="login-boton">Entrar</button>

        <div className="login-registrate">
          No estás registrado? <span onClick={() => navigate("/registro")}>Regístrate</span>.
        </div>
      </form>
    </div>
  );
}
