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
        setTurnos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener historial de turnos:", error);
        setTurnos([]);
      }
    };

    if (idMedico) fetchHistorial();
  }, [idMedico]);

  return (
    <div className="turnos-medico-container">
      <h2>Historial de Turnos</h2>
      <table className="turnos-medico-tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Paciente</th>
            <th>Apellido</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length === 0 ? (
            <tr>
              <td colSpan="4">No hay turnos históricos para mostrar</td>
            </tr>
          ) : (
            turnos.map((turno, index) => (
              <tr key={index}>
                <td>{new Date(turno["Fecha del Turno"]).toLocaleDateString()}</td>
                <td>{turno["Nombres"]}</td>
                <td>{turno["apellido"]}</td>
                <td>{turno["nombre"]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
