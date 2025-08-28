import { useEffect, useState } from "react";
import "../estilos/SesionActiva.css";
import { getEspecialidades } from "../servicios/servicioAuth";

export default function SesionActiva() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCartilla, setShowCartilla] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);

  // --- Traer especialidades desde la API ---
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const data = await getEspecialidades();
        // Asegurarse que cada especialidad tenga un array de médicos
        const formatted = data.map((esp) => ({
          ...esp,
          medicos: esp.medicos || [], 
        }));
        setEspecialidades(formatted);
      } catch (err) {
        console.error("Error al cargar especialidades:", err);
      }
    };
    fetchEspecialidades();
  }, []);

  // --- Controlar la bienvenida ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setShowCartilla(true);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pagina-medica">
      {showWelcome && (
        <div className="bienvenida fade-in">
          <h2>¡Bienvenido a tu Sanatorio!</h2>
          <p>Cuidamos tu salud siempre</p>
        </div>
      )}

      {showCartilla && (
        <div className="cartilla-container fade-in-soft">
          <h2 className="cartilla-titulo">Cartilla Médica</h2>
          <div className="cartilla visible">
            {especialidades.map((esp, idx) => (
              <div key={idx} className="especialidad">
                <h3>{esp.nombre}</h3>
                <ul>
                  {esp.medicos.length > 0 ? (
                    esp.medicos.map((med, i) => <li key={i}>{med}</li>)
                  ) : (
                    <li>No hay médicos cargados</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
