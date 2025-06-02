// src/paginas/Registro.jsx
import React, { useState } from "react";
import "../estilos/Registro.css";
import { registrar } from "../servicios/servicioAuth";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  // Estados para cada campo que espera tu backend
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");
  const [DNI, setDNI] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [rolId, setRolId] = useState(1); // 1 = paciente, 2 = médico

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llamamos al servicio registrar enviando exactamente las claves que tu backend lee
      await registrar({
        username,
        contrasena,
        nombre,
        DNI,
        telefono,
        mail,
        rol_id: rolId,
      });

      // Si sale bien, redirigimos al login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="registro-contenedor">
      <form className="registro-formulario" onSubmit={handleSubmit}>
        <h2 className="registro-titulo">Registro</h2>

        {errorMsg && <div className="registro-error">{errorMsg}</div>}

        <label htmlFor="username" className="registro-label">
          Nombre de usuario
        </label>
        <input
          type="text"
          id="username"
          className="registro-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="contrasena" className="registro-label">
          Contraseña
        </label>
        <input
          type="password"
          id="contrasena"
          className="registro-input"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <label htmlFor="nombre" className="registro-label">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          className="registro-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="DNI" className="registro-label">
          DNI
        </label>
        <input
          type="text"
          id="DNI"
          className="registro-input"
          value={DNI}
          onChange={(e) => setDNI(e.target.value)}
          required
        />

        <label htmlFor="telefono" className="registro-label">
          Teléfono
        </label>
        <input
          type="text"
          id="telefono"
          className="registro-input"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />

        <label htmlFor="mail" className="registro-label">
          Email
        </label>
        <input
          type="email"
          id="mail"
          className="registro-input"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />

        <label htmlFor="rol_id" className="registro-label">
          Rol
        </label>
        <select
          id="rol_id"
          className="registro-input"
          value={rolId}
          onChange={(e) => setRolId(Number(e.target.value))}
          required
        >
          <option value={1}>Paciente</option>
          <option value={2}>Médico</option>
        </select>

        <button type="submit" className="registro-boton">
          Registrarse
        </button>
      </form>
    </div>
  );
}
