import React, { useState, useEffect } from "react";
import { getHistoriasPorPaciente } from "../servicios/histClinicas";

export default function VerHistoriasPaciente() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorias = async () => {
      try {
        const data = await getHistoriasPorPaciente(id_paciente);
        setHistorias(data);
      } catch (error) {
        alert(error.mensaje || "Error al cargar historias");
      } finally {
        setLoading(false);
      }
    };

    if (id_paciente) fetchHistorias();
  }, [id_paciente]);

  if (loading) return <p>Cargando historias...</p>;
  if (!historias.length) return <p>No hay historias clínicas para este paciente.</p>;

  return (
    <div className="p-4 border rounded shadow max-w-lg mx-auto">
      <h2 className="font-bold text-xl mb-4">Historias Clínicas del Paciente</h2>
      {historias.map(h => (
        <div key={h.id_historia_clinica} className="border-b py-2">
          <p><strong>ID Historia:</strong> {h.id_historia_clinica}</p>
          <p><strong>Fecha:</strong> {new Date(h.fecha_registro).toLocaleDateString()}</p>
          <p><strong>Detalle:</strong> {h.historia_clinica}</p>
          <p><strong>Médico:</strong> {h.nombre_medico} {h.apellido_medico}</p>
        </div>
      ))}
    </div>
  );
}
