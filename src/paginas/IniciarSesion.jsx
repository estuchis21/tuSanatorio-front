import React, { useState } from "react";
import "../estilos/IniciarSesion.css";
import { useNavigate } from "react-router-dom";

export default function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego usaremos servicioAuth.login({ email, password })
    console.log("Iniciando sesión con:", { email, password });
  };

  return (
    <div className="login-contenedor">
      <form className="login-formulario" onSubmit={handleSubmit}>
        <h2 className="login-titulo">Iniciar Sesión</h2>

        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="login-label">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-boton">
          Entrar
        </button>

        {/* Texto debajo del botón */}
        <div className="login-registrate">
          No estás registrado?{" "}
          <span onClick={() => navigate("/registro")}>Regístrate</span>.
        </div>
      </form>
    </div>
  );
}
