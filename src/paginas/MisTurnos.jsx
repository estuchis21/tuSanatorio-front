// src/paginas/MisTurnos.jsx
import { useEffect, useState } from "react";
import "../estilos/MisTurnos.css";
import "../estilos/Paciente.css";
import { deleteTurno, getTurnos } from "../servicios/servicioTurnos";

export default function MisTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const id_paciente = localStorage.getItem("id_paciente");

  useEffect(() => {
    if (!id_paciente) {
      setMensaje("No hay paciente logueado.");
      return;
    }
    cargarTurnos();
  }, [id_paciente]);

  const cargarTurnos = async () => {
    try {
      const data = await getTurnos(id_paciente);
      if (!data.turnos || data.turnos.length === 0) {
        setMensaje("No tenés turnos cargados.");
        setTurnos([]);
        return;
      }
      setTurnos(data.turnos); // Ojo acá: data.turnos es el array de turnos
      setMensaje("");
    } catch (error) {
      setMensaje(error.message);
    }
  };
  const puedeCancelarTurno = (fecha, hora) => {
    const fechaHoraTurno = new Date(fecha);
    // En tu respuesta hora_inicio y hora_fin vienen en formato de fecha con tiempo 1970-01-01T...
    // Pero podés tomar solo la hora para calcular bien, o mejor usar fecha + hora.
    // Para simplificar asumimos la fecha completa en fechaHoraTurno.

    const ahora = new Date();
    const diffHoras = (fechaHoraTurno - ahora) / (1000 * 60 * 60);
    return diffHoras >= 12;
  };

  const handleCancelar = async (id_turno_asignado) => {
    if (!window.confirm("¿Seguro que querés cancelar este turno?")) return;

    try {
      await deleteTurno({ id_paciente, id_turno_asignado });
      setMensaje("Turno cancelado con éxito.");
      cargarTurnos();
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="pagina-paciente">
      <div className="inicio">
        <h2>Bienvenido/a Paciente</h2>
        <p>Aquí podrás ver, sacar o modificar tus turnos.</p>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="mis-turnos-container">
        <h2>Mis Turnos</h2>
        <table className="mis-turnos-tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Especialidad</th>
              {/* Eliminamos las columnas Estado y Acciones porque no hay */}
            </tr>
          </thead>
          <tbody>
            {turnos.length === 0 ? (
              <tr>
                <td colSpan="3">No tenés turnos cargados.</td>
              </tr>
            ) : (
              turnos.map((turno) => (
                <tr key={turno.id_turno_asignado}>
                  <td>{new Date(turno.fecha_turno).toLocaleDateString()}</td>
                  <td>
                    {turno.hora_inicio.slice(11, 16)} - {turno.hora_fin.slice(11, 16)}
                  </td>
                  <td>{turno.especialidad}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
