import React, { useState } from 'react';
import { Footer, Navbar } from '../../Components/Public';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Api } from '../../Constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RecuperarPwd.css'

const RecuperarContrasena = () => {
  const navigate = useNavigate();

  // Paso 1: Verificar correo
  const [correo, setCorreo] = useState('');
  const [paso, setPaso] = useState(1);
  const [correoValido, setCorreoValido] = useState(true);
  const [correoEncontrado, setCorreoEncontrado] = useState(false);
   // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState('');


  const handleVerificarCorreo = async () => {
    if (correoValido) {
      try {
        const response = await fetch(`${Api}check-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo_usuario2: correo }),
        });

        if (response.ok) {
          const data = await response.json();

          if (data.exists) {
            setCorreoEncontrado(true);
            try {
              const tokenResponse = await fetch(`${Api}get-token`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo_usuario2: correo }),
              });

              if (tokenResponse.ok) {
                const tokenData = await tokenResponse.json();
                setToken(tokenData.token_usuario2);
                setPaso(2); 
              } else {
                toast.error('Error al obtener el token. Inténtelo nuevamente.');
              }
            } catch (error) {
              toast.error('Error al obtener el token. Inténtelo nuevamente.');
            }
          } else {
            toast.error('Correo no encontrado. Intente con otro correo.');
          }
        } else {
          toast.error('Error al verificar el correo. Inténtelo nuevamente.');
        }
      } catch (error) {
        toast.error('Error al conectar con la API. Inténtelo nuevamente.');
      }
    }
  };

  // Paso 2: Confirmar Token
  const [tokenIngresado, setTokenIngresado] = useState('');
  const [error, setError] = useState('');
  const [mensajeValidacion, setMensajeValidacion] = useState('');

  const handleCambiarToken = (e) => {
    const inputValue = e.target.value;
    const regex = /^[A-Z0-9]*$/;

    if (regex.test(inputValue)) {
      setTokenIngresado(inputValue);
      setError('');
    } else {
      setTokenIngresado('');
      toast.error('Ingrese solo caracteres alfanuméricos en mayúsculas.');
    }
  };

  const handleConfirmarToken = async () => {
    try {
      const response = await fetch(`${Api}get-token-by-emai/${correo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token_usuario2 === tokenIngresado) {
          setMensajeValidacion('Token válido');
        } else {
          setMensajeValidacion('Token inválido');
        }
      } else {
        setMensajeValidacion('Token inválido');
      }
    } catch (error) {
      toast.error('Error al verificar el token. Inténtelo nuevamente.');
    }
  };

  const handleSiguiente = () => {
   if (mensajeValidacion === 'Token válido') {
    setPaso(3); 
   } else {
     // Puedes mostrar un mensaje de error o realizar alguna acción adicional en caso de un token inválido
     toast.error('Token inválido. Intente nuevamente.');
   }
 };

  // Paso 3: Actualizar Contraseña
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [contrasenaValida, setContrasenaValida] = useState(true);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);

  
  const handleCambiarContrasena = (event) => {
   const inputValue = event.target.value;
   const regexMayuscula = /[A-Z-Ñ]/;
   const regexMinuscula = /[a-z-ñ]/;
   const regexNumero = /[0-9]/;
   const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;
   const esValida =
     inputValue.length >= 8 &&
     regexMayuscula.test(inputValue) &&
     regexMinuscula.test(inputValue) &&
     regexNumero.test(inputValue) &&
     regexEspecial.test(inputValue);
   setNuevaContrasena(inputValue);
   setContrasenaValida(esValida);
  };

  // eslint-disable-next-line no-unused-vars
  const alternarVisibilidadContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };
// eslint-disable-next-line no-unused-vars
  const alternarVisibilidadConfirmarContrasena = () => {
    setMostrarConfirmarContrasena(!mostrarConfirmarContrasena);
  };

  const handleActualizarContrasena = async () => {
    if (!correo) {
      toast.error('Correo no definido. Verifica la proporción de correo.');
      return;
    }
    if (!nuevaContrasena && !confirmarContrasena) {
     toast.error('Por favor, responda los campos. ');
     toast.error(' No dejarlos en blanco.');
     return;
   }
   if ( !nuevaContrasena) {
    toast.error('Por favor, responda el campo de  contraseña. ');
    toast.error(' No dejarlos en blanco.');
    return;
  }
   if ( !confirmarContrasena) {
    toast.error('Por favor, responda el campo de confirmar contraseña. ');
    toast.error(' No dejarlos en blanco.');
    return;
  }

    if (nuevaContrasena === confirmarContrasena && contrasenaValida) {
      try {
        const response = await fetch(`${Api}updates-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo_usuario2: correo, new_password: nuevaContrasena }),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message || 'Contraseña actualizada con éxito.');
          setTimeout(() => {
            navigate('/Login');
          }, 800);
        } else {
          const data = await response.json();
          toast.error(data.message || 'Error al actualizar la contraseña.');
        }
      } catch (error) {
        toast.error('Error de red. Inténtelo nuevamente.');
        setTimeout(() => {
          navigate('/Error500');
        }, 800);
      }
    } else {
      toast.error('Las contraseñas no coinciden o no cumplen con los requisitos. Inténtelo nuevamente.');
    }
  };

  // Renderizar la interfaz de usuario según el paso actual
  const renderizarPaso = () => {
    switch (paso) {
      case 1:
        return (
          <>
            <h2>Recuperar Contraseña</h2>
            {correoEncontrado ? (
                        <div className='loading-container'>
                        <div className='loading-text'>Cargando.......</div>
                        <div className='loading-bar-container'>
                          <div className='loading-bar'></div>
                        </div>
                      </div>
            ) : null}  {!correoEncontrado && (
              <>
                <label>Correo Electrónico:</label>
                <input
                  type='email'
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  onBlur={() => setCorreoValido(/^\S+@\S+\.\S+$/.test(correo))}
                  style={{ border: correoValido ? '2px solid green' : '1px solid red' }}
                />
                {!correoValido && <p>Ingrese correctamente el correo.</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handleVerificarCorreo}>Verificar Correo</button>
                <br></br>
                
                <a class='preguntasecreta' href='/PreguntasSecreta'>Otra Forma de Recuperar</a>
              </>
            )}
          </>
        );
      case 2:
        return (
          <>
            <h2>Confirmar Token</h2>
            <label>Correo Electrónico:</label>
            <p>{correo}</p>
            <br></br>
            <label>Ingrese el TOKEN:</label>
            <input
              type='text'
              value={tokenIngresado}
              onChange={handleCambiarToken}
              style={{ border: error ? '2px solid red' : '2px solid green' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleConfirmarToken}>Confirmar Token</button>
            <br></br>
            <br></br>
            {mensajeValidacion && (
              <>
                <p>{mensajeValidacion}</p>
                <button onClick={handleSiguiente}>Siguiente</button>
              </>
            )}
          </>
        );
      case 3:
        return (
          <>
            <h2>Actualizar Contraseña</h2>
            <label>Nueva Contraseña:</label>

            <div className='password-input' style={{display:'flex',justifyContent:'center'}}>

              <input
                type={mostrarContrasena ? 'password' : 'text'}
                placeholder="Example#123"
                value={nuevaContrasena}
                onChange={handleCambiarContrasena}
                style={{ border: contrasenaValida ? '2px solid green' : '2px solid red' }}
              />
              {mostrarContrasena ? (
                      <p 
                        className="mostrarContrasena"
                        onClick={() => setMostrarContrasena(false)}
                      >
                  
                        <ion-icon name="eye-off-outline"></ion-icon>
                      </p>
                    ) : (
                      <p className="nomostrarContrasena"
                        onClick={() => setMostrarContrasena(true)}
                      >
                        <ion-icon name="eye-outline"></ion-icon>
                      </p>
                    )}
            </div>
            {!contrasenaValida && (
              <p style={{ color: 'red' }}>
                La contraseña debe tener al menos 8 caracteres y contener letras, números y al menos un carácter especial.
              </p>
            )}
            <br></br>
            <label>Confirmar Contraseña:</label>
            <div className='password-input' style={{display:'flex',justifyContent:'center'}}>
              <input
                type={mostrarConfirmarContrasena ? 'password' : 'text'}placeholder="Example#123"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              />
                {mostrarConfirmarContrasena ? (
                      <p 
                        className="mostrarContrasena"
                        onClick={() => setMostrarConfirmarContrasena(false)}
                      >
                  
                        <ion-icon name="eye-off-outline"></ion-icon>
                      </p>
                    ) : (
                      <p className="nomostrarContrasena"
                        onClick={() => setMostrarConfirmarContrasena(true)}
                      >
                        <ion-icon name="eye-outline"></ion-icon>
                      </p>
                    )}
            </div>
            {contrasenaValida && confirmarContrasena && nuevaContrasena !== confirmarContrasena && (
              <p style={{ color: 'red' }}>Las contraseñas no coinciden.</p>
            )}
            <button onClick={handleActualizarContrasena}>Actualizar Contraseña</button>
          </>
        );
      default:
        return null;
    }
  };


  return (
    <div>
      <Navbar />
      <div className='flex container mx-auto justify-center'>
        <Breadcrumbs path={'Recuperar Contrasena'} />
      </div>
      <div className='container-forgout'>
        <div className='forgout-form'>
          {renderizarPaso()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecuperarContrasena;
