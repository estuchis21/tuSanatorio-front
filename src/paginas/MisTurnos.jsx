import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/MisTurnos.css";
import { getUserById } from "../servicios/servicioAuth";
import { deleteTurno, getTurnos, historialTurnosPac } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function MisTurnos() {
  const navigate = useNavigate();

  const [turnosProximos, setTurnosProximos] = useState([]);
  const [turnosHistoricos, setTurnosHistoricos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [nombres, setNombres] = useState("");
  const [loading, setLoading] = useState(true);

  const id_paciente = Number(localStorage.getItem("id_paciente"));
  const id_usuario = Number(localStorage.getItem("id_usuario"));

  // Formateo de fecha y hora
  const formatFecha = (fecha) => fecha ? new Date(fecha).toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
  const formatHora = (hora) => hora ? new Date(hora).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) : "";

  // Traer datos de usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      if (!id_usuario) return;
      try {
        const usuario = await getUserById(id_usuario);
        if (usuario) setNombres(usuario.nombres || "");
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };
    fetchUsuario();
  }, [id_usuario]);

  // Traer turnos futuros e históricos
  useEffect(() => {
    const cargarTurnos = async () => {
      if (!id_paciente) {
        setMensaje("No hay paciente logueado.");
        setLoading(false);
        return;
      }

      try {
        const futuros = await getTurnos(id_paciente);
        setTurnosProximos(Array.isArray(futuros.turnos) ? futuros.turnos : []);

        const historicos = await historialTurnosPac(id_paciente);
        setTurnosHistoricos(Array.isArray(historicos.historial) ? historicos.historial : []);
      } catch (error) {
        console.error("Error al cargar turnos:", error);
        setMensaje("Error al cargar turnos.");
      } finally {
        setLoading(false);
      }
    };
    cargarTurnos();
  }, [id_paciente]);

  // Mostrar detalle de turno
  const mostrarTurno = (turno) => {
    MySwal.fire({
      title: "Detalle del Turno",
      html: (
        <div>
          <p><b>Médico:</b> {turno.nombre_medico || turno.nombres} {turno.apellido_medico || turno.apellido}</p>
          <p><b>Especialidad:</b> {turno.especialidad || "No disponible"}</p>
          <p><b>Fecha:</b> {formatFecha(turno.fecha_turno)}</p>
          <p><b>Horario:</b> {formatHora(turno.hora_inicio)} - {formatHora(turno.hora_fin)}</p>
          <p><b>Obras Sociales:</b> {turno.obras_sociales 
            ? turno.obras_sociales.split(',').map((obra, index) => (
                <span key={index} className="obra-social">{obra.trim()}</span>
              )) 
            : "No disponible"
          }</p>
        </div>
      ),
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  // Eliminar turno
  const handleDeleteTurno = async (turno) => {
    const result = await MySwal.fire({
      title: "¿Desea eliminar su turno?",
      html: (
        <div>
          <p><b>Médico:</b> {turno.nombre_medico || turno.nombres} {turno.apellido_medico || turno.apellido}</p>
          <p><b>Especialidad:</b> {turno.especialidad || "No disponible"}</p>
          <p><b>Fecha:</b> {formatFecha(turno.fecha_turno)}</p>
          <p><b>Horario:</b> {formatHora(turno.hora_inicio)} - {formatHora(turno.hora_fin)}</p>
        </div>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteTurno({ id_paciente, id_turno_asignado: turno.id_turno_asignado });
        setTurnosProximos(prev => prev.filter(t => t.id_turno_asignado !== turno.id_turno_asignado));
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

  // Modificar turno
  const handleModificarTurno = (turno) => {
    navigate("/modificarTurno", {
      state: { turnoSeleccionado: turno }
    });
  };

  return (
    <div className="pagina-paciente">
      <div className="inicio">
        <h2>Bienvenido/a <b>{nombres}</b></h2>
        <p>Aquí podrás ver tus turnos próximos y tus turnos históricos.</p>
      </div>

      {loading && <p className="mensaje">Cargando turnos...</p>}
      {!loading && mensaje && <p className="mensaje">{mensaje}</p>}

      {turnosProximos.length > 0 && (
        <div className="turnos-seccion">
          <h2>Próximos Turnos</h2>
          <div className="turnos-grid">
            {turnosProximos.map(turno => (
              <div key={turno.id_turno_asignado} className="turno-card">
                <p><b>Médico:</b> {turno.nombre_medico || turno.nombres} {turno.apellido_medico || turno.apellido}</p>
                <p><b>Especialidad:</b> {turno.especialidad || "No disponible"}</p>
                <p><b>Fecha:</b> {formatFecha(turno.fecha_turno)}</p>
                <p><b>Horario:</b> {formatHora(turno.hora_inicio)} - {formatHora(turno.hora_fin)}</p>
                <div className="turno-actions">
                  <button onClick={() => mostrarTurno(turno)}>Ver</button>
                  <button onClick={() => handleModificarTurno(turno)}>Modificar</button>
                  <button onClick={() => handleDeleteTurno(turno)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {turnosHistoricos.length > 0 && (
        <div className="turnos-seccion" style={{ marginTop: "40px" }}>
          <h2>Turnos Históricos</h2>
          <div className="turnos-grid">
            {turnosHistoricos.map(turno => (
              <div key={turno.id_turno_historico} className="turno-card">
                <p><b>Médico:</b> {turno.medico_nombre || turno.nombres} {turno.medico_apellido || turno.apellido}</p>
                <p><b>Especialidad:</b> {turno.especialidad || "No disponible"}</p>
                <p><b>Fecha:</b> {formatFecha(turno.fecha_turno)}</p>
                <p><b>Horario:</b> {formatHora(turno.hora_inicio)} - {formatHora(turno.hora_fin)}</p>
                <div className="turno-actions">
                  <button onClick={() => mostrarTurno(turno)}>Ver</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
