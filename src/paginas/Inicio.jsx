import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Inicio.css';
import logo from '../assets/logo.png';

const Inicio = () => {
  const navigate = useNavigate();

  const handleAccederClick = () => {
    navigate('/home');
  };

  return (
    <div className="inicio-contenedor">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="inicio-titulo">¡Bienvenido a tuSanatorio!</h1>
      <p className="inicio-subtitulo">Tu salud esta en las mejores manos</p>
      <button className="inicio-boton" onClick={handleAccederClick}>
        Acceder
      </button>
    </div>
  );
};

export default Inicio;

