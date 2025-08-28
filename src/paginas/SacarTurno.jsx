import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../estilos/SacarTurno.css";
import { obtenerObraSocial, obtenerTurnosDisponibles } from "../servicios/servicioTurnos";

export default function SacarTurno() {
  const location = useLocation();
  const { medico, especialidad, id_paciente, id_obra_social } = location.state || {};
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const [idTurnoSeleccionado, setIdTurnoSeleccionado] = useState("");
  const [obrasSociales, setObrasSociales] = useState([]);
  const [idObraSeleccionada, setIdObraSeleccionada] = useState(id_obra_social || "");
  const [cargandoTurnos, setCargandoTurnos] = useState(true);

  // Cargar turnos disponibles
  useEffect(() => {
    const fetchTurnos = async () => {
      if (!medico) return;
      setCargandoTurnos(true);
      try {
        const data = await obtenerTurnosDisponibles(medico.id_medico);
        setTurnosDisponibles(data);
      } catch (error) {
        console.error("Error al obtener turnos disponibles:", error);
      } finally {
        setCargandoTurnos(false);
      }
    };
    fetchTurnos();
  }, [medico]);

  // Cargar obras sociales del paciente
  useEffect(() => {
    const fetchObras = async () => {
      if (!id_obra_social) return;
      try {
        // Si devolverá varias opciones, manejar como array
        const data = await obtenerObraSocial(id_obra_social);
        const lista = Array.isArray(data) ? data : [data];
        setObrasSociales(lista);
      } catch (error) {
        console.error("Error al obtener obra social:", error);
      }
    };
    fetchObras();
  }, [id_obra_social]);

  if (!medico || !especialidad) {
    return <p>No hay datos del turno. Volvé a seleccionar un médico.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const turnoSeleccionado = turnosDisponibles.find(
      (t) => t.id_turno.toString() === idTurnoSeleccionado
    );

    const obraSeleccionada = obrasSociales.find(
      (o) => o.id_obra_social.toString() === idObraSeleccionada
    );

    if (!turnoSeleccionado) {
      alert("Debes seleccionar un turno válido");
      return;
    }

    if (!obraSeleccionada) {
      alert("Debes seleccionar una obra social válida");
      return;
    }

    console.log({
      medico,
      especialidad,
      id_turno: turnoSeleccionado.id_turno,
      fecha: turnoSeleccionado.fecha_turno,
      horario: `${turnoSeleccionado.hora_inicio} - ${turnoSeleccionado.hora_fin}`,
      obraSocial: obraSeleccionada,
      id_paciente
    });

    // Aquí va la llamada a la API para reservar el turno
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
