// src/paginas/MisTurnos.jsx
import React, { useEffect, useState } from "react";
import "../estilos/MisTurnos.css";
import axios from "axios";

export default function MisTurnos() {
  const [turnos, setTurnos] = useState([]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id_usuario = usuario?.id;

  useEffect(() => {
    if (!id_usuario) return;

    axios
      .get(`http://localhost:3000/api/turnos/historialPaciente/${id_usuario}`)
      .then((res) => setTurnos(res.data))
      .catch((err) => console.error("Error al cargar turnos", err));
  }, [id_usuario]);

  const getClaseEstado = (estado) => {
    switch ((estado || "").toLowerCase()) {
      case "confirmado":
        return "estado-confirmado";
      case "pendiente":
        return "estado-pendiente";
      case "cancelado":
        return "estado-cancelado";
      default:
        return "";
    }
  };

  const puedeModificarTurno = (fecha, hora) => {
    const fechaHoraTurno = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    const diffHoras = (fechaHoraTurno - ahora) / (1000 * 60 * 60);
    return diffHoras >= 12;
  };

  const handleCancelar = async (idTurnoAsignado) => {
    if (!window.confirm("¿Seguro que querés cancelar este turno?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/turnos/eliminarTurno/${idTurnoAsignado}`);
      alert("Turno cancelado con éxito");
      setTurnos((prev) => prev.filter(t => t.id_turno_asignado !== idTurnoAsignado));
    } catch (error) {
      console.error("Error al cancelar turno", error);
      alert("No se pudo cancelar el turno");
    }
  };

  const handleReprogramar = (idTurnoAsignado) => {
    alert("Función de reprogramar no implementada aún");
    // Aquí podrías redirigir a otra página o mostrar un modal para elegir nueva fecha/hora
  };

  return (
    <div className="mis-turnos-container">
      <h2>Mis Turnos</h2>
      <table className="mis-turnos-tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Especialidad</th>
            <th>Estado</th>
            <th>Acciones</th> {/* Nueva columna */}
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno, index) => (
            <tr key={index} className={getClaseEstado(turno.estado || "")}>
              <td>{turno.fecha_turno}</td>
              <td>{turno.hora_inicio} - {turno.hora_fin}</td>
              <td>{turno.especialidad}</td>
              <td>{turno.estado}</td>
              <td>
                {puedeModificarTurno(turno.fecha_turno, turno.hora_inicio) ? (
                  <>
                    <button
                      className="btn-accion cancelar"
                      onClick={() => handleCancelar(turno.id_turno_asignado)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn-accion reprogramar"
                      onClick={() => handleReprogramar(turno.id_turno_asignado)}
                    >
                      Reprogramar
                    </button>
                  </>
                ) : (
                  <span style={{ color: "gray", fontStyle: "italic" }}>
                    No disponible
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
