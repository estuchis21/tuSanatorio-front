import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../estilos/SesionActiva.css";
import { getEspecialidades, getMedicosPorEspecialidad, getUserById } from "../servicios/servicioAuth";
import { getTurnos, historialTurnosPac } from "../servicios/servicioTurnos";

const MySwal = withReactContent(Swal);

export default function SesionActiva({ id_paciente, id_obra_social }) {
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState([]);
  const [idEspecialidad, setIdEspecialidad] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [turnosHist, setTurnosHist] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [cartillaVisible, setCartillaVisible] = useState(false);
  const [user, setUser] = useState(null);

  const idPaciente = id_paciente || localStorage.getItem("id_paciente");
  const id_usuario = localStorage.getItem("id_usuario");

  // Formateo de fecha y hora
  const formatFecha = (fecha) => {
    return new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(fecha));
  };
  const formatHora = (hora) => {
    const date = new Date(hora);
    return date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  };

  // Cargar usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id_usuario);
        setUser(data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };
    fetchUser();
  }, []);

  // Cargar turnos y historial
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const resActivos = await getTurnos(idPaciente);
        setTurnos(resActivos.turnos || []);

        // const resHist = await historialTurnosPac(idPaciente);
        // setTurnosHist(resHist.historial || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTurnos();
  }, []);

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
    <>
      {user && (
        <div className="user-info">
          <h2>Hola: <b>{user.nombres} {user.apellido}</b> 👋</h2>
          <p>En este sitio, podrá ver sus turnos a futuro, su historial, y también podrá modificarlos o eliminarlos si lo desea.</p>
        </div>
      )}

      {/* Próximo turno */}
      {turnos.length > 0 && (
        <div className="proximo-turno">
          <h3>Próximo Turno</h3>
          <p>
            {formatFecha(turnos[0].fecha_turno)} {formatHora(turnos[0].hora_inicio)} - {formatHora(turnos[0].hora_fin)} <br />
            {turnos[0].nombres} {turnos[0].apellido} ({turnos[0].especialidad})
          </p>
        </div>
      )}

      {/* Historial de turnos
      <h3>Historial de Turnos</h3>
      <ul>
        {turnosHist.map((turno) => (
          <li key={turno.id_turno_asignado}>
            {formatFecha(turno.fecha_turno)} | {formatHora(turno.hora_inicio)} - {formatHora(turno.hora_fin)} | {turno.nombres} {turno.apellido} ({turno.especialidad})
          </li>
        ))}
      </ul> */}

      {/* Cartilla de especialidades */}
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
    </>
  );
}
