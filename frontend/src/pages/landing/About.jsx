import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./About.css";

const About = () => {
  const images = [ //CAMBIAR LAS FOTOOOOOOOSSSS
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambio automático cada 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="about-container">
      <Navbar />

      {/* HERO */}
      <div className="about-hero">
        <div className="about-overlay"></div>
        <div className="about-hero-content">
          <h1>SOBRE NOSOTROS</h1>
          <p>Descubrí la excelencia náutica desde 1985</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="about-content">
        {/* TEXTO */}
        <div className="about-text">
          <h2>Nuestra Historia</h2>
          <p>
            Fundado en 1985, el Club Náutico ha sido el epicentro de la pasión 
            por el río y la navegación. Con más de tres décadas de experiencia, 
            hemos formado generaciones de marineros y amantes de las fiestas en yates. 
            Fundado el 30 de junio de 1887  en el entonces “Pueblo de Alberdi” y sería anexado a la ciudad de Rosario en 1919. 
            Está muy ligada a la de los ferrocarriles y, por ende, a los ingleses.
            Cuenta en la actualidad, con las escuelas deportivas,  
            las cuales tienen el objetivo de iniciar a los niños y adolescentes en la práctica del deporte 
            y su incorporación como “modo de vida”, práctica que muchos socios optan por continuar en la misma institución, 
            en la que permanecen por generaciones, y otros desarrollan en instituciones con mayor desarrollo competitivo. 
          </p>
          
          <h2>Nuestras Instalaciones</h2>
          <p>
            Contamos con instalaciones de primer nivel: marina privada, 
            escuela de navegación, restaurante con vista al mar, piscina 
            olímpica y áreas sociales exclusivas para la comunidad náutica.
          </p>
        </div>

        {/* CARRUSEL */}
        <div className="about-carousel">
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default About;

