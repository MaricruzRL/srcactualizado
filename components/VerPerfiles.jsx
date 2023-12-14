// VerPerfiles.jsx
import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import "./perfilcss.css"; // Importa el archivo CSS

export const VerPerfiles = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="cajaprincipal">
      <div className="barrasuperior"></div>

      {/* Nuevo espacio con fondo verde */}
      <div className="contenedorprincipal">
        <br />
        <br />
        <br />
        <h2>Bienvenido al inicio de sesión de residencia profesional 2</h2>

        <div className="cajadatos">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
        {/*props.children*/}
      </div>
      <div className="blue-container">
        <p>Inferior</p>
        {/*props.children*/}
      </div>
      {/* Fin del nuevo espacio */}
    </div>
  );
};

export default VerPerfiles; // Agrega esta línea para exportar VerPerfiles como exportación por defecto
