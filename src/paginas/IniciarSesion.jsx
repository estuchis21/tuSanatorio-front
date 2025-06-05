import React, { useState } from "react";
import "../estilos/IniciarSesion.css";
import { useNavigate } from "react-router-dom";
import imgLogin from "../assets/imgLogin.jpg";

export default function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", { email, password });
  };

  return (
    <div className="login-contenedor">
      <div className="login-imagen">
        <img src={imgLogin} alt="Imagen Login" />
      </div>

      <form className="login-formulario" onSubmit={handleSubmit}>
        <h2 className="login-titulo">Iniciar Sesión</h2>

        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          id="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="login-label">Contraseña</label>
        <input
          type="password"
          id="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
