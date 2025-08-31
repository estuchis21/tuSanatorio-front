import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/SesionActiva.css";
import { getEspecialidades, getMedicosPorEspecialidad } from "../servicios/servicioAuth";

const MySwal = withReactContent(Swal);

export default function SesionActiva({ id_paciente, id_obra_social }) {
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState([]);
  const [idEspecialidad, setIdEspecialidad] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [cartillaVisible, setCartillaVisible] = useState(false);

  // ✅ Definir el idPaciente dentro del componente
  const idPaciente = id_paciente || localStorage.getItem("id_paciente");

  // Cargar especialidades al iniciar
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const data = await getEspecialidades();
        setEspecialidades(data);
        setCartillaVisible(true);
      } catch (error) {
        console.error("Error al obtener especialidades:", error);
      }
    };
    fetchEspecialidades();
  }, []);

  // Cargar médicos cuando cambia la especialidad
  useEffect(() => {
    if (!idEspecialidad) {
      setMedicos([]);
      return;
    }
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

  const confirmarTurno = async (medico) => {
    const result = await MySwal.fire({
      title: `¿Deseas sacar un turno con ${medico.nombres} ${medico.apellido}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, sacar turno",
      cancelButtonText: "No"
    });

    if (result.isConfirmed) {
      navigate("/sacarTurno", {
        state: {
          medico,
          especialidad: especialidades.find(e => e.id_especialidad === Number(idEspecialidad)),
          id_paciente: idPaciente,   // 👈 usar la variable ya corregida
          id_obra_social
        }
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
        <select value={idEspecialidad} onChange={(e) => setIdEspecialidad(e.target.value)}>
          <option value="">-- Seleccione --</option>
          {especialidades.map((esp) => (
            <option key={esp.id_especialidad} value={esp.id_especialidad}>
              {esp.nombre}
            </option>
          ))}
        </select>

        <div className="medicos-container">
          {medicos.map((med) => (
            <div 
              key={med.id_medico} 
              className="medico fade-in-soft" 
              onClick={() => confirmarTurno(med)}
            >
              <h4>{med.nombres} {med.apellido}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
