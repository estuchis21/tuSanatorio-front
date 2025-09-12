import React from "react";
import '../estilos/HistoriaClinica.css';

export default function HistoriasClinicasMedico() {
  // Datos de ejemplo
  const paciente = { nombre: "Juan Pérez", edad: 35, id_paciente: 101 };
  const medico = { nombre: "Dra. María López", id_medico: 20 };
  const detalle = {
    historia_clinica: "Paciente con antecedentes de hipertensión y alergia a la penicilina.",
    fecha_detalle: "2025-09-11"
  };

  return (
    <div className="historia-container">
      <div className="info-paciente">
        <h3>Paciente</h3>
        <p><strong>Nombre:</strong> {paciente.nombre}</p>
        <p><strong>Edad:</strong> {paciente.edad}</p>
        <p><strong>ID:</strong> {paciente.id_paciente}</p>
      </div>

      <div className="info-medico">
        <h3>Médico</h3>
        <p><strong>Nombre:</strong> {medico.nombre}</p>
        <p><strong>ID:</strong> {medico.id_medico}</p>
      </div>

      <div className="historia-clinica">
        <h3>Historia Clínica</h3>
        <p>{detalle.historia_clinica}</p>
        <p><strong>Fecha:</strong> {detalle.fecha_detalle}</p>
      </div>
    </div>
  );
}
