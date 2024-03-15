import React,{useState} from 'react'
import { DashboardAlumno, DatosAlumno, NavbarAlumno, PerfilAlumno } from '../../Components/Alumno'
import {Footer} from '../../Components/Public'

export default function IndexAlumno() {
  const [currentPanel, setCurrentPanel] = useState('dashboard'); // Estado para controlar el panel actual
  const handleButtonClick = (panel) => {
    setCurrentPanel(panel);
  };
  return (
    <div >
      <div style={{display:'flex'}}>
          <NavbarAlumno onButtonClick={handleButtonClick}/>
          {currentPanel === 'dashboard' && <DashboardAlumno />}
          {currentPanel === 'Perfil' && <PerfilAlumno />}
          {currentPanel === 'Escolar' && <DatosAlumno />}
      </div>
      <Footer/>
    </div>
  )
}
