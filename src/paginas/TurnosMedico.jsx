// src/paginas/HistorialTurnosMedico.jsx
import { useEffect, useState } from "react";
import "../estilos/TurnosMedico.css";
import { historialTurnosMed } from "../servicios/servicioTurnos";

export default function HistorialTurnosMedico() {
  const [turnos, setTurnos] = useState([]);
  const idMedico = localStorage.getItem("id_medico");

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await historialTurnosMed(idMedico);
        console.log("Datos recibidos del backend:", data);
        setTurnos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener historial de turnos:", error);
        setTurnos([]);
      }
    };

    if (idMedico) fetchHistorial();
  }, [idMedico]);

  // 🔹 Formatear fecha (dd/mm/aaaa)
  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const d = new Date(fecha);
    if (isNaN(d)) return fecha;
    return d.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // 🔹 Formatear hora (solo HH:mm)
  const formatHora = (hora) => {
    if (!hora) return "";
    // Si viene con "T" (ISO)
    if (hora.includes("T")) {
      return hora.split("T")[1].substring(0, 5);
    }
    // Si viene como "08:00:00"
    const [h, m] = hora.split(":");
    return `${h}:${m}`;
  };

  return (
    <div className="turnos-medico-container">
      <h2>Historial de Turnos</h2>
      <table className="turnos-medico-tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Paciente</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length === 0 ? (
            <tr>
              <td colSpan="5">No hay turnos históricos para mostrar</td>
            </tr>
          ) : (
            turnos.map((turno, index) => (
              <tr key={index}>
                <td>{formatFecha(turno.fecha_turno)}</td>
                <td>{formatHora(turno.hora_inicio)}</td>
                <td>{formatHora(turno.hora_fin)}</td>
                <td>{turno.Paciente}</td>
                <td>{turno.Especialidad}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
