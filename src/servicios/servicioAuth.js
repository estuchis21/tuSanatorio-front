// src/servicios/servicioAuth.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";  
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

// Registrar usuario (solo paciente, rol_id fijo)
export const registrar = async (datosUsuario) => {
 
  datosUsuario.rol_id = 1; 

  const res = await axios.post(`${API_URL}/auth/register`, datosUsuario);
  return res.data;
};

// Login usuario
export const login = async (username, contrasena) => {
  const res = await axios.post(`${API_URL}/auth/login`, { username, contrasena });
  if (res.data.token) {
    guardarToken(res.data.token);
  }
  return res;
};
