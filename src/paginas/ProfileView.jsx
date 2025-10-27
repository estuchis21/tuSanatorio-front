import React, { useState, useEffect } from "react";
import { actualizarPerfil, getUserById } from "../servicios/servicioAuth"; 
import '../estilos/ProfileView.css';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function PerfilPage() {
  const [form, setForm] = useState({
    email: "",
    telefono: "",
    username: "",
    contrasena: "",
  });

  const [perfil, setPerfil] = useState({}); // datos actuales del usuario
  const id_usuario = localStorage.getItem("id_usuario");

  // Cargar datos al montar
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getUserById(id_usuario);
        setPerfil(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      }
    };
    fetchPerfil();
  }, [id_usuario]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const datosActualizados = {
        email: form.email || perfil.email,
        telefono: form.telefono || perfil.telefono,
        username: form.username || perfil.username,
        contrasena: form.contrasena || perfil.contrasena,
      };

      await actualizarPerfil(id_usuario, datosActualizados);

      // Mostrar modal de éxito directamente
      MySwal.fire({
        title: 'Perfil actualizado',
        html: <h2>Los datos del usuario fueron actualizados correctamente</h2>,
        icon: "success",
        confirmButtonText: "Aceptar"
      });

      // Opcional: limpiar campo de contraseña
      setForm({ ...form, contrasena: "" });

    } catch (err) {
      // Mostrar modal de error
      MySwal.fire({
        title: 'Error',
        text: err.error || "No se pudo actualizar el perfil",
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder={perfil.email || "Email"}
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="telefono"
        placeholder={perfil.telefono || "Teléfono"}
        value={form.telefono}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder={perfil.username || "Usuario"}
        value={form.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Nueva contraseña"
        value={form.contrasena}
        onChange={handleChange}
      />
      <button type="submit">Guardar cambios</button>
    </form>
  );
}
