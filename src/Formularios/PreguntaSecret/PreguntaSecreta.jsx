import React from 'react'
import './Preg.css'
import { Footer, Navbar } from '../../Components/Public'
export default function PreguntaSecreta() {
  return (
    <div>
      <Navbar/>
          <div className='container-pregunta'>
              <div className='formulario-pregunta'>
                <h2>Recuperacion de Cuenta</h2>
                <h4>Por medio de Pregunta Secreta</h4>
              </div>
          </div>
      <Footer/>
    </div>
  )
}
