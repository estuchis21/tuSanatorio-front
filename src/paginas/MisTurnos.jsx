import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/MisTurnos.css";
import "../estilos/Paciente.css";
import { getUserById } from "../servicios/servicioAuth";
import { getTurnos } from "../servicios/servicioTurnos"; // Ahora usa el SP MisTurnos

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

  // Traer turnos (ahora el SP ya incluye obras sociales)
  useEffect(() => {
    if (!id_paciente) {
      setMensaje("No hay paciente logueado.");
      setLoading(false);
      return;
    }

    const cargarTurnos = async () => {
      try {
        const data = await getTurnos(id_paciente); // Debe llamar a /turnos/paciente/:id
        setTurnos(data.turnos || []);
        setMensaje((data.turnos || []).length === 0 ? "No tenés turnos asignados." : "");
      } catch (error) {
        console.error("Error al cargar turnos:", error);
        setMensaje("Error al cargar los turnos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    cargarTurnos();
  }, [id_paciente]);

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
        </div>
      ),
      icon: "info",
      confirmButtonText: "Cerrar",
    });
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
                  </tr>
                </thead>
                <tbody>
                  {turnos.map((turno) => {
                    const horaInicio = new Date(turno.hora_inicio).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
                    const horaFin = new Date(turno.hora_fin).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

                    return (
                      <tr
                        key={turno.id_turno_asignado}
                        onClick={() => mostrarTurno(turno)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{new Date(turno.fecha_turno).toLocaleDateString("es-AR")}</td>
                        <td>{horaInicio} - {horaFin}</td>
                        <td>{turno.especialidad}</td>
                        <td>{turno.obras_sociales || "No disponible"}</td>
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
