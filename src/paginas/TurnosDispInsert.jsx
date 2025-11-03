import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/TurnosDispInsert.css";
import { getRangos, insertTurnosDisp } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function TurnosDispInsert() {
  const [fecha, setFecha] = useState("");
  const [rangos, setRangos] = useState([]);
  const [idRangoSeleccionado, setIdRangoSeleccionado] = useState("");
  const [loading, setLoading] = useState(true);

  const idMedico = localStorage.getItem("id_medico");
  const fechaMinima = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchRangos = async () => {
      setLoading(true);
      try {
        const data = await getRangos();
        setRangos(data);
      } catch (error) {
        console.error(error);
        MySwal.fire({
          title: "Error",
          text: "No se pudieron cargar los rangos",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRangos();
  }, []);

  // 🔹 Formatear fecha (dd/mm/aaaa)
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "";
    const [year, month, day] = fechaISO.split("-");
    return `${day}/${month}/${year}`;
  };

  // 🔹 Formatear hora desde string ISO o SQL (devuelve "HH:mm")
  const formatearHora = (hora) => {
    if (!hora) return "";
    // Si tiene formato ISO tipo "1970-01-01T08:00:00.000Z"
    if (hora.includes("T")) {
      const horaLimpia = hora.split("T")[1].substring(0, 5);
      return horaLimpia;
    }
    // Si viene como "08:00:00"
    const [h, m] = hora.split(":");
    return `${h}:${m}`;
  };

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
        id_medico: Number(idMedico),
        id_rango: Number(idRangoSeleccionado),
        fecha_turno: fecha,
      });

      MySwal.fire({
        title: "✅ Éxito",
        html: `
          <p>Turno disponible ingresado correctamente.</p>
          <p><strong>Fecha:</strong> ${formatearFecha(fecha)}</p>
        `,
        icon: "success",
      });

      setFecha("");
      setIdRangoSeleccionado("");
    } catch (error) {
      if (error.response?.status === 409) {
        MySwal.fire({
          title: "Duplicado",
          text:
            error.response.data.error ||
            "Ya existe un turno para ese rango y fecha",
          icon: "warning",
        });
      } else {
        MySwal.fire({
          title: "Error",
          text:
            error.response?.data?.error ||
            "Ocurrió un error desconocido",
          icon: "error",
        });
      }
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
            min={fechaMinima}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
          {fecha && (
            <p className="fecha-formateada">
              Fecha seleccionada: <strong>{formatearFecha(fecha)}</strong>
            </p>
          )}
        </div>

        <div className="form-group">
          <label>Rango horario:</label>
          {loading ? (
            <div className="spinner">Cargando rangos...</div>
          ) : (
            <div className="rangos-grid">
              {rangos.map((r) => (
                <button
                  key={r.id_rango}
                  type="button"
                  className={`rango-btn ${
                    idRangoSeleccionado == r.id_rango ? "selected" : ""
                  }`}
                  onClick={() => setIdRangoSeleccionado(r.id_rango)}
                >
                  {`${formatearHora(r.hora_inicio)} a ${formatearHora(
                    r.hora_fin
                  )}`}
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="submit">Guardar Turno</button>
      </form>
    </div>
  );
}
