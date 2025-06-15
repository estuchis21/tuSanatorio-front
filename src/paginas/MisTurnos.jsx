// src/paginas/MisTurnos.jsx
import React from "react";
import "../estilos/MisTurnos.css";

export default function MisTurnos() {
  const turnos = [
    { fecha: "2025-06-12", hora: "10:00", especialidad: "Cardiología", estado: "Confirmado" },
    { fecha: "2025-06-20", hora: "14:30", especialidad: "Oftalmología", estado: "Pendiente" },
    { fecha: "2025-07-01", hora: "09:00", especialidad: "Clínica Médica", estado: "Cancelado" },
  ];

  const getClaseEstado = (estado) => {
    switch (estado.toLowerCase()) {
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
          <tr key={index} className={getClaseEstado(turno.estado)}>
            <td>{turno.fecha}</td>
            <td>{turno.hora}</td>
            <td>{turno.especialidad}</td>
            <td>{turno.estado}</td>
            <td>
              <button className="btn-accion cancelar" disabled={turno.estado === "Cancelado"}>
                Cancelar
              </button>
              <button className="btn-accion reprogramar">
                Reprogramar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
