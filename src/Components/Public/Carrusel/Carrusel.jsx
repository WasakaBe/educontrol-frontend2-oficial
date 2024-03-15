
import React, { useState, useEffect } from 'react';
import './Carrusel.css';
import { panel_cbta,alumns_docent,desfile,preinsripcion } from '../../../Image';

export default function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [panel_cbta,alumns_docent,desfile,preinsripcion];
  const totalImages = images.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  useEffect(() => {
    // Configura el intervalo para cambiar automáticamente de diapositiva
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia la duración según tus necesidades

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
    // eslint-disable-next-line 
  }, [currentIndex]);

  return (
    <div className="carrusel-container">
          <img className="carrusel-image" src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />

                <button className="prev-button" onClick={prevSlide}>
                <ion-icon name="chevron-back-circle-outline"></ion-icon>
                </button>
                <button className="next-button" onClick={nextSlide}>
                <ion-icon name="chevron-forward-circle-outline"></ion-icon>
                </button>
    </div>
  );
}
