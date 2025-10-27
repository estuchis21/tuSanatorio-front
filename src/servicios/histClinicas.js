// src/services/historiaService.js
import axios from "axios";

// Configurar la URL base de tu API
// Ejemplo: const API_URL = "http://localhost:4000/api/historias";
const API_URL = import.meta.env.VITE_API_URL + "/historias"; // recomendado para Vite

// Insertar historia clínica con detalle
export const insertarHistoria = async (historiaData) => {
  try {
    const response = await axios.post(`${API_URL}/crearHistoria`, historiaData);
    return response.data;
  } catch (error) {
    console.error("Error al insertar historia clínica:", error);
    throw error.response?.data || { mensaje: "Error de conexión con el servidor" };
  }
};

// Obtener historias por paciente
export const getHistoriasPorPaciente = async (id_paciente) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/${id_paciente}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener historias por paciente:", error);
    throw error.response?.data || { mensaje: "Error de conexión con el servidor" };
  }
};

// Obtener historias por médico
export const getHistoriasPorMedico = async (id_medico) => {
  try {
    const response = await axios.get(`${API_URL}/medico/${id_medico}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener historias por médico:", error);
    throw error.response?.data || { mensaje: "Error de conexión con el servidor" };
  }
};


export const getHistoriasPorDni = async (dni) => {
  try {
    const response = await axios.get(`${API_URL}/hisClinicas/${dni}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener historias por DNI:", error);
    throw error.response?.data || { mensaje: "Error de conexión con el servidor" };
  }
};
