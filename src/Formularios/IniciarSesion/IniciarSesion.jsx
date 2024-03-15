// eslint-disable-next-line 
import React, { useState } from 'react';
import './Login.css';
import { Navbar,Footer } from '../../Components/Public';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Api,Breadcrumbs } from '../../Constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function IniciarSesion() {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
    // eslint-disable-next-line no-unused-vars
  const [loginError, setLoginError] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const history = useNavigate();

  const handlePwd = () => {
    history('/RecuperarCuenta');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);
    setValidEmail(isValid);
  };

  const handleNextClick = () => {
    if (email.trim() === '' || !validEmail) {
      toast.error('Llene el campo requerido de manera correcta.');
    } else {
      setLoadingEmail(true);

      // Verifica primero si el correo está disponible (registrado)
      axios.post(`${Api}check-email`, {
        correo_usuario2: email,
      })
        .then(response => {
          setLoadingEmail(false);
          if (response.data.exists) {
            // Si el correo existe, muestra el mensaje y activa el formulario de contraseña
            toast.success('Correo disponible. Puede continuar con el proceso de inicio de sesión.');
            setShowPasswordForm(true);
          } else {
            // Si el correo no existe, muestra un mensaje indicándolo
            toast.error('El correo proporcionado no está registrado. Por favor, regístrese primero.');
          }
        })
        .catch(error => {
          setLoadingEmail(false);
          if (error.response) {
            // Si hay una respuesta del servidor, pero no es 200, mostramos el mensaje de error del servidor
            toast.error(`Error en la verificación de correo. ${error.response.data.error}`);
          } else if (error.request) {
            // Si no se pudo realizar la solicitud, mostramos un mensaje de error genérico
            toast.error('Error al intentar verificar el correo. Inténtelo de nuevo.');
          } else {
            // Si ocurrió un error durante la configuración de la solicitud, mostramos el mensaje de error del error
            toast.error(`Error en la configuración de la solicitud. ${error.message}`);
          }
          toast.error('Error en la verificación de correo:', error);
        });
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    const isValidPassword = /^(?=.*[A-Za-z0-9\d@$!%*?&]).{8,}$/.test(event.target.value);
    setValidPassword(isValidPassword);
  };

 

  const handleSignInClick = () => {
    if (password.trim() === '') {
      toast.error('Por favor, rellene el campo de contraseña correctamente.');
    } else if (validPassword) {
      // Realiza la solicitud de inicio de sesión a la API
      setLoadingPassword(true);
      axios.post(`${Api}login`, {
        correo_usuario2: email,
        pwd_usuario2: password,
      })
        .then(response => {
          setLoadingPassword(false);
  
          // Obtén el nombre del usuario desde la respuesta
          const userName = response.data.tbl_users.nombre_usuario2;
          const userApp = response.data.tbl_users.app_usuario2;
          const userApm = response.data.tbl_users.apm_usuario2;

          const userRoleId = response.data.tbl_users.idRol;

          

          // Redirige según el tipo de rol
          switch (userRoleId) {
            case 1: // ID para 'ADMINISTRADOR'
              history(`/Administrador/${userName} ${userApp} ${userApm}`);
              break;
            case 2: // ID para 'ALUMNO'
              history(`/Alumno/${userName} ${userApp} ${userApm}`);
              break;
            case 3: // ID para 'DOCENTE'
              history(`/Docent/${userName} ${userApp} ${userApm}`);
              break;
            case 4: // ID para 'FAMILIAR'
              history(`/Family/${userName} ${userApp} ${userApm}`);
              break;
            default:
              history('/Login');
              break;
          }
  
          toast.success(`Inicio de sesión exitoso. ¡Bienvenido  ${userName} ${userApp} ${userApm}!`);
        })
        .catch(error => {
          setLoadingPassword(false);
          setLoginAttempts(loginAttempts + 1);
  
          if (loginAttempts >= 3) {
             // Enviar notificación sobre intento sospechoso
            notifySuspiciousActivity(email);
            toast.error('Ha excedido el límite de intentos.');
          } 
          if (loginAttempts >= 6) {
            toast.error(`Si no se acuerda de su contraseña dirigase a: Olvidaste Contraseña`);
            
          } else {
            toast.error('Credenciales incorrectas. Inténtelo de nuevo.');
          }
          if (error.response && error.response.status === 500) {
            history('/Error500');
          } else if (error.response && error.response.status === 400) {
            history('/Error400');
          } else if (error.response && error.response.status === 404) {
            history('/Error404');
          } else {console.error('Error en la solicitud de inicio de sesión:', error);}
        });
    } else {
      toast.error('Llene el campo de contraseña correctamente.');
    }
  };
  
  const notifySuspiciousActivity = (userEmail) => {
    // Enviar notificación al correo del usuario sobre intento sospechoso
    axios.post(`${Api}suspicious-activity-notification`, {
      userEmail,
    })
      .then(response => {
        console.log('Notificación enviada sobre intento sospechoso.');
      })
      .catch(error => {
        console.error('Error al enviar la notificación sobre intento sospechoso:', error);
      });
  };
  

  return (
    <div>
      <Navbar />
      <div className='flex container mx-auto justify-center'>
        <Breadcrumbs path={'Iniciar Sesion'} /> 
      </div>
      <div className='container-login'>

        
        {loadingEmail ? (
          <div className='loading-container'>
            <div className='loading-text'>Cargando.......</div>
            <div className='loading-bar-container'>
              <div className='loading-bar'></div>
            </div>
          </div>
        ) : (
          <div className='form-container'>
            <div className='form-title'>Iniciar Sesión</div>
            {showPasswordForm ? (
              <>
                <div className={`input-container ${validPassword ? '' : 'invalid'}`}>
                  <label htmlFor="password" className='input-label'>Ingrese su contraseña</label>
                  <div style={{display:'flex',justifyContent:'center'}}>
  <input
                    type={mostrarContrasena ? "password" : "text"}
                    className={`input-field ${validPassword ? 'valid' : 'invalid'}`}
                    value={password}
                    onChange={handlePasswordChange}
                    id='password'
                  />
                   {mostrarContrasena ? (
                      <p  className="mostrarContrasena"
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
                
                  {!validPassword && (
                    <div className='error-message'>
                      La contraseña debe contener al menos 8 caracteres
                    </div>
                  )}
                </div>
                <button className='button3' style={{ marginRight: '20px' }} onClick={handlePwd}>
                  Olvidaste tu contraseña
                </button>
                <button className='button3' onClick={handleSignInClick}>
                  Iniciar Sesión
                </button>
              </>
            ) : (
              <div className={`input-container ${validEmail ? '' : 'invalid'}`}>
                <label className='input-label'>Ingrese su correo electrónico</label>
                <input
                  type='text'
                  className={`input-field ${validEmail ? 'valid' : 'invalid'}`}
                  value={email}
                  onChange={handleEmailChange}
                />
                {!validEmail && (
                  <div className='error-message'>Por favor, ingrese un correo electrónico válido.</div>
                )}
                <button className='button3' onClick={handleNextClick}>
                  Siguiente
                </button>
                <button className='button3' style={{ marginLeft: '20px' }} onClick={handlePwd}>
                  Olvidaste tu contraseña
                </button>
              </div>
            )}
            {loginError && <div className='error-message'>{loginError}</div>}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
