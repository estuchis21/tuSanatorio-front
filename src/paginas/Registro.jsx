import React, { useState, useEffect } from "react";
import "../estilos/Registro.css";
import { registrar } from "../servicios/servicioAuth";
import { getEspecialidades } from "../servicios/servicioAuth";
import { obtenerObraSocial } from "../servicios/servicioTurnos";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import imgRegistro from "../assets/imgRegistro.jpg";

const MySwal = withReactContent(Swal);

export default function Registro() {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellido, setApellido] = useState("");
  const [DNI, setDNI] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [id_rol, setIdRol] = useState("");
  const [id_especialidad, setId_especialidad] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [id_obra_social, setId_obra_social] = useState("");
  const [obra_social, setObra_social] = useState([]);
  const navigate = useNavigate();

  // Traer especialidades si es médico
  useEffect(() => {
    if (id_rol === 2) {
      getEspecialidades()
        .then((data) => setEspecialidades(data))
        .catch((err) => {
          console.error(err);
          MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las especialidades'
          });
        });
    } else {
      setEspecialidades([]);
      setId_especialidad("");
    }
  }, [id_rol]);

  // Traer obras sociales
  useEffect(() => {
    const fetchObrasSociales = async () => {
      try {
        const obras = await obtenerObraSocial();
        setObra_social(obras);
      } catch (err) {
        console.error(err);
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las obras sociales'
        });
      }
    };
    fetchObrasSociales();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const datosRegistro = {
        username,
        contrasena,
        nombres,
        apellido,
        DNI,
        telefono,
        email,
        id_rol,
        id_obra_social
      };

      if (id_rol === 2) {
        datosRegistro.id_especialidad = id_especialidad;
      }

      await registrar(datosRegistro);

      // Swal de éxito
      await MySwal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Tu usuario se creó correctamente. Ahora podés iniciar sesión.',
        timer: 2000,
        showConfirmButton: false
      });

      navigate("/login");

    } catch (err) {
      console.error(err);
      const mensaje = err.response?.data?.message || "Error al registrar usuario";
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje
      });
    }
  };

  return (
    <div className="registro-layout">
      <div className="registro-imagen">
        <img src={imgRegistro} alt="Registro" />
      </div>
      <div className="registro-contenedor">
        <form className="registro-formulario" onSubmit={handleSubmit}>
          <h2 className="registro-titulo">Registro</h2>

          <label htmlFor="username" className="registro-label">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            className="registro-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="contrasena" className="registro-label">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            className="registro-input"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <label htmlFor="nombres" className="registro-label">Nombres</label>
          <input
            type="text"
            id="nombres"
            className="registro-input"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />

          <label htmlFor="apellido" className="registro-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            className="registro-input"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <label htmlFor="DNI" className="registro-label">DNI</label>
          <input
            type="text"
            id="DNI"
            className="registro-input"
            value={DNI}
            onChange={(e) => setDNI(e.target.value)}
            required
          />

          <label htmlFor="telefono" className="registro-label">Teléfono</label>
          <input
            type="text"
            id="telefono"
            className="registro-input"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          <label htmlFor="email" className="registro-label">Email</label>
          <input
            type="email"
            id="email"
            className="registro-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="rol" className="registro-label">Rol</label>
          <select
            id="rol"
            className="registro-input"
            value={id_rol}
            onChange={(e) => setIdRol(parseInt(e.target.value))}
            required
          >
            <option value="">Seleccionar rol</option>
            <option value={1}>Paciente</option>
            <option value={2}>Médico</option>
          </select>

          {id_rol === 2 && (
            <>
              <label htmlFor="especialidad" className="registro-label">Especialidad</label>
              <select
                id="especialidad"
                className="registro-input"
                value={id_especialidad}
                onChange={(e) => setId_especialidad(parseInt(e.target.value))}
                required
              >
                <option value="">Seleccionar especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp.id_especialidad} value={esp.id_especialidad}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
            </>
          )}

          <label htmlFor="obra_social" className="registro-label">Obra social</label>
          <select
            id="obras"
            className="registro-input"
            value={id_obra_social}
            onChange={(e) => setId_obra_social(parseInt(e.target.value))}
            required
          >
            <option value="">Seleccionar obra social</option>
            {obra_social.map((obra) => (
              <option key={obra.id_obra_social} value={obra.id_obra_social}>
                {obra.obra_social}
              </option>
            ))}
          </select>

          <button type="submit" className="registro-boton">Registrarse</button>

          <div className="registro-link">
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
