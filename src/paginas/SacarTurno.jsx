// src/paginas/SacarTurno.jsx
import React, { useState } from "react";
import "../estilos/SacarTurno.css";

export default function SacarTurno() {
  const [especialidad, setEspecialidad] = useState("");
  const [medico, setMedico] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Turno solicitado:\nEspecialidad: ${especialidad}\nMédico: ${medico}\nFecha: ${fecha}\nHora: ${hora}`);
    // Acá podrías hacer un fetch/post a tu backend
  };

  return (
    <div className="sacar-turno-contenedor">
      <h2>Solicitar un Turno</h2>
      <form className="sacar-turno-formulario" onSubmit={handleSubmit}>
        <label>
          Especialidad:
          <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} required>
            <option value="">Seleccionar</option>
            <option value="Clínica Médica">Clínica Médica</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Dermatología">Dermatología</option>
          </select>
        </label>

        <label>
          Médico:
          <select value={medico} onChange={(e) => setMedico(e.target.value)} required>
            <option value="">Seleccionar</option>
            <option value="Dr. López">Dr. López</option>
            <option value="Dra. Martínez">Dra. Martínez</option>
            <option value="Dr. Pérez">Dr. Pérez</option>
          </select>
        </label>

        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </label>

        <label>
          Hora:
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
        </label>

        <button type="submit">Confirmar Turno</button>
      </form>
    </div>
  );
}
