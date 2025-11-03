import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getObrasPorMedico } from "../servicios/servicioAuth";
import "../estilos/ModificarTurno.css";
import { modificarTurno, obtenerTurnosDisponibles } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function ModificarTurno() {
  const location = useLocation();
  const navigate = useNavigate();
  const { turnoSeleccionado } = location.state;

  const id_paciente = Number(localStorage.getItem("id_paciente"));

  const [obrasSociales, setObrasSociales] = useState([]);
  const [obraElegida, setObraElegida] = useState("");
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [nuevoTurno, setNuevoTurno] = useState("");

  // 🔹 Función para formatear hora a HH:MM
  const formatearHora = (horaISO) => {
    const fecha = new Date(horaISO);
    if (isNaN(fecha)) return horaISO;
    return fecha.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  // Traer obras sociales del médico
  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await getObrasPorMedico(turnoSeleccionado.id_medico);
        const obras = response.obras_sociales || [];
        setObrasSociales(obras);

        // Setear obraElegida si coincide con alguna obra social válida
        const obraInicial = obras.find(o => o.id_obra_social === turnoSeleccionado.id_obra_social);
        setObraElegida(obraInicial ? obraInicial.id_obra_social : "");
      } catch (error) {
        console.error("Error al obtener obras sociales:", error);
        MySwal.fire("❌ Error al obtener obras sociales");
      }
    };
    fetchObras();
  }, [turnoSeleccionado.id_medico]);

  // Traer turnos disponibles del médico y especialidad
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await obtenerTurnosDisponibles(
          turnoSeleccionado.id_medico,
          turnoSeleccionado.id_especialidad
        );
        setTurnosDisponibles(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error al obtener turnos disponibles:", error);
        MySwal.fire("❌ Error al obtener turnos disponibles");
      }
    };
    fetchTurnos();
  }, [turnoSeleccionado.id_medico, turnoSeleccionado.id_especialidad]);

  const handleModificar = async () => {
    if (!nuevoTurno || !obraElegida) {
      return MySwal.fire("❌ Debes seleccionar un nuevo turno y una obra social");
    }

    const payload = {
      id_turno_asignado: Number(turnoSeleccionado.id_turno_asignado),
      id_nuevo_turno: Number(nuevoTurno),
      id_paciente: Number(id_paciente),
      id_obra_social: Number(obraElegida),
    };

    try {
      await modificarTurno(payload);
      MySwal.fire("✅ Turno modificado correctamente");
      navigate("/MisTurnos");
    } catch (error) {
      console.error("Error al modificar turno:", error);
      MySwal.fire("❌ Error al modificar turno");
    }
  };

  return (
    <div className="modificar-turno-page">
      <h2>Modificar Turno</h2>
      <div className="turno-info">
        <p><b>Médico:</b> {turnoSeleccionado.medico_nombre}</p>
        <p><b>Especialidad:</b> {turnoSeleccionado.especialidad}</p>
        <p><b>Fecha y hora actuales:</b> {formatearFecha(turnoSeleccionado.fecha_turno)} - {formatearHora(turnoSeleccionado.hora_inicio)}</p>
      </div>

      {/* Obras Sociales */}
      <div className="form-group">
        <label>Seleccionar nueva obra social:</label>
        <select value={obraElegida} onChange={(e) => setObraElegida(e.target.value)}>
          <option value="">-- Selecciona una obra social --</option>
          {obrasSociales.map((obra) => (
            <option key={obra.id_obra_social} value={obra.id_obra_social}>
              {obra.obra_social}
            </option>
          ))}
        </select>
      </div>

      {/* Turnos Disponibles */}
      <div className="form-group">
        <label>Seleccionar nuevo horario:</label>
        <select value={nuevoTurno} onChange={(e) => setNuevoTurno(e.target.value)}>
          <option value="">-- Selecciona un horario disponible --</option>
          {turnosDisponibles.map((t) => (
            <option key={t.id_turno} value={t.id_turno}>
              {formatearFecha(t.fecha_turno)} - {formatearHora(t.hora_inicio)} a {formatearHora(t.hora_fin)}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleModificar}>Modificar Turno</button>
    </div>
  );
}
