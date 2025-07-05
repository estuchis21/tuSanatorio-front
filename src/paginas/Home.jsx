import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/224868501-removebg-preview (2).png';
import '../estilos/Home.css';

import carousel1 from '../assets/pexels-artempodrez-4492093.jpg';
import carousel2 from '../assets/pexels-artempodrez-5726835.jpg';
import carousel3 from '../assets/pexels-artempodrez-5726837.jpg';
import carousel4 from '../assets/pexels-ivan-samkov-4989141.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const getCarouselSettings = () => ({
    autoPlay: true,
    infiniteLoop: true,
    showThumbs: false,
    showStatus: false,
    showIndicators: false,
    interval: 3000,
    transitionTime: 700,
    stopOnHover: true,
    swipeable: true,
    emulateTouch: true,
    className: "carousel-wrapper"
  });

  return (
    <div className="home-contenedor">
      <div className="home-header">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="home-main">
        <h2 className="home-leyenda">
          En <strong>tuSanatorio</strong> contamos con la mejor tecnología, maquinaria moderna
          y un staff super preparado para atenderte.
        </h2>
        <div className="login">
          <strong>¿Desea iniciar sesión?</strong>
          <button className="login-btn" onClick={handleLoginClick}>Login</button>
        </div>
        <div className="carrusel">
          <Carousel {...getCarouselSettings()}>
            {[carousel1, carousel2, carousel3, carousel4].map((img, index) => (
              <div key={index} className="carousel-img-container">
                <img src={img} alt={`Slide ${index + 1}`} className="carousel-img" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
