import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsPerView, setTestimonialsPerView] = useState(3); // Número de testimonios a mostrar
  
  // Estado para el nuevo testimonio
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    rating: 0,
    comment: '',
    hoverRating: 0
  });

  // Determinar cuántos testimonios mostrar según el ancho de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTestimonialsPerView(1);
      } else if (window.innerWidth < 1024) {
        setTestimonialsPerView(2);
      } else {
        setTestimonialsPerView(3);
      }
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cargar testimonios desde localStorage al iniciar
  useEffect(() => {
    const savedTestimonials = localStorage.getItem('userTestimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    }
  }, []);

  // Calcular el ancho de cada tarjeta basado en testimoniosPerView
  const cardWidth = 100 / testimonialsPerView;

  // Función para manejar el hover sobre las estrellas
  const handleStarHover = (rating) => {
    setNewTestimonial(prev => ({ ...prev, hoverRating: rating }));
  };

  // Función para manejar el click en las estrellas
  const handleStarClick = (rating) => {
    setNewTestimonial(prev => ({ ...prev, rating, hoverRating: rating }));
  };

  // Función para renderizar las estrellas interactivas
  const renderInteractiveStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (newTestimonial.hoverRating || newTestimonial.rating);
      
      return (
        <span 
          key={index}
          className={`star interactive ${isFilled ? 'filled' : ''}`}
          onMouseEnter={() => handleStarHover(starValue)}
          onMouseLeave={() => handleStarHover(0)}
          onClick={() => handleStarClick(starValue)}
        >
          ★
        </span>
      );
    });
  };

  // Función para renderizar las estrellas estáticas (en los testimonios existentes)
  const renderStaticStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star static ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({ ...prev, [name]: value }));
  };

  // Enviar nuevo testimonio
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newTestimonial.name.trim() || !newTestimonial.comment.trim() || newTestimonial.rating === 0) {
      alert('Por favor completa todos los campos y selecciona una calificación');
      return;
    }

    const testimonial = {
      id: Date.now(),
      name: newTestimonial.name.trim(),
      rating: newTestimonial.rating,
      comment: newTestimonial.comment.trim(),
      avatar: "👤",
      date: new Date().toLocaleDateString()
    };

    const updatedTestimonials = [...testimonials, testimonial];
    setTestimonials(updatedTestimonials);
    localStorage.setItem('userTestimonials', JSON.stringify(updatedTestimonials));
    
    // Resetear formulario
    setNewTestimonial({
      name: '',
      rating: 0,
      comment: '',
      hoverRating: 0
    });

    alert('¡Gracias por tu testimonio!');
  };

  // Navegación del carrusel - actualizada para múltiples testimonios
  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    
    const maxIndex = Math.max(0, testimonials.length - testimonialsPerView);
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    
    const maxIndex = Math.max(0, testimonials.length - testimonialsPerView);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, testimonials.length, testimonialsPerView]);

  // Calcular el índice máximo para navegación
  const maxIndex = Math.max(0, testimonials.length - testimonialsPerView);

  return (
    <div className="testimonials-page">
      <Navbar />
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title">Lo que dicen nuestros clientes</h2>
          
          {/* Formulario para nuevo testimonio */}
          <div className="testimonial-form-container">
            <h3>Deja tu testimonio</h3>
            <form onSubmit={handleSubmit} className="testimonial-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={newTestimonial.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Tu calificación:</label>
                <div className="interactive-rating">
                  {renderInteractiveStars()}
                  <span className="rating-text">
                    {newTestimonial.rating > 0 ? `${newTestimonial.rating} estrellas` : 'Selecciona una calificación'}
                  </span>
                </div>
              </div>
              
              <div className="form-group">
                <textarea
                  name="comment"
                  placeholder="Tu comentario..."
                  value={newTestimonial.comment}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">
                Enviar Testimonio
              </button>
            </form>
          </div>

          {/* Carrusel de testimonios */}
          {testimonials.length > 0 ? (
            <div 
              className="testimonials-carousel"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div 
                className="testimonials-track"
                style={{
                  transform: `translateX(-${currentIndex * cardWidth}%)`
                }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="testimonial-card"
                    style={{ width: `${cardWidth}%` }}
                  >
                    <div className="testimonial-header">
                      <div className="user-avatar">
                        {testimonial.avatar}
                      </div>
                      <div className="user-info">
                        <h3 className="user-name">{testimonial.name}</h3>
                        <div className="rating">
                          {renderStaticStars(testimonial.rating)}
                        </div>
                        <span className="testimonial-date">{testimonial.date}</span>
                      </div>
                    </div>
                    <p className="testimonial-comment">"{testimonial.comment}"</p>
                  </div>
                ))}
              </div>

              {/* Controles de navegación - solo mostrar si hay más testimonios que los que caben en pantalla */}
              {testimonials.length > testimonialsPerView && (
                <>
                  <button className="carousel-btn prev" onClick={prevTestimonial}>
                    ‹
                  </button>
                  <button className="carousel-btn next" onClick={nextTestimonial}>
                    ›
                  </button>
                </>
              )}

              {/* Indicadores - solo mostrar si hay más testimonios que los que caben en pantalla */}
              {testimonials.length > testimonialsPerView && (
                <div className="carousel-indicators">
                  {Array.from({ length: maxIndex + 1 }, (_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => goToTestimonial(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="no-testimonials">
              <p>No hay testimonios aún. ¡Sé el primero en comentar!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;