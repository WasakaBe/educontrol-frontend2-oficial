import React from 'react'
import './PerfilAlumno.css'
import { exampleG } from '../../../Image'
import { useParams} from 'react-router-dom';
export default function PerfilAlumno() {
  const { userName } = useParams();
  return (
    <div className='container-perfil-alumno'>
      <div className='card-profile-alumns'>
        <img src={exampleG} alt='foto del usuario' />
        <h2>{userName}</h2>
      </div>

    </div>
  )
}
