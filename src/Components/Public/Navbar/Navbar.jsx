import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { logoCbta } from '../../../Image'
export default function Navbar() {
 const [isScrolled, setIsScrolled] = useState(false);

 useEffect(() => {
   const handleScroll = () => {
     const scrollTop = window.scrollY;

     // Define el umbral en el que se cambia el fondo (por ejemplo, 100px)
     const scrollThreshold = 100;

     setIsScrolled(scrollTop > scrollThreshold);
   };

   // Agrega un listener de scroll al montar el componente
   window.addEventListener('scroll', handleScroll);

   // Elimina el listener cuando el componente se desmonta
   return () => {
     window.removeEventListener('scroll', handleScroll);
   };
 }, []);
  return (
    <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
      
      <div className='header'>
      <div className='navbar-list'>
          <img src={logoCbta} alt='logo' />
          <span>EduControl</span>
        </div>
        
         <input type='checkbox' id='menu-bar'/>
         <label htmlFor='menu-bar'><ion-icon name="grid"></ion-icon></label>

        <div className='nav'>
           <ul>
              <li><a href='/'>Inicio</a></li>
              <li><a href='/#Acerca'>Acerca</a></li>
              <li><a href='/'>Servicios <ion-icon name="caret-down-outline"></ion-icon> </a>
               <ul>
                 <li><a href='/Becas'>Becas</a></li>
                 <li><a href='/'>Credencial Esc</a></li>
                
                 <li><a href='/'>Tramites <ion-icon name="caret-forward-outline"></ion-icon></a>
                   <ul>
                     <li><a href='/'>Inscripcion</a></li>
                     <li><a href='/'>Reinscripcion</a></li>
                   </ul>
                 </li>
               </ul>
              
              
              </li>
              <li><a href='/#Contact'>Contacto</a></li>
              <li><a href='/Login'>Iniciar Sesion</a></li>
              
              <li><a href='/#'>Registrarse</a>
              <ul>
                 <li><a href='/RegisterAlumn'>Alumno</a></li>
                 <li><a href='/RegisterFamiliar'>Familiar</a></li>
               </ul></li>
           </ul>
           
        </div>
    
      </div>
    </div>
  )
}
