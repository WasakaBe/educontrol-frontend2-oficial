import React from 'react'
import './DatosAlumno.css'
export default function DatosAlumno() {
  return (
    <div className="container-dates-alumns">
      <h1>Sección de Datos del Alumno </h1>
      <span>
        Favor de Rellenar todos los campos necesarios e ingresando correctamente
        sus datos
      </span>

      <div className="formulario-datos">
        <form>
          <label htmlFor='Datos Escolares'>Datos Escolares</label>
          <label htmlFor="Nombre">Nombre</label>
          <input type="text" placeholder="Juan" title="Ingrese su Nombre" />
          <label htmlFor="Apellido Paterno">Apellido Paterno</label>
          <input type="text" placeholder="Hernandez" title="Ingrese su Apellido Paterno" />
          <label htmlFor='Apellido Materno'>Apellido Materno</label>
          <input type='text' placeholder='Hernandez' title='Ingrese su Apellido Materno'/>
          <label htmlFor='Fecha de Nacimiento'>Fecha de Nacimiento</label>
          <input type='Date' title='Ingrese su Fecha de Nacimiento'/>
          <label htmlFor='Sexo'>Sexo</label>
          <select>
            <option value='Hombre'>Hombre</option>
            <option value='Mujer'>Mujer</option>
          </select>
          <label htmlFor='CURP'>CURP</label>
          <input type='text' placeholder='ingrese su CURP' title='Ingrese su CURP'/>        
          <label htmlFor='Numero de Folio'>Numero de Folio</label>
          <input type='text' placeholder='ingrese su Numero de Folio' title='Ingrese su Numero de Folio'/>        
        </form>
      </div>
    </div>
  );
}
