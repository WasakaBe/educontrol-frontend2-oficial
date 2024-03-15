import React,{useState,useEffect} from 'react'
import './Deportes.css'
import { Footer, Navbar } from '../../Components/Public'
import { panel_cbta,futbolfemenil,futbol, logofutbol } from '../../Image';
export default function Futbol() {
   const [currentIndex, setCurrentIndex] = useState(0);
  const images = [panel_cbta,futbol,futbolfemenil];
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
    <div>
      <Navbar/>
        <div className='section-container-deportes'>
            <div className="carrusel-container">
                  <img className="carrusel-image" src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />

                        <button className="prev-button" onClick={prevSlide}>
                        <ion-icon name="chevron-back-circle-outline"></ion-icon>
                        </button>
                        <button className="next-button" onClick={nextSlide}>
                        <ion-icon name="chevron-forward-circle-outline"></ion-icon>
                        </button>
            </div>
            <div className='subcontainer-deportes'>
               <img src={logofutbol} alt='logo futbol' />
               <div className='subcontainer-info'>
                  <h2>Forma Parte de Nuestro Equipo de Futbol Varonil y Femenil</h2>
               </div>
            </div>

        </div>
      <Footer/>
    </div>
  )
}
