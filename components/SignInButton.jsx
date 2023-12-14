import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

import Button from "react-bootstrap/Button";
import "./paginas.css"; // Importa el archivo CSS
import Image from "react-bootstrap/Image";


/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.log(e);
        });
    };

    return (
        <Button variant="custom" className="ml-auto custom-button" onClick={handleLogin}>
        <Image src="https://www.microsoft.com/favicon.ico" alt="Microsoft Logo" className="logo-image" />
        Iniciar Sesión con cuenta Institucional
    </Button>
    );
};