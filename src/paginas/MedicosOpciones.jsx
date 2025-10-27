import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../estilos/MedicosOpciones.css';

export default function MedicoOpciones() {
  const [dni, setDni] = useState("");
  const navigate = useNavigate();

  return (
    <div className="medico-opciones">
      <div className="card">
        <h3>Crear Historia Clínica</h3>
        <button className="button-card" onClick={() => navigate("/crearHistoria")}>Ir</button>
      </div>

      <div className="card">
        <h3>Ver Historias Clínicas</h3>
        <button className="button-card" onClick={() => navigate("/verHistorias")}>Ir</button>
      </div>
    </div>
  );
}
