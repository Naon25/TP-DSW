import React from "react";
import Navbar from "./Navbar";
import "./Home.css"
import videoSrc from "../../assets/nanema.mp4";

const Home = () => {
    return <div className="home-container"> 
        <Navbar/>
        <video autoPlay loop muted playsInline className="background-video">
        <source src={videoSrc} type="video/mp4" />
        Tu navegador no soporta videos.
      </video>

      <div className="overlay"></div>

      <div className="home-content">
        <h1>Club Náutico</h1>
        <p>
          Bienvenido a nuestro espacio. Navegá, aprendé y disfrutá de la vida
          junto al agua.
        </p>
      </div>
    </div>
};

export default Home;