import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/turnos";

export const asignarTurno = async (datosTurnos) => {
  try {
    const res = await axios.post(`${API_URL}/asignarTurno`, datosTurnos);
    return res.data;
  } catch (error) {
    // Retornamos un objeto con error para que quien llame pueda manejarlo
    throw new Error('Error al   ' + (error.response?.data?.message || error.message));
  }
};

export const getTurnos = async (id_paciente) => {
  try {
    const res = await axios.get(`${API_URL}/misTurnos/${id_paciente}`);
    return res.data;
  } catch (error) {
    throw new Error('Error al obtener el turno del paciente: ' + (error.response?.data?.message || error.message));
  }
};

export const historialTurnosPac = async (id_paciente) => {
  try{
    const res = await axios.get(`${API_URL}/historialTurnosPaciente/${id_paciente}`);
    return res.data;
  }
  catch(error){
    throw new Error('Error al obtener el historial de turnos de un paciente' + (error.response?.data?.message || error.message));
  }
}

export const historialTurnosMed = async (id_medico) => {
  try{
    const res = await axios.get(`${API_URL}/historialTurnosMedicos/${id_medico}`);
    return res.data;
  }
  catch(error){
    throw new Error('Error al obtener el historial de turnos de un médico' + (error.response?.data?.message || error.message));
  }
}

export const deleteTurno = async ({ id_paciente, id_turno_asignado }) => {
  try {
    const res = await axios.delete(`${API_URL}/eliminarTurno`, {
      data: { id_paciente, id_turno_asignado }
    });
    return res.data;
  } catch (error) {
    throw new Error('Error al eliminar el turno: ' + (error.response?.data?.message || error.message));
  }
};


export const obtenerTurnosDisponibles = async (id_medico, id_especialidad) => {
  console.log("Llamando a obtenerTurnosDisponibles con:", id_medico, id_especialidad); // 🔹 log
  if (!id_medico || !id_especialidad) {
    throw new Error("Faltan parámetros: id_medico o id_especialidad");
  }

  try {
    const res = await axios.get(`${API_URL}/getTurnosDisponibles/${id_medico}/${id_especialidad}`);
    console.log("Respuesta turnos disponibles:", res.data); // 🔹 log
    return res.data;
  } catch (error) {
    console.error("Error al obtener turnos disponibles:", error.response?.data || error.message); // 🔹 log
    throw new Error('Error al obtener todos los turnos disponibles de un médico: ' + (error.response?.data?.message || error.message));
  }
};


export const obtenerObraSocial = async () => {
  try {
    const res = await axios.get(`${API_URL}/getObrasSociales`);
    return res.data;
  } catch (error) {
    throw new Error(
      "Error al obtener la obra social: " +
      (error.response?.data?.error || error.message)
    );
  }
};

export const insertTurnosDisp = async (turno) => {
  try {
    // 🔹 Enviamos directamente el objeto, no dentro de {turnosDis}
    const res = await axios.post(`${API_URL}/insertTurnosDisp`, turno);
    return res.data;
  } catch (error) {
    // Devolvemos el error completo para que el frontend pueda diferenciarlo
    throw error;
  }
};


export const getRangos = async () => {
  try{
    const res = await axios.get(`${API_URL}/getRangos`);
    return res.data;
  }
  catch(error){
    throw new Error(
      "Error al obtener rangos." +
      (error.response?.data?.error || error.message)
    );
  }
}

export const modificarTurno = async (datosTurno) => {
  try {
    const res = await axios.put(`${API_URL}/modificarTurno`, datosTurno); 
    return res.data;
  } catch (error) {
    throw new Error('Error al modificar el turno: ' + (error.response?.data?.message || error.message));
  }   
}