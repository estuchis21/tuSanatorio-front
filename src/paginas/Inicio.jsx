import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/224868501-removebg-preview (2).png';
import '../estilos/Inicio.css';
import '../estilos/Home.css';
import carousel1 from '../assets/pexels-artempodrez-4492093.jpg';
import carousel2 from '../assets/pexels-artempodrez-5726835.jpg';
import carousel3 from '../assets/pexels-artempodrez-5726837.jpg';
import carousel4 from '../assets/pexels-ivan-samkov-4989141.jpg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Inicio = () => {
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


  // Animación al hacer scroll (fade-in)
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          el.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="inicio-contenedor">

      {/* LOGO Y TITULO */}
      <div className="header fade-on-scroll">
        <img src={logo} alt="Logo tuSanatorio" className="inicio-logo" />
        <h1 className="inicio-titulo">
          ¡Bienvenido a <span className="resaltado">tuSanatorio</span>!
        </h1>
        <p className="inicio-subtitulo">Tu salud está en las mejores manos</p>
        <button className="inicio-boton" onClick={handleLoginClick}>
          Acceder
        </button>
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

      {/* HISTORIA */}
      <section className="inicio-historia fade-on-scroll">
        <h2 className="historia-titulo">Nuestra Historia</h2>
        <p className="historia-texto">
          Fundado en <span className="resaltado">2001</span>, <span className="resaltado">tuSanatorio</span> nació con la misión de brindar atención médica de calidad en un ambiente cálido y profesional.
          Desde nuestros inicios, nos enfocamos en integrar tecnología avanzada con un trato humano cercano.
        </p>

        <h3 className="historia-subtitulo">Hitos Clave</h3>
        <ul className="historia-milestones">
          <li>2001: Apertura de nuestras primeras instalaciones con 5 especialidades médicas.</li>
          <li>2005: Incorporación del primer sistema digital de historia clínica en la región.</li>
          <li>2010: Expansión con nueva ala de urgencias y diagnóstico por imágenes.</li>
          <li>2015: Certificación internacional ISO 9001 en gestión hospitalaria.</li>
          <li>2018: Lanzamiento de plataforma de turnos online.</li>
          <li>2022: Ampliación con telemedicina y consultas a distancia.</li>
          <li>2024: Más de 50.000 pacientes atendidos y consolidación como referente en salud integral.</li>
        </ul>
      </section>

      {/* BENEFICIOS */}
      <section className="inicio-beneficios fade-on-scroll">
        <h2 className="historia-titulo">Beneficios para Ti</h2>
        <ul className="historia-beneficios">
          <li>✅ Atención rápida y eficiente</li>
          <li>✅ Médicos especializados en diversas áreas</li>
          <li>✅ Historia clínica digitalizada y segura</li>
          <li>✅ Seguimiento personalizado de tu salud</li>
          <li>✅ Turnos online sin complicaciones</li>
          <li>✅ Telemedicina para consultas a distancia</li>
          <li>✅ Instalaciones modernas y equipadas con tecnología de punta</li>
          <li>✅ Programas preventivos y de bienestar integral</li>
        </ul>
        <p className="historia-texto" style={{marginTop: '20px'}}>
          En <span className="resaltado">tuSanatorio</span>, cada paso de nuestra historia refleja nuestro compromiso con la excelencia, innovación y atención centrada en el paciente.
        </p>
      </section>
    </div>
  );
};

export default Inicio;
