// src/paginas/SacarTurno.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../estilos/SacarTurno.css";

export default function SacarTurno() {
  const location = useLocation();
  const { medico, especialidad, horario, fecha } = location.state || {}; // evitar undefined
  const [obraSocial, setObraSocial] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica para reservar el turno usando:
    // medico.id_medico, especialidad.id_especialidad, fecha, horario.id_turno, obraSocial
  };

  if (!medico || !especialidad || !horario || !fecha) {
    return <p>No hay datos del turno. Volvé a seleccionar un horario.</p>;
  }

  return (
    <div className="sacar-turno-contenedor">
      <h2>Confirmar Turno</h2>
      <form className="sacar-turno-formulario" onSubmit={handleSubmit}>
        <p><b>Especialidad:</b> {especialidad.nombre}</p>
        <p><b>Médico:</b> {medico.nombres} {medico.apellido}</p>
        <p><b>Fecha:</b> {fecha}</p>
        <p><b>Horario:</b> {horario.hora_inicio} - {horario.hora_fin}</p>

        <label>
          Obra Social:
          <input
            type="text"
            value={obraSocial}
            onChange={(e) => setObraSocial(e.target.value)}
            required
          />
        </label>

        <button type="submit">Confirmar Turno</button>
      </form>
    </div>
  );
}
