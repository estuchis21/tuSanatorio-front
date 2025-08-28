import { useEffect, useState } from "react";
import { getEspecialidades, getMedicosPorEspecialidad } from "../servicios/servicioAuth";

export default function SesionActiva() {
  const [especialidades, setEspecialidades] = useState([]);
  const [idEspecialidad, setIdEspecialidad] = useState("");
  const [medicos, setMedicos] = useState([]);

  // Cargar especialidades al montar el componente
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const data = await getEspecialidades();
        setEspecialidades(data);
      } catch (error) {
        console.error("Error al obtener especialidades:", error);
      }
    };
    fetchEspecialidades();
  }, []);

  // Cargar médicos cada vez que se selecciona una especialidad
  useEffect(() => {
    if(!medicos) return;
    if (!idEspecialidad) return;

    const fetchMedicos = async () => {
      try {
        const data = await getMedicosPorEspecialidad(Number(idEspecialidad));
        setMedicos(data);
      } catch (error) {
        console.error("Error al obtener médicos:", error);
        setMedicos([]);
      }
    };

    fetchMedicos();
  }, [idEspecialidad]);

  return (
    <div>
      <label>Especialidad:</label>
      <select
        value={idEspecialidad}
        onChange={(e) => setIdEspecialidad(e.target.value)}
      >
        <option value="">-- Seleccione --</option>
        {especialidades.map((esp) => (
          <option key={esp.id_especialidad} value={esp.id_especialidad}>
            {esp.nombre}
          </option>
        ))}
      </select>

      <label>Médicos:</label>
      <select>
        <option value="">-- Seleccione --</option>
        {medicos.map((med) => (
          <option key={med.id_medico} value={med.id_medico}>
            {med.nombres} {med.apellido}
          </option>
        ))}
      </select>
    </div>
  );
}
