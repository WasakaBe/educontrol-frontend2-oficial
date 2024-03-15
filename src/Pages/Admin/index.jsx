import React ,{useState}from 'react'
import { Footer } from '../../Components/Public'
import { CredencialInicioAdmin, DashboardAdmin, NavbarAdmin } from '../../Components/Admin'
export default function IndexAdmin() {
  const [currentPanel, setCurrentPanel] = useState('dashboard'); // Estado para controlar el panel actual
  const handleButtonClick = (panel) => {
    setCurrentPanel(panel);
  };
  return (
    <div >
    <div style={{display:'flex'}}>
        <NavbarAdmin onButtonClick={handleButtonClick}/>
        {currentPanel === 'dashboard' && <DashboardAdmin/>}
        {currentPanel === 'CredencialInicioAdmin' && <CredencialInicioAdmin/>}
    </div>
    <Footer/>
  </div>
  )
}
