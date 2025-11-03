import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/SacarTurno.css";
import { getObrasPorMedico } from "../servicios/servicioAuth";
import { asignarTurno, obtenerTurnosDisponibles } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function SacarTurno() {
  const location = useLocation();
  const navigate = useNavigate();

  const id_paciente = location.state?.id_paciente || localStorage.getItem("id_paciente");
  const { medico, especialidad } = location.state || {};
  const id = medico?.id_medico;

  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [idTurnoSeleccionado, setIdTurnoSeleccionado] = useState("");
  const [obrasSociales, setObrasSociales] = useState([]);
  const [idObraSeleccionada, setIdObraSeleccionada] = useState("");
  const [cargandoTurnos, setCargandoTurnos] = useState(true);
  const [cargandoObras, setCargandoObras] = useState(true);

  // 🔹 Función para formatear fecha a dd/mm/aa
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    if (isNaN(fecha)) return fechaISO; // Por si no es una fecha válida
    return fecha.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  // 🔹 Función para formatear hora a HH:MM
  const formatearHora = (horaISO) => {
    const fecha = new Date(horaISO);
    if (isNaN(fecha)) return horaISO;
    return fecha.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Cargar turnos disponibles
  useEffect(() => {
    const fetchTurnos = async () => {
      if (!medico || !especialidad) return;
      setCargandoTurnos(true);
      try {
        const data = await obtenerTurnosDisponibles(
          medico.id_medico,
          especialidad.id_especialidad
        );
        setTurnosDisponibles(data);
      } catch (error) {
        console.error("Error al obtener turnos disponibles:", error);
      } finally {
        setCargandoTurnos(false);
      }
    };
    fetchTurnos();
  }, [medico, especialidad]);

  // Cargar obras sociales del médico
  useEffect(() => {
    const fetchObras = async () => {
      if (!id) return;
      setCargandoObras(true);
      try {
        const data = await getObrasPorMedico(id);
        setObrasSociales(Array.isArray(data.obras_sociales) ? data.obras_sociales : []);
      } catch (error) {
        console.error("Error al obtener obras sociales:", error);
      } finally {
        setCargandoObras(false);
      }
    };
    fetchObras();
  }, [id]);

  if (!medico || !especialidad || !id_paciente) {
    return <p>No hay datos del turno o paciente. Volvé a seleccionar un médico.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const turnoSeleccionado = turnosDisponibles.find(
      (t) => t.id_turno.toString() === idTurnoSeleccionado
    );
    const obraSeleccionada = obrasSociales.find(
      (o) => o.id_obra_social.toString() === idObraSeleccionada
    );

    if (!turnoSeleccionado || !obraSeleccionada) {
      return MySwal.fire({
        title: "Error",
        text: "Debes seleccionar un turno y una obra social válidos",
        icon: "error",
      });
    }

    const datosTurno = {
      id_paciente: Number(id_paciente),
      id_medico: Number(medico.id_medico),
      id_turno: Number(turnoSeleccionado.id_turno),
      id_obra_social: Number(obraSeleccionada.id_obra_social),
      fecha_turno: formatearFecha(turnoSeleccionado.fecha_turno),
      horario: `${formatearHora(turnoSeleccionado.hora_inicio)} - ${formatearHora(turnoSeleccionado.hora_fin)}`
    };

    try {
      await asignarTurno(datosTurno);

      MySwal.fire({
        title: 'Turno asignado ✅',
        html: (
          <div>
            <p><b>Paciente:</b> {localStorage.getItem("nombre_paciente") || "Tú"}</p>
            <p><b>Especialidad:</b> {especialidad.nombre}</p>
            <p><b>Médico:</b> {medico.nombres} {medico.apellido}</p>
            <p><b>Fecha:</b> {datosTurno.fecha_turno}</p>
            <p><b>Horario:</b> {datosTurno.horario}</p>
            <p><b>Obra Social:</b> {obraSeleccionada.obra_social}</p>
          </div>
        ),
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      navigate('/MisTurnos');
    } catch (error) {
      console.error("Error al asignar turno:", error);
      MySwal.fire({
        title: "Error",
        text: "No se pudo asignar el turno ❌",
        icon: "error"
      });
    }
  };

  return (
    <div className="sacar-turno-contenedor">
      <h2>Confirmar Turno</h2>
      <p><b>Especialidad:</b> {especialidad.nombre}</p>
      <p><b>Médico:</b> {medico.nombres} {medico.apellido}</p>

      <form onSubmit={handleSubmit} className="sacar-turno-formulario">
        <div className="campo-formulario">
          <label htmlFor="turno">Turnos disponibles:</label>
          {cargandoTurnos ? (
            <p>Cargando turnos...</p>
          ) : (
            <select
              id="turno"
              value={idTurnoSeleccionado}
              onChange={(e) => setIdTurnoSeleccionado(e.target.value)}
              required
            >
              <option value="">-- Seleccione --</option>
              {turnosDisponibles.map((t) => (
                <option key={t.id_turno} value={t.id_turno}>
                  {formatearFecha(t.fecha_turno)} | {formatearHora(t.hora_inicio)} - {formatearHora(t.hora_fin)}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="campo-formulario">
          <label htmlFor="obra">Obra Social:</label>
          {cargandoObras ? (
            <p>Cargando obras sociales...</p>
          ) : (
            <select
              id="obra"
              value={idObraSeleccionada}
              onChange={(e) => setIdObraSeleccionada(e.target.value)}
              required
            >
              <option value="">-- Seleccione --</option>
              {obrasSociales.map((o) => (
                <option key={o.id_obra_social} value={o.id_obra_social}>
                  {o.obra_social}
                </option>
              ))}
            </select>
          )}
        </div>

        <button type="submit" disabled={!idTurnoSeleccionado || !idObraSeleccionada}>
          Confirmar Turno
        </button>

      </form>

    </div>
  );
}
