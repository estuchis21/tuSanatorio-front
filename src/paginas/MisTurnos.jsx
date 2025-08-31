// src/paginas/MisTurnos.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/MisTurnos.css";
import "../estilos/Paciente.css";
import { getTurnos } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

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
      setTurnos(data.turnos);
      setMensaje("");
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const mostrarTurno = (turno) => {
    MySwal.fire({
      title: 'Detalle del Turno',
      html: (
        <div>
          <p><b>Especialidad:</b> {turno.especialidad}</p>
          <p><b>Médico:</b> {turno.medico}</p>
          <p><b>Fecha:</b> {new Date(turno.fecha_turno).toLocaleDateString()}</p>
          <p><b>Horario:</b> {turno.hora_inicio.slice(11,16)} - {turno.hora_fin.slice(11,16)}</p>
          <p><b>Obra Social:</b> {turno.obra_social}</p>
        </div>
      ),
      icon: 'info',
      confirmButtonText: 'Cerrar'
    });
  };

  return (
    <div className="pagina-paciente">
      <div className="inicio">
        <h2>Bienvenido/a Paciente</h2>
        <p>Aquí podrás ver tus turnos.</p>
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
            </tr>
          </thead>
          <tbody>
            {turnos.length === 0 ? (
              <tr>
                <td colSpan="3">No tenés turnos cargados.</td>
              </tr>
            ) : (
              turnos.map((turno) => (
                <tr key={turno.id_turno_asignado} onClick={() => mostrarTurno(turno)} style={{ cursor: 'pointer' }}>
                  <td>{new Date(turno.fecha_turno).toLocaleDateString()}</td>
                  <td>{turno.hora_inicio.slice(11,16)} - {turno.hora_fin.slice(11,16)}</td>
                  <td>{turno.especialidad}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p style={{ marginTop: '10px', fontStyle: 'italic' }}>Hacé clic en un turno para ver los detalles</p>
      </div>
    </div>
  );
}
