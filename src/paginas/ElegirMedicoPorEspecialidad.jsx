import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getEspecialidades, getMedicosPorEspecialidad } from "../servicios/servicioAuth";

export default function ElegirMedicoPorEspecialidad() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [especialidades, setEspecialidades] = useState([]);
  const [idEspecialidad, setIdEspecialidad] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [cartillaVisible, setCartillaVisible] = useState(false);

  const idPaciente = Number(localStorage.getItem("id_paciente"));
  const id_obra_social = Number(localStorage.getItem("id_obra_social"));

  // Cargar especialidades
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const data = await getEspecialidades();
        setEspecialidades(data);
        setCartillaVisible(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEspecialidades();
  }, []);

  // Cargar médicos según especialidad
  useEffect(() => {
    if (!idEspecialidad) {
      setMedicos([]);
      return;
    }
    const fetchMedicos = async () => {
      try {
        const data = await getMedicosPorEspecialidad(idEspecialidad);
        setMedicos(data);
      } catch (error) {
        console.error(error);
        setMedicos([]);
      }
    };
    fetchMedicos();
  }, [idEspecialidad]);

  // Confirmar turno
  const confirmarTurno = async (medico) => {
    const result = await MySwal.fire({
      title: `¿Deseas sacar un turno con ${medico.nombres} ${medico.apellido}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, sacar turno",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      navigate("/sacarTurno", {
        state: {
          medico,
          especialidad: especialidades.find((e) => e.id_especialidad === idEspecialidad),
          id_paciente: idPaciente,
          id_obra_social,
        },
      });
    }
  };

  return (
    <div className="pagina-medica">
      <div className="bienvenida fade-in-soft">
        <h2>Bienvenido a tu Cartilla Médica</h2>
        <p>Selecciona una especialidad para ver los médicos disponibles</p>
      </div>

      <div className={`cartilla-container fade-in ${cartillaVisible ? "visible" : ""}`}>
        <h2 className="cartilla-titulo">Especialidades</h2>
        <select value={idEspecialidad ?? ""} onChange={(e) => setIdEspecialidad(Number(e.target.value))}>
          <option value="">-- Seleccione --</option>
          {especialidades.map((esp) => (
            <option key={esp.id_especialidad} value={esp.id_especialidad}>{esp.nombre}</option>
          ))}
        </select>

        <div className="medicos-container">
          {medicos.length > 0 ? (
            medicos.map((med) => (
              <div key={med.id_medico} className="medico fade-in-soft" onClick={() => confirmarTurno(med)}>
                <h4>{med.nombres} {med.apellido}</h4>
              </div>
            ))
          ) : (
            idEspecialidad && <p>No hay médicos disponibles en esta especialidad.</p>
          )}
        </div>
      </div>
    </div>
  );
}
