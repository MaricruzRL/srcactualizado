

import React from 'react';


import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import "./paginas.css"; // Importa el archivo CSS


const Login = () => {

    const isAuthenticated = useIsAuthenticated();
    const redirectToSite = () => {
      window.location.href = "http://localhost:3000/";
    };

    
  return (
    <div className="cajaprincipal">
    <div  className="barrasuperior">
    <img
      src="https://ead.istmo.tecnm.mx/moodle/pluginfile.php/1/theme_moove/logo/1699290843/logoEditable.png"
      alt="Logo"
      className="imagen-contenedor"
      onClick={redirectToSite}
    />
    </div>

          {/* Nuevo espacio con fondo verde */}
    <div className="contenedorprincipal">
    
    <br />
    <br />
    <br />
    <div className='titulologin'>
    <h2>Bienvenido al inicio de sesión de residencia profesional</h2>
 </div>
    <div className="cajadatos">
    <p>Usuario</p>
        <input type="text" />
        
   <p>contraseñas</p>   
        <input type="text"/>
        {isAuthenticated ? (<SignOutButton />) : ( <SignInButton />
)}
      </div>
      {/*props.children*/}
    </div>
    <div className="blue-container">
    <p>©2023 Instituto Tecnológico del Istmo</p>
      {/*props.children*/}
    </div>
  </div>
  );
};

export default Login;