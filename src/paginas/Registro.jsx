// src/paginas/Registro.jsx
import React, { useState } from "react";
import "../estilos/Registro.css";
import { registrar } from "../servicios/servicioAuth";
import { useNavigate, Link } from "react-router-dom";
import imgRegistro from "../assets/imgRegistro.jpg";

export default function Registro() {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellido, setApellido] = useState("");
  const [DNI, setDNI] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registrar({
        username,
        contrasena,
        nombres,
        apellido,
        DNI,
        telefono,
        email,
        id_rol: 1 // Siempre paciente
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="registro-layout">
      <div className="registro-imagen">
        <img src={imgRegistro} alt="Registro" />
      </div>
      <div className="registro-contenedor">
        <form className="registro-formulario" onSubmit={handleSubmit}>
          <h2 className="registro-titulo">Registro</h2>

          {errorMsg && <div className="registro-error">{errorMsg}</div>}

          <label htmlFor="username" className="registro-label">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            className="registro-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="contrasena" className="registro-label">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            className="registro-input"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <label htmlFor="nombres" className="registro-label">Nombres</label>
          <input
            type="text"
            id="nombres"
            className="registro-input"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />

          <label htmlFor="apellido" className="registro-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            className="registro-input"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <label htmlFor="DNI" className="registro-label">DNI</label>
          <input
            type="text"
            id="DNI"
            className="registro-input"
            value={DNI}
            onChange={(e) => setDNI(e.target.value)}
            required
          />

          <label htmlFor="telefono" className="registro-label">Teléfono</label>
          <input
            type="text"
            id="telefono"
            className="registro-input"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          <label htmlFor="email" className="registro-label">Email</label>
          <input
            type="email"
            id="email"
            className="registro-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="registro-boton">Registrarse</button>

          <div className="registro-link">
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

