import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { VerPerfiles } from "./components/VerPerfiles";
import { callMsGraph } from "./graph";
import Button from "react-bootstrap/Button";
import "./styles/App.css";
import Login from "./components/Login";
import {Route, Routes } from 'react-router-dom';


/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
  
    useEffect(() => {
      // Función que se ejecuta cuando el componente se monta
      const fetchProfileData = async () => {
        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
  
          const graphResponse = await callMsGraph(response.accessToken);
          setGraphData(graphResponse);
        } catch (error) {
          // Manejar errores si es necesario
          console.error('Error al obtener datos del perfil:', error);
        }
      };
  
      // Llamada a la función para obtener los datos del perfil
      fetchProfileData();
    }, [instance, accounts]); // Dependencias para el useEffect
  
   
    
  
    return (
      <>
      
        {graphData ? (
          <ProfileData graphData={graphData} />
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {    
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Porfavor inicie sesion para verificar</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        
           
            <div >
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
            <BrowserRouter>
            <Login />
    
            </BrowserRouter>
            
            </UnauthenticatedTemplate>
        </div>
            
        
    );
}
