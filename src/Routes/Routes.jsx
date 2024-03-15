import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IndexPublic,IndexAlumno ,IndexAdmin,IndexDocent,IndexFamiliar} from '../Pages';
import { IniciarSesion,RegisterAlumn,RegisterFamiliar ,RecuperarContrasena,PreguntaSecreta} from '../Formularios';
import { Futbol } from '../Secciones';
import { Becas } from '../Components/Public';
import {Error400,Error404,Error500} from '../Pages';

export default function AppRoutes(){
  return(
    <div>
      <Router>
        <Routes>
            <Route exact path="/" element={<IndexPublic />} />
            <Route path="/Alumno/:userName?" element={<IndexAlumno />} />
            <Route path="/Administrador/:userName?" element={<IndexAdmin />} />
            <Route path="/Docente/:userName?" element={<IndexDocent />} />
            <Route path="/Familiar/:userName?" element={<IndexFamiliar />} />

            <Route path="/Login/:userName?" element={<IniciarSesion />} />                     
            <Route path="/RegisterAlumn" element={<RegisterAlumn />} /> 
            <Route path="/RegisterFamiliar" element={<RegisterFamiliar />} /> 
            <Route path="/RecuperarCuenta" element={<RecuperarContrasena />} />
            <Route path="/PreguntasSecreta" element={<PreguntaSecreta />} />
            <Route path="/Becas" element={<Becas />} />
            <Route path="/Futbol" element={<Futbol />} />   

            <Route path="/Error500" element={<Error500/>} />
            <Route path="/Error400" element={<Error400/>} />
            <Route path="/Error404" element={<Error404/>} />

            <Route path="*" element={<Error404 />} />                  
        </Routes>
      </Router>
    </div>
  )
}