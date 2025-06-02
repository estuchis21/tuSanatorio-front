import axios from "axios";

const API_URL = "http://localhost:3000/api/usuarios";


export async function registrar(datosUsuario) {

  const respuesta = await axios.post(`${API_URL}/registro`, datosUsuario);
  return respuesta.data; 

}
