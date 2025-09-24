import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgLogin from "../assets/imgLogin.jpg";
import "../estilos/IniciarSesion.css";
import { getMedicoByUsuarioId, getPacienteByUsuarioId, login } from "../servicios/servicioAuth";

export default function IniciarSesion() {
  const [username, setUsername] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(username, contrasena);
      const usuario = res.user;

      localStorage.setItem("token", res.token);
      localStorage.setItem("id_usuario", usuario.id_usuario);
      localStorage.setItem("id_rol", usuario.id_rol);
      localStorage.setItem("nombres", usuario.nombres);

      if (usuario.id_rol === 1) {
        const pacienteData = await getPacienteByUsuarioId(usuario.id_usuario);
        if (!pacienteData.id_paciente) {
          alert("No se encontró el paciente asociado a este usuario.");
          setLoading(false);
          return;
        }
        localStorage.setItem("id_paciente", pacienteData.id_paciente);
        navigate("/sesionActiva");
      } else if (usuario.id_rol === 2) {
        const medicoData = await getMedicoByUsuarioId(usuario.id_usuario);
        if (!medicoData.id_medico) {
          alert("No se encontró el médico asociado a este usuario.");
          setLoading(false);
          return;
        }
        localStorage.setItem("id_medico", medicoData.id_medico);
        navigate("/medico");
      } else {
        alert("Rol de usuario desconocido");
      }
    } catch (error) {
      alert(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-contenedor">
      <div className="login-imagen">
        <img src={imgLogin} alt="Imagen Login" />
      </div>

      <div className="columna-login">
        <button
          type="button"
          className="login-volver"
          onClick={handleRegresar}
          aria-label="Volver al home"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Volver al home
        </button>

        <form className="login-formulario" onSubmit={handleSubmit}>
          <h2 className="login-titulo">Iniciar Sesión</h2>

          <label htmlFor="username" className="login-label">Usuario</label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            autoComplete="username"
          />

          <label htmlFor="contrasena" className="login-label">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            className="login-input"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            disabled={loading}
            autoComplete="current-password"
          />

          <button type="submit" className="login-boton" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>

          <div className="login-registrate">
            No estás registrado? <span onClick={() => navigate("/registro")} tabIndex={0} role="button" onKeyPress={(e) => { if (e.key === 'Enter') navigate("/registro") }} >Regístrate</span>.
          </div>
        </form>
      </div>
    </div>
  );
}
