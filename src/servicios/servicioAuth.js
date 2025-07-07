// src/servicios/servicioAuth.js
import axios from "axios";

const API_URL = "http://localhost:3000/auth";  

// Guardar token en localStorage
export const guardarToken = (token) => {
  localStorage.setItem("token", token);
};

// Obtener token desde localStorage
export const obtenerToken = () => {
  return localStorage.getItem("token");
};

// Eliminar token (logout)
export const eliminarToken = () => {
  localStorage.removeItem("token");
};

export const registrar = async (datosUsuario) => {
  try {
    const res = await axios.post(`${API_URL}/register`, datosUsuario);
    return res.data;
  } catch (error) {
    // Retornamos un objeto con error para que quien llame pueda manejarlo
    throw new Error('Error al registrarse: ' + (error.response?.data?.message || error.message));
  }
};


export const login = async (username, contrasena) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { username, contrasena });

    if (res.data.token) {
      guardarToken(res.data.token);
    }

    return {
      token: res.data.token,
      user: res.data.user 
    };

  } catch (error) {
    throw error;
  }
};

export const getEspecialidades = async () => {
  try {
    const res = await axios.get(`${API_URL}/getEspecialidades`);
    return res.data; // Asumimos que el backend devuelve un array de especialidades
  } catch (error) {
    throw new Error("Error al obtener especialidades");
  }
};



// Obtener id_paciente por id_usuario
export const getPacienteByUsuarioId = async (id_usuario) => {
  try {
    const res = await axios.get(`${API_URL}/paciente/usuario/${id_usuario}`);
    return res.data; // { id_paciente: X }
  } catch (error) {
    throw new Error("Error al obtener id_paciente: " + (error.response?.data?.error || error.message));
  }
};

// Obtener id_medico por id_usuario (si usás médicos)
export const getMedicoByUsuarioId = async (id_usuario) => {
  try {
    const res = await axios.get(`${API_URL}/medico/usuario/${id_usuario}`);
    return res.data; // { id_medico: X }
  } catch (error) {
    throw new Error("Error al obtener id_medico: " + (error.response?.data?.error || error.message));
  }
};