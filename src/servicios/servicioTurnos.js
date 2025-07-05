import axios from "axios";

const API_URL = "http://localhost:3000/turnos";

export const asignarTurno = async (datosTurnos) => {
  try {
    const res = await axios.post(`${API_URL}/asignarTurno`, datosTurnos);
    return res.data;
  } catch (error) {
    // Retornamos un objeto con error para que quien llame pueda manejarlo
    throw new Error('Error al   ' + (error.response?.data?.message || error.message));
  }
};

export const getTurnos = async (id_usuario) => {
  try{
    const res = await axios.get(`${API_URL}/misTurnos/${id_usuario}`);
    return res.data;
  }
  catch(error){
    throw new Error('Error al obtener el turno del usuario ' + (error.response?.data?.message || error.message));
  }
}

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

export const deleteTurno = async (datosTurnoPaciente) => {
  try{
    const res = await axios.get(`${API_URL}/eliminarTurno`, datosTurnoPaciente);
    return res.data;
  }
  catch(error){
    throw new Error('Error al eliminar un turno para un paciente' + (error.response?.data?.message || error.message));
  }
}
