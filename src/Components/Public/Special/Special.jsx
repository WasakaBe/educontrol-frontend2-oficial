import React from 'react'
import "./Special.css"
import {useNavigate} from 'react-router-dom'
import { Admin,Agri,Agro,Alim,Cont,Dess,Ofit,Prog } from '../../../Image'
export default function Special() {
    const nav = useNavigate();

    const urlAdmin= () => {
        nav('Carrera/Administracion');
    };
  return (
    <div className='container-special'>
      <div className='special-ctn'>
            <div className='circle-special'>
                <h3>Carreras</h3>
                <h2>Técnicas</h2>
                <p>La institución educativa ofrece las siguientes carreras técnicas</p>
            </div>
            <div className='logo-special'>
                <div className='logo-admin'>
                 <img src={Admin} alt='Administración' title='Administración' onClick={urlAdmin}/>
              </div>
              <div className='logo-agricola'>
                 <img src={Agri} alt='Agrícola' title='Agrícola'/>
              </div>
              <div className='logo-agro'>
                 <img src={Agro} alt='Agropecuaria' title='Agropecuaria'/>
              </div>
              <div className='logo-alim'>
                 <img src={Alim} alt='Alimentos'  title='Alimentos'/>
              </div>
              <div className='logo-cont'>
                 <img src={Cont} alt='Contabilidad'  title='Contabilidad'/>
              </div>
              <div className='logo-des'>
                 <img src={Dess} alt='Desarrollo' title='Desarrollo Comunitario'/>
              </div>
              <div className='logo-ofit'>
                 <img src={Ofit} alt='Ofimatica' title='Ofimatica'/>
              </div>
              <div className='logo-prog'>
                 <img src={Prog} alt='Programación'  title='Programación'/>
              </div>
            </div>
      </div>
    </div>
  )
}