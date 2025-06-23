
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../estilos/TurnosMedico.css";

export default function TurnosMedico() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_medico = usuario?.id;

  useEffect(() => {
    if (!id_medico) return;

    axios
      .get(`http://localhost:3000/api/turnos/historialMedico/${id_medico}`)
      .then((res) => {
        const hoy = new Date().toISOString().split("T")[0];
        const turnosHoy = res.data.filter(t => t.fecha_turno === hoy);
        setTurnos(turnosHoy);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando turnos:", err);
        setLoading(false);
      });
  }, [id_medico]);

  const handleAsistenciaChange = (id_turno_asignado, asistio) => {
    axios
      .put(`http://localhost:3000/api/turnos/actualizarAsistencia/${id_turno_asignado}`, { asistio })
      .then(() => {
        setTurnos((prevTurnos) =>
          prevTurnos.map((turno) =>
            turno.id_turno_asignado === id_turno_asignado
              ? { ...turno, asistio }
              : turno
          )
        );
      })
      .catch((err) => {
        console.error("Error actualizando asistencia:", err);
        alert("No se pudo actualizar la asistencia");
      });
  };

  const puedeModificarAsistencia = (fecha, hora) => {
    const fechaHoraTurno = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    const diferenciaHoras = (fechaHoraTurno - ahora) / (1000 * 60 * 60);
    return diferenciaHoras >= -1; 
  };

  if (loading) return <p className="cargando-turnos">Cargando turnos...</p>;

  if (turnos.length === 0) return <p className="no-turnos">No tenés turnos asignados para hoy.</p>;

  return (
    <div className="turnos-medico-container">
      <h2>Turnos del Día</h2>
      <table className="turnos-medico-tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Especialidad</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.id_turno_asignado}>
              <td>{turno.fecha_turno}</td>
              <td>{turno.hora_inicio} - {turno.hora_fin}</td>
              <td>{turno.paciente_nombre}</td>
              <td>{turno.especialidad}</td>
              <td>
                <select
                  className="asistencia-select"
                  value={
                    turno.asistio === true
                      ? "asistio"
                      : turno.asistio === false
                      ? "no_asistio"
                      : ""
                  }
                  onChange={(e) =>
                    handleAsistenciaChange(
                      turno.id_turno_asignado,
                      e.target.value === "asistio"
                    )
                  }
                  disabled={!puedeModificarAsistencia(turno.fecha_turno, turno.hora_inicio)}
                >
                  <option value="">-- Seleccionar --</option>
                  <option value="asistio">Asistió</option>
                  <option value="no_asistio">No asistió</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
