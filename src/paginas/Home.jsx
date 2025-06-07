import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Home.css';
import logo from '../assets/logo.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import carrusel1 from '../assets/carrusel1.jpg';
import carrusel2 from '../assets/carrusel2.jpg';
import carrusel3 from '../assets/carrusel3.jpg';
import carrusel4 from '../assets/carrusel4.jpg';
import carrusel5 from '../assets/carrusel5.jpg';
import carrusel6 from '../assets/carrusel6.jpg';
import carrusel7 from '../assets/carrusel7.jpg';
import carrusel8 from '../assets/carrusel8.jpg';
import carrusel9 from '../assets/carrusel9.jpg';
import carrusel10 from '../assets/carrusel10.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-contenedor">
      <header className="home-header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="login-btn" onClick={handleLoginClick}>
          Login
        </button>
      </header>

      <main className="home-main">
        <h2 className="home-leyenda">
          En <strong>tuSanatorio</strong> contamos con la mejor tecnología, maquinaria moderna
          y un staff super preparado para atenderte.
        </h2>

        <div className="carrusel">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            className="carousel-wrapper"
          >
            {[carrusel1, carrusel2, carrusel3, carrusel4, carrusel5, carrusel6, carrusel7, carrusel8, carrusel9, carrusel10].map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Instrumento ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Home;
