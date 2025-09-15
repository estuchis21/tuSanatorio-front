import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/MisTurnos.css";
import "../estilos/Paciente.css";
import { getUserById } from "../servicios/servicioAuth";
import { deleteTurno, getTurnos } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function MisTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [nombres, setNombres] = useState("");
  const [loading, setLoading] = useState(true);
  const id_paciente = localStorage.getItem("id_paciente");
  const id_usuario = localStorage.getItem("id_usuario");

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
        const data = await getTurnos(id_paciente); // Devuelve array de turnos con id_obras_sociales
        setTurnos(data.turnos || []);
        setMensaje((data.turnos || []).length === 0 ? "No tenés turnos asignados." : "");
      } catch (error) {
        console.error("Error al cargar turnos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarTurnos();
  }, [id_paciente]);

  // Mostrar detalle del turno
  const mostrarTurno = (turno) => {
    const horaInicio = new Date(turno.hora_inicio).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    const horaFin = new Date(turno.hora_fin).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

    MySwal.fire({
      title: "Detalle del Turno",
      html: (
        <div>
          <p><b>Especialidad:</b> {turno.especialidad}</p>
          <p><b>Fecha:</b>{" "}
            {new Date(turno.fecha_turno).toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p><b>Horario:</b> {horaInicio} - {horaFin}</p>
          <p><b>Obras Sociales del Médico:</b> {turno.obras_sociales || "No disponible"}</p>
          <p><b>IDs Obras Sociales:</b> {turno.id_obras_sociales || "No disponible"}</p>
          <p><b>ID Turno:</b> {turno.id_turno_asignado}</p>
        </div>
      ),
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  const handleDeleteTurno = async (turno) => {
    const id_paciente = localStorage.getItem("id_paciente");
    const id_turno_asignado = turno.id_turno_asignado;

    try {
      await deleteTurno({ id_paciente, id_turno_asignado });
      setTurnos((prev) => prev.filter(t => t.id_turno_asignado !== id_turno_asignado));
      MySwal.fire({
        icon: "success",
        title: "Turno eliminado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
      MySwal.fire({
        icon: "error",
        title: "No se pudo eliminar el turno",
        text: error.response?.data?.error || "Intenta nuevamente",
      });
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

          {turnos.length > 0 && (
            <div className="mis-turnos-container">
              <h2>Mis Turnos Asignados</h2>
              <table className="mis-turnos-tabla">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Especialidad</th>
                    <th>Obras Sociales del Médico</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {turnos.map((turno) => {
                    const horaInicio = new Date(turno.hora_inicio).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
                    const horaFin = new Date(turno.hora_fin).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

                    return (
                      <tr key={turno.id_turno_asignado}>
                        <td>{new Date(turno.fecha_turno).toLocaleDateString("es-AR")}</td>
                        <td>{horaInicio} - {horaFin}</td>
                        <td>{turno.especialidad}</td>
                        <td>{turno.obras_sociales || "No disponible"}</td>
                        <td>
                          <button onClick={() => mostrarTurno(turno)}>Ver</button>
                          <button onClick={() => handleDeleteTurno(turno)}>Eliminar</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
