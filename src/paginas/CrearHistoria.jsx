// src/pages/CrearHistoriaMedico.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { insertarHistoria } from "../servicios/histClinicas";
import { buscarPacientesPorTexto } from "../servicios/servicioAuth";
import '../estilos/CrearHistoriaMedico.css';

export default function CrearHistoriaMedico() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [detalle, setDetalle] = useState("");

  const id_medico = localStorage.getItem("id_medico");

  // 🔎 Buscar pacientes por texto
  const handleBuscar = async () => {
    if (!textoBusqueda.trim()) return Swal.fire("Error", "Ingresá un nombre o apellido para buscar", "error");
    try {
      const res = await buscarPacientesPorTexto(textoBusqueda.trim());
      if (!res || res.length === 0) {
        setResultados([]);
        return Swal.fire("Info", "No se encontraron pacientes", "info");
      }
      setResultados(res);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Ocurrió un error al buscar pacientes", "error");
    }
  };

  // 📌 Seleccionar paciente del dropdown
  const seleccionarPaciente = (pac) => {
    setPacienteSeleccionado(pac);
    setResultados([]);
    setTextoBusqueda(`${pac.nombres} ${pac.apellido} (${pac.dni})`);
  };

  // 📤 Crear historia clínica
  const handleSubmit = async () => {
    if (!pacienteSeleccionado || !detalle.trim()) {
      return Swal.fire("Atención", "Debes seleccionar un paciente y escribir el detalle", "warning");
    }

    try {
      const response = await insertarHistoria({
        dni: pacienteSeleccionado.dni,
        id_medico,
        historia_clinica: detalle
      });

      Swal.fire("Éxito", `Historia clínica creada con ID: ${response.id_historia_clinica}`, "success");

      setDetalle("");
      setPacienteSeleccionado(null);
      setTextoBusqueda("");
      setResultados([]);

    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.mensaje || "Ocurrió un error al crear la historia clínica", "error");
    }
  };

  return (
    <div className="crear-historia">
      <h2>Crear Historia Clínica</h2>

      <div className="buscar-paciente">
        <input
          type="text"
          placeholder="Buscar paciente por nombre, apellido o DNI"
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
        {resultados.length > 0 && (
          <ul className="resultados-busqueda">
            {resultados.map((pac) => (
              <li key={pac.dni} onClick={() => seleccionarPaciente(pac)}>
                {pac.nombres} {pac.apellido} ({pac.dni})
              </li>
            ))}
          </ul>
        )}
      </div>

      {pacienteSeleccionado && (
        <div className="info-paciente">
          <p><strong>Nombre:</strong> {pacienteSeleccionado.nombres} {pacienteSeleccionado.apellido}</p>
          <p><strong>DNI:</strong> {pacienteSeleccionado.dni}</p>
        </div>
      )}

      <textarea
        placeholder="Detalle de la historia clínica"
        value={detalle}
        onChange={(e) => setDetalle(e.target.value)}
      />

      <button onClick={handleSubmit}>Crear Historia</button>
    </div>
  );
}
