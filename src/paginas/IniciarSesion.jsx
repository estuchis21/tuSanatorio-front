import React, { useState } from "react";
import "../estilos/IniciarSesion.css";
import { useNavigate } from "react-router-dom";
import imgLogin from "../assets/imgLogin.jpg";
import { login } from "../servicios/servicioAuth";

export default function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(username, contrasena);
      const usuario = res.data.user;

      // Redirigir según rol
      if (usuario.id_rol === 1) {
        navigate("/paciente");
      } else if (usuario.id_rol === 2) {
        navigate("/medico");
      } else {
        alert("Rol de usuario desconocido");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
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
