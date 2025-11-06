import { useEffect, useState } from "react";
import "../estilos/HistoriaClinica.css";
import { getHistoriasPorPaciente } from "../servicios/histClinicas";

export default function HistoriasClinicasPaciente() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const idPaciente = Number(localStorage.getItem("id_paciente"));

  // Cargar historias al montar el componente
  useEffect(() => {
    const cargarHistorias = async () => {
      try {
        const data = await getHistoriasPorPaciente(idPaciente);
        setHistorias(data.historias || []);
      } catch (err) {
        setError(err.mensaje || "Error al cargar las historias clínicas.");
      } finally {
        setLoading(false);
      }
    };
    cargarHistorias();
  }, [idPaciente]);

  if (loading) return <p className="historia-loading">Cargando historias...</p>;
  if (error) return <p className="historia-error">{error}</p>;
  if (!historias.length)
    return <p className="historia-vacia">No hay historias clínicas disponibles.</p>;

  return (
    <div className="historia-container">
      {historias.map((historia, index) => (
        <div className="historia-card" key={index}>
          <div className="info-paciente">
            <h3>Paciente</h3>
            <p>
              <strong>Nombre:</strong> {historia.nombres || "—"}{" "}
              {historia.apellido || ""}
            </p>
          </div>

          <div className="historia-clinica">
            <h3>Historia Clínica</h3>
            <p>{historia.historia_clinica || "Sin información"}</p>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(historia.fecha_registro).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
