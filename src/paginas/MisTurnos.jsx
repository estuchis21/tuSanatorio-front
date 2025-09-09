import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/MisTurnos.css";
import "../estilos/Paciente.css";
import { getUserById } from "../servicios/servicioAuth";
import { getTurnos, obtenerObraSocial } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function MisTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [nombres, setNombres] = useState("");
  const [nombres_obras_sociales, setObras_sociales] = useState("");
  const id_paciente = localStorage.getItem("id_paciente");
  const id_usuario = localStorage.getItem("id_usuario");
  const id_obra_social = localStorage.getItem("id_obra_social");

  // Traer nombre usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      if (!id_usuario) return;
      try {
        const usuario = await getUserById(id_usuario);
        if (usuario) setNombres(usuario.nombres);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsuario();
  }, [id_usuario]);

  useEffect(() =>{
    const obras_socialess = async () =>{
      if(!id_obra_social) return;
      try{
        const obras = await obtenerObraSocial(id_obra_social);
        setObras_sociales(obras.nombres_obras_sociales);
      }
      catch(error){
        console.log(error);
      }

    }
  })

  // Traer turnos asignados
  useEffect(() => {
    if (!id_paciente) {
      setMensaje("No hay paciente logueado.");
      return;
    }

    const cargarTurnos = async () => {
      try {
        const data = await getTurnos(id_paciente);
        setTurnos(data.turnos || []);
        if (!data.turnos || data.turnos.length === 0) {
          setMensaje("No tenés turnos asignados.");
        } else {
          setMensaje("");
        }
      } catch (error) {
        console.error("Error al cargar turnos:", error);
        setMensaje("Error al cargar los turnos. Intenta nuevamente.");
      }
    };

    cargarTurnos();
  }, [id_paciente]);

  const mostrarTurno = (turno) => {
    MySwal.fire({
      title: "Detalle del Turno",
      html: (
        <div>
          <p><b>Especialidad:</b> {turno.especialidad}</p>
          <p><b>Médico:</b> {turno.medico}</p>
          <p>
            <b>Fecha:</b>{" "}
            {new Date(turno.fecha_turno).toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>
            <b>Horario:</b> {turno.hora_inicio.slice(11, 16)} - {turno.hora_fin.slice(11, 16)}
          </p>
          <p><b>Obra Social:</b> {turno.obra_social}</p>
        </div>
      ),
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div className="pagina-paciente">
      <div className="inicio">
        <h2>Bienvenido/a Paciente: <b>{nombres}</b></h2>
        <p>Aquí podrás ver tus turnos asignados.</p>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="mis-turnos-container">
        <h2>Mis Turnos Asignados</h2>
        <table className="mis-turnos-tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Especialidad</th>
              <th>Obra social</th>
            </tr>
          </thead>
          <tbody>
            {turnos.length === 0 ? (
              <tr>
                <td colSpan="4">No tenés turnos asignados.</td>
              </tr>
            ) : (
              turnos.map((turno) => (
                <tr key={turno.id_turno_asignado} onClick={() => mostrarTurno(turno)} style={{ cursor: "pointer" }}>
                  <td>{new Date(turno.fecha_turno).toLocaleDateString("es-AR")}</td>
                  <td>{turno.hora_inicio.slice(11, 16)} - {turno.hora_fin.slice(11, 16)}</td>
                  <td>{turno.especialidad}</td>
                  <td>{turno.obra_social}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
