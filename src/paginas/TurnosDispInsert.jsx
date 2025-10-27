import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getRangos, insertTurnosDisp } from "../servicios/servicioTurnos";
import '../estilos/TurnosDispInsert.css';

const MySwal = withReactContent(Swal);

export default function TurnosDispInsert() {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [rangos, setRangos] = useState([]);
  const [idRangoSeleccionado, setIdRangoSeleccionado] = useState("");

  const idMedico = localStorage.getItem("id_medico");

  const fechaMinima = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    const fetchRangos = async () => {
      try {
        const data = await getRangos();
        setRangos(data);
      } catch (error) {
        console.error("Error al obtener rangos:", error);
        MySwal.fire({
          title: "Error",
          text: "No se pudieron cargar los rangos",
          icon: "error"
        });
      }
    };
    fetchRangos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idMedico || !fecha || !idRangoSeleccionado) {
      return MySwal.fire({
        title: "Error",
        text: "Faltan datos: médico, fecha o rango.",
        icon: "error",
      });
    }

    try {
      await insertTurnosDisp({
        id_medico: idMedico,
        id_rango: idRangoSeleccionado,
        fecha_turno: fecha
      });

      MySwal.fire({
        title: "✅ Éxito",
        text: "Turno disponible ingresado correctamente",
        icon: "success",
      });

      // Limpiar formulario
      setFecha("");
      setIdRangoSeleccionado("");

    } catch (error) {
      const mensaje = error.response?.data?.error || "Ocurrió un error desconocido";
      MySwal.fire({
        title: "Error",
        text: mensaje,
        icon: "error",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Turno Disponible</h2>

      <form onSubmit={handleSubmit} className="form-turnos">
        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            min={fechaMinima} // solo fechas desde hoy
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Rango horario:</label>
          <select
            value={idRangoSeleccionado}
            onChange={(e) => setIdRangoSeleccionado(e.target.value)}
            required
          >
            <option value="">-- Seleccionar rango --</option>
            {rangos.map((r) => (
              <option key={r.id_rango} value={r.id_rango}>
                {`${r.hora_inicio} - ${r.hora_fin}`}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Guardar Turno</button>
      </form>
    </div>
  );
}
