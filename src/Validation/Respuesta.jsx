import { useState } from 'react';

export const useRespuestaValidation = () => {
  const [respuesta, setRespuesta] = useState('');
  const [respuestaValido, setRespuestaValido] = useState(true);

  const handleRespuestaChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^[a-zA-Z0-9\sáéíóúüÜñÑÁÉÍÓÚ]*$/;
    const esValido = regex.test(inputValue) || inputValue === '';
    setRespuesta(inputValue);
    setRespuestaValido(esValido);
  };

  return {
   respuesta,
   respuestaValido,
   handleRespuestaChange,
  };
};
