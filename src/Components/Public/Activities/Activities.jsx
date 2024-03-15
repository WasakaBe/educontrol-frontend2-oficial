import React, { useRef } from 'react';
import './Activities.css';
import { atletismo_femenil, voleibol_femenil, futbol } from '../../../Image';

export default function Activities() {
  const slideRef = useRef(null);

  const handleNext = () => {
    const slide = slideRef.current;
    slide.appendChild(slide.firstElementChild);
  };

  const handlePrev = () => {
    const slide = slideRef.current;
    slide.prepend(slide.lastElementChild);
  };

  const activitiesData = [
    {
      image: atletismo_femenil,
      name: 'Alumnos',
      description: 'Alumnos desfilaron del 20 de Nov',
    },
    {
      image: voleibol_femenil,
      name: 'Voleibol',
      description: '',
    },
    {
      image: futbol,
      name: 'Equipo de futbol',
      description: 'Alumnos masculinos forman parte del equipo de futbol soccer',
    },
    {
      image: atletismo_femenil,
      name: 'Alumnos',
      description: 'Alumnos desfilaron del 20 de Nov',
    },
    {
      image: voleibol_femenil,
      name: 'Voleibol',
      description: '',
    },
    {
      image: futbol,
      name: 'Equipo de futbol',
      description: 'Alumnos masculinos forman parte del equipo de futbol soccer',
    },
    // Add more activities as needed
  ];

  return (
    <div className="container-act">
      <div id="slide" ref={slideRef}>
        {activitiesData.map((activity, index) => (
          <div key={index} className="item" style={{ backgroundImage: `url(${activity.image})` }}>
            <div className="content">
              <div className="name">{activity.name}</div>
              <div className="des">{activity.description}</div>
              <button className='btx'>Ver más</button>
            </div>
          </div>
        ))}
      </div>
      <div className="buttonsx">
        <button className="b1" id="prev" onClick={handlePrev}>
          <ion-icon name="arrow-back-circle-outline"></ion-icon>
        </button>
        <button className="b1" id="next" onClick={handleNext}>
          <ion-icon name="arrow-forward-circle-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}
