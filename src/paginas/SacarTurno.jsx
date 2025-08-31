import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/SacarTurno.css";
import { asignarTurno, obtenerObraSocial, obtenerTurnosDisponibles } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function SacarTurno() {
  const location = useLocation();
  const navigate = useNavigate();

  const id_paciente = location.state?.id_paciente || localStorage.getItem("id_paciente");
  const id_obra_social = location.state?.id_obra_social || localStorage.getItem("id_obra_social");
  const { medico, especialidad } = location.state || {};

  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [idTurnoSeleccionado, setIdTurnoSeleccionado] = useState("");
  const [obrasSociales, setObrasSociales] = useState([]);
  const [idObraSeleccionada, setIdObraSeleccionada] = useState(id_obra_social || "");
  const [cargandoTurnos, setCargandoTurnos] = useState(true);

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

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const data = await obtenerObraSocial();
        setObrasSociales(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error al obtener obras sociales:", error);
      }
    };
    fetchObras();
  }, [id_obra_social]);

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

    if (!turnoSeleccionado) {
      return MySwal.fire({
        title: "Error",
        text: "Debes seleccionar un turno válido",
        icon: "error"
      });
    }

    if (!obraSeleccionada) {
      return MySwal.fire({
        title: "Error",
        text: "Debes seleccionar una obra social válida",
        icon: "error"
      });
    }

    const datosTurno = {
      id_paciente: Number(id_paciente),
      id_medico: Number(medico.id_medico),
      id_turno: Number(turnoSeleccionado.id_turno),
      id_obra_social: Number(obraSeleccionada.id_obra_social),
      fecha_turno: turnoSeleccionado.fecha_turno,
      horario: `${turnoSeleccionado.hora_inicio} - ${turnoSeleccionado.hora_fin}`
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
            <p><b>Fecha:</b> {turnoSeleccionado.fecha_turno}</p>
            <p><b>Horario:</b> {turnoSeleccionado.hora_inicio} - {turnoSeleccionado.hora_fin}</p>
            <p><b>Obra Social:</b> {obraSeleccionada.obra_social}</p>
          </div>
        ),
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      navigate('/MisTurnos');

    } catch (error) {
      console.error("Error al asignar turno al paciente: ", error);
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

      <form onSubmit={handleSubmit}>
        <label>
          Turnos disponibles:
          {cargandoTurnos ? (
            <p>Cargando turnos...</p>
          ) : (
            <select
              value={idTurnoSeleccionado}
              onChange={(e) => setIdTurnoSeleccionado(e.target.value)}
              required
            >
              <option value="">-- Seleccione --</option>
              {turnosDisponibles.map((t) => (
                <option key={t.id_turno} value={t.id_turno}>
                  {t.fecha_turno} | {t.hora_inicio} - {t.hora_fin}
                </option>
              ))}
            </select>
          )}
        </label>

        <label>
          Obra Social:
          <select
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
        </label>

        <button type="submit" disabled={!idTurnoSeleccionado || !idObraSeleccionada}>
          Confirmar Turno
        </button>
      </form>
    </div>
  );
}
