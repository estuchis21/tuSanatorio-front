import { useEffect, useState } from "react";
import "../estilos/SesionActiva.css";

export default function SesionActiva() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCartilla, setShowCartilla] = useState(false);

  const [especialidades, setEspecialidades] = useState([
    { nombre: "Cardiología", medicos: ["Dr. Juan Pérez", "Dra. María López"] },
    { nombre: "Pediatría", medicos: ["Dr. Carlos Martínez", "Dra. Ana Torres"] },
    { nombre: "Dermatología", medicos: ["Dra. Laura Fernández", "Dr. Martín Gómez"] },
    { nombre: "Neurología", medicos: ["Dr. Pedro Sánchez", "Dra. Clara Ruiz"] },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setShowCartilla(true);
    }, 3000); // 3 segundos de bienvenida
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
                  {esp.medicos.map((med, i) => (
                    <li key={i}>{med}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
