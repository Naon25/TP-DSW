import React from "react";
import Navbar from "./Navbar";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <Navbar />

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-overlay"></div>
        <div className="contact-hero-content">
          <h1>Contacto</h1>
          <p>Estamos aquí para ayudarte. Encontranos en el mapa o escribinos.</p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="contact-content">
        {/* MAPA */}
        <div className="contact-map">
          <h2>📍 Nuestra Ubicación</h2>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.1205267329215!2d-60.68734892333906!3d-32.89498146928279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b65afb8a58f92d%3A0x6e49b25ee0ccb877!2sROSARIO%20ROWING%20CLUB!5e0!3m2!1sen!2sar!4v1757803212058!5m2!1sen!2sar" 
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Club Náutico"
          ></iframe>
          <div className="map-actions">
            <a 
              href="https://maps.app.goo.gl/SRp7gQgRosVN2v6W6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-btn"
            >
              🗺️ Cómo llegar
            </a>
          </div>
        </div>

        {/* TARJETAS */}
        <div className="contact-info">
          <div className="info-item">
            <h3>📍 Dirección</h3>
            <p>Av. Carlos Colombres 1798, Rosario</p>
          </div>
          <div className="info-item">
            <h3>📞 Teléfono</h3>
            <p>+54 11 5555-5555</p>
          </div>
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>info@clubnautico.com</p>
          </div>
          <div className="info-item">
            <h3>🌐 Redes Sociales</h3>
            <p>@clubnautico</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

