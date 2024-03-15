import React, { useEffect, useState } from 'react';
import './DashboardAlumno.css';
import { useParams} from 'react-router-dom';
import { Chica } from '../../../Image';
export default function DashboardAlumno() {
  const [currentDate, setCurrentDate] = useState('');
  const { userName } = useParams();
  useEffect(() => {
    // Función para formatear la fecha
    const formatDateTime = (date) => {
      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      return new Intl.DateTimeFormat('es-ES', options).format(date);
    };

    // Función para actualizar la fecha y hora actual
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(formatDateTime(now));
    };
    // Actualizar la fecha y hora inicialmente
    updateDateTime();

    // Establecer un intervalo para actualizar la fecha y hora cada segundo
    const intervalId = setInterval(updateDateTime, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento [] indica que este efecto se ejecuta solo una vez al montar el componente

  return (
    <div className='container-dashboard-alumno'>
      <h2>Dashboard</h2>
      <h3>{currentDate}</h3>

      <div className='subcontainer-welcome-alumno'>
        <div>
                <h2>Bienvenido, <span>{userName}</span> </h2>
                <p>Es un gusto tenerte con nosotros. ¡Animo!</p>
        </div>
        <img src={Chica} alt='Chica'/>
      </div>

    
      
    </div>
  );
}
