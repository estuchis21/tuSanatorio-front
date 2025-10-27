// src/pages/VerHistoriasPorDni.jsx
import React, { useState } from "react";
import { getHistoriasPorDni } from "../servicios/histClinicas";
import Swal from "sweetalert2";
import '../estilos/VerHistorias.css';

export default function VerHistoriasMedico() {
  const [dni, setDni] = useState("");
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!dni) return Swal.fire({ icon: 'warning', title: 'Ingresá un DNI' });

    setLoading(true);
    try {
      const data = await getHistoriasPorDni(dni);
      setHistorias(data.historias || []);
      if ((data.historias || []).length === 0) {
        Swal.fire({ icon: 'info', title: 'No se encontraron historias para este DNI' });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.mensaje || 'Ocurrió un error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ver-historias">
      <h2>Historias Clínicas por DNI</h2>

      <div className="buscar-dni">
        <input
          type="text"
          placeholder="DNI del paciente"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {loading && <p>Cargando historias...</p>}

      {!loading && historias.length > 0 && (
        <div className="lista-historias">
          {historias.map((h, i) => (
            <div key={i} className="historia-card">
              <p><strong>Paciente:</strong> {h.nombres} {h.apellido} (DNI: {h.dni})</p>
              <p><strong>Fecha:</strong> {new Date(h.fecha_registro).toLocaleDateString()}</p>
              <p><strong>Detalle:</strong> {h.historia_clinica}</p>
              <p><strong>Médico:</strong> {h.nombre_medico} {h.apellido_medico}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
