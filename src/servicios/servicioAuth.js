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

