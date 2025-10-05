import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/MisTurnos.css";
import "../estilos/Paciente.css";
import { getUserById } from "../servicios/servicioAuth";
import { deleteTurno, historialTurnosPac } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function MisTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [nombres, setNombres] = useState("");
  const [loading, setLoading] = useState(true);

  const id_paciente = Number(localStorage.getItem("id_paciente"));
  const id_usuario = Number(localStorage.getItem("id_usuario"));

  // Traer nombre del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      if (!id_usuario) return;
      try {
        const usuario = await getUserById(id_usuario);
        if (usuario) setNombres(usuario.nombres);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };
    fetchUsuario();
  }, [id_usuario]);

  // Traer turnos del paciente
  useEffect(() => {
    const cargarTurnos = async () => {
      if (!id_paciente) {
        setMensaje("No hay paciente logueado.");
        setLoading(false);
        return;
      }

      try {
        const data = await historialTurnosPac(id_paciente);
        // Corregido: extraemos el array de turnos del objeto
        setTurnos(data.historial || []);
        console.log(data);

        if (!data.historial || data.historial.length === 0) {
          setMensaje("No tenés turnos pasados.");
        } else {
          setMensaje("");
        }
      } catch (error) {
        console.error("Error al cargar turnos:", error);
        setMensaje("Error al cargar turnos.");
      } finally {
        setLoading(false);
      }
    };
    cargarTurnos();
  }, [id_paciente]);

  // Mostrar detalle del turno en modal
  const mostrarTurno = (turno) => {
    const horaInicio = new Date(turno.hora_inicio).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    const horaFin = new Date(turno.hora_fin).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

    MySwal.fire({
      title: "Detalle del Turno",
      html: (
        <div>
          <p><b>Médico:</b> {turno.nombres} {turno.apellido}</p>
          <p><b>Especialidad:</b> {turno.especialidad}</p>
          <p><b>Fecha:</b> {new Date(turno.fecha_turno).toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</p>
          <p><b>Horario:</b> {horaInicio} - {horaFin}</p>
          <p><b>Obras Sociales:</b> {turno.obras_sociales || "No disponible"}</p>
          <p><b>ID Turno:</b> {turno.id_turno_asignado}</p>
        </div>
      ),
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  // Eliminar turno
const handleDeleteTurno = async (turno) => {
  // Obtener horas formateadas
  const horaInicio = new Date(turno.hora_inicio).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const horaFin = new Date(turno.hora_fin).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Confirmación con SweetAlert2
  const result = await MySwal.fire({
    title: "¿Desea eliminar su turno?",
    html: (
      <div>
        <p><b>Médico:</b> {turno.nombres} {turno.apellido}</p>
        <p><b>Especialidad:</b> {turno.especialidad}</p>
        <p><b>Fecha:</b> {new Date(turno.fecha_turno).toLocaleDateString("es-AR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}</p>
        <p><b>Horario:</b> {horaInicio} - {horaFin}</p>
      </div>
    ),
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  });

  // Si confirma eliminación
  if (result.isConfirmed) {
    try {
      await deleteTurno({ id_paciente, id_turno_asignado: turno.id_turno_asignado });
      setTurnos(prev => prev.filter(t => t.id_turno_asignado !== turno.id_turno_asignado));
      MySwal.fire({ icon: "success", title: "Turno eliminado", timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.error("Error al eliminar turno:", error);
      MySwal.fire({
        icon: "error",
        title: "No se pudo eliminar el turno",
        text: error.response?.data?.error || "Intenta nuevamente",
      });
    }
  }
};


  return (
    <div className="pagina-paciente">
      <div className="inicio">
        <h2>Bienvenido/a <b>{nombres}</b></h2>
        <p>Aquí podrás ver tus turnos asignados y las obras sociales de cada médico.</p>
      </div>

      {loading ? (
        <p className="mensaje">Cargando turnos...</p>
      ) : (
        <>
          {mensaje && <p className="mensaje">{mensaje}</p>}

          {/* Todos los turnos */}
          {turnos.length > 0 && (
            <div className="turnos-seccion">
              <h2>Turnos</h2>
              <div className="turnos-grid">
                {turnos.map(turno => {
                  const horaInicio = new Date(turno.hora_inicio).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
                  const horaFin = new Date(turno.hora_fin).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
                  return (
                    <div key={turno.id_turno_asignado} className="turno-card">
                      <p><b>Médico:</b> {turno.nombres} {turno.apellido}</p>
                      <p><b>Especialidad:</b> {turno.especialidad}</p>
                      <p><b>Fecha:</b> {new Date(turno.fecha_turno).toLocaleDateString("es-AR")}</p>
                      <p><b>Horario:</b> {horaInicio} - {horaFin}</p>
                      <p><b>Obras Sociales:</b> {turno.obras_sociales || "No disponible"}</p>
                      <div className="turno-actions">
                        <button onClick={() => mostrarTurno(turno)}>Ver</button>
                        <button onClick={() => handleDeleteTurno(turno)}>Eliminar</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
