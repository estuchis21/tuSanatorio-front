import axios from "axios";

const API_URL = "http://localhost:3000";

export const obtenerEspecialidades = () => axios.get(`${API_URL}/especialidades`);

export const obtenerMedicosPorEspecialidad = (idEspecialidad) =>
  axios.get(`${API_URL}/medicos/${idEspecialidad}`);

export const obtenerTurnosDisponibles = (idMedico, fecha) =>
  axios.get(`${API_URL}/turnos-disponibles`, {
    params: { idMedico, fecha }
  });

export const reservarTurno = (datos) =>
  axios.post(`${API_URL}/reservar-turno`, datos);

export const obtenerMisTurnos = (idPaciente) =>
  axios.get(`${API_URL}/mis-turnos/${idPaciente}`);