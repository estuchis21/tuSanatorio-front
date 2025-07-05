// src/paginas/MisTurnos.jsx
import React, { useEffect, useState } from "react";
import "../estilos/MisTurnos.css";
import axios from "axios";

export default function MisTurnos() {
  const [turnos, setTurnos] = useState([]);

  const puedeModificarTurno = (fecha, hora) => {
    // const fechaHoraTurno = new Date(`${fecha}T${hora}`);
    // const ahora = new Date();
    // const diffHoras = (fechaHoraTurno - ahora) / (1000 * 60 * 60);
    // return diffHoras >= 12;
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
            <th>Acciones</th>
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
