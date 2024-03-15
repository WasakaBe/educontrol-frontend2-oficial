import React from 'react'
import { exampleG } from '../../../Image'
import { useParams} from 'react-router-dom';
export default function NavbarAdmin({ onButtonClick }) {
 const { userName } = useParams();
  return (
    <div className='section-navbar-alumno'>
     <div className='section-dates-alumno'>
          <img src={exampleG} alt='foto de perfil'/>  
          <h3>{userName}</h3>
     </div>
     <div className='sect-buttons'>
      <button onClick={() => onButtonClick('dashboard')} alt='Dashboard'><ion-icon name="home-sharp"></ion-icon> Dashboard</button>
      <button onClick={() => onButtonClick('Perfil')}><ion-icon name="person-circle-sharp"></ion-icon> Perfil</button>
      <button onClick={() => onButtonClick('Horario')}><ion-icon name="calendar-sharp"></ion-icon> Horario de Clases</button>
      <button onClick={() => onButtonClick('CredencialInicioAdmin')}><ion-icon name="id-card-sharp"></ion-icon> Credencial</button>
      <button onClick={() => onButtonClick('Mensajes')}><ion-icon name="chatbox-ellipses-sharp"></ion-icon> Mensajes</button>
      <button onClick={() => onButtonClick('Listas')}><ion-icon name="document-text-sharp"></ion-icon> Listas</button>
      <button onClick={() => onButtonClick('Notificaciones')}><ion-icon name="notifications-sharp"></ion-icon> Notificaciones</button>
      <button onClick={() => onButtonClick('PanelPrincipal')}><ion-icon name="desktop-sharp"></ion-icon> Panel Principal</button>
      <button onClick={() => onButtonClick('Configuracion')}><ion-icon name="settings-sharp"></ion-icon> Configuracion</button> 
      <button onClick={() => onButtonClick('Ayuda')}><ion-icon name="help-circle-sharp"></ion-icon> Ayuda</button> 
      <button ><ion-icon name="exit-sharp"></ion-icon> Cerrar Sesion</button> 
     </div>

     <div className='sect-buttons2'>
      <button onClick={() => onButtonClick('dashboard')}><ion-icon name="home-sharp"></ion-icon></button>
      <button onClick={() => onButtonClick('Perfil')}><ion-icon name="person-circle-sharp"></ion-icon></button>
      <button onClick={() => onButtonClick('Horario')}><ion-icon name="calendar-sharp"></ion-icon></button>
      <button onClick={() => onButtonClick('CredencialInicioAdmin')}><ion-icon name="id-card-sharp"></ion-icon></button>
      <button onClick={() => onButtonClick('Mensajes')}><ion-icon name="chatbox-ellipses-sharp"></ion-icon></button>
      <button onClick={() => onButtonClick('Listas')}><ion-icon name="document-text-sharp"></ion-icon> </button>
      <button onClick={() => onButtonClick('Notificaciones')}><ion-icon name="notifications-sharp"></ion-icon> </button>
      <button onClick={() => onButtonClick('Configuracion')}><ion-icon name="settings-sharp"></ion-icon></button> 
      <button onClick={() => onButtonClick('Ayuda')}><ion-icon name="help-circle-sharp"></ion-icon></button> 
      <button ><ion-icon name="exit-sharp"></ion-icon></button> 
     </div>

    </div>
  )
}
