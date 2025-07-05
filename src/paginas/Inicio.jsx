import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Inicio.css';
import logo from '../assets/224868501-removebg-preview (2).png'

const Inicio = () => {
  const navigate = useNavigate();

  const handleAccederClick = () => {
    navigate('/home');
  };

  return (
    <div className="inicio-contenedor">
      <img src={logo} alt="Logo tuSanatorio" className="inicio-logo" />
      <h1 className="inicio-titulo">
        ¡Bienvenido a <span className="resaltado">tuSanatorio</span>!
      </h1>
      <p className="inicio-subtitulo">Tu salud está en las mejores manos</p>
      <button className="inicio-boton" onClick={handleAccederClick}>
        Acceder
      </button>
    </div>
  );
};

export default Inicio;
