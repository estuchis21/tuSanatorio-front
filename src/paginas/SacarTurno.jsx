// src/paginas/SacarTurno.jsx
import React, { useEffect, useState } from "react";
import {asignarTurno} from "../servicios/servicioTurnos";
import "../estilos/SacarTurno.css";

export default function SacarTurno() {
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [turnos, setTurnos] = useState([]);

  const [idEspecialidad, setIdEspecialidad] = useState("");
  const [idMedico, setIdMedico] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  // Cargar especialidades al iniciar
  useEffect(() => {
    obtenerEspecialidades().then(res => setEspecialidades(res.data));
  }, []);

  // Cargar médicos cuando cambia la especialidad
  useEffect(() => {
    if (idEspecialidad) {
      obtenerMedicosPorEspecialidad(idEspecialidad).then(res => setMedicos(res.data));
    } else {
      setMedicos([]);
    }
  }, [idEspecialidad]);

  // Cargar turnos cuando cambia médico y fecha
  useEffect(() => {
    if (idMedico && fecha) {
      obtenerTurnosDisponibles(idMedico, fecha).then(res => setTurnos(res.data));
    } else {
      setTurnos([]);
    }
  }, [idMedico, fecha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reservarTurno({
        idTurno: horaSeleccionada,
        idPaciente: JSON.parse(localStorage.getItem("usuario")).id,
        idObraSocial: 1 // por ahora se puede dejar fijo
      });
      alert("Turno reservado exitosamente");
    } catch (err) {
      console.error(err);
      alert("Error al reservar turno");
    }
  };

  return (
    <div className="sacar-turno-contenedor">
      <h2>Solicitar un Turno</h2>
      <form className="sacar-turno-formulario" onSubmit={handleSubmit}>
        <label>
          Especialidad:
          <select value={idEspecialidad} onChange={(e) => setIdEspecialidad(e.target.value)} required>
            <option value="">Seleccionar</option>
            {especialidades.map((esp) => (
              <option key={esp.id_especialidad} value={esp.id_especialidad}>{esp.nombre}</option>
            ))}
          </select>
        </label>

        <label>
          Médico:
          <select value={idMedico} onChange={(e) => setIdMedico(e.target.value)} required>
            <option value="">Seleccionar</option>
            {medicos.map((med) => (
              <option key={med.id_medico} value={med.id_medico}>
                {med.nombres} {med.apellido}
              </option>
            ))}
          </select>
        </label>

        <label>
          Fecha:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        </label>

        <label>
          Horario:
          <select value={horaSeleccionada} onChange={(e) => setHoraSeleccionada(e.target.value)} required>
            <option value="">Seleccionar</option>
            {turnos.map((turno) => (
              <option key={turno.id_turno} value={turno.id_turno}>
                {turno.hora_inicio} - {turno.hora_fin}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Confirmar Turno</button>
      </form>
    </div>
  );
}
