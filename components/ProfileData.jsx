import React, { useState, useEffect } from "react";
import {
  fetchData,
} from "./formato";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PaginaCor from "../PaginaCor"
import PaginaEstu from "../PaginaEstu";
import PaginaJefeCarrera from "../PaginaJefeCarrera"
import PaginaAsesorInterno from "../PaginaAsesorinterno";


/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {
  const nombreasesores = "api/asesores-is";
  const nombrecordinador = "api/cordinadoras";

  const [asesores, setAsesores] = useState(null);
  const [cordinador, setcordinador] = useState(null);

  useEffect(() => {
    // Cargar los datos iniciales al montar el componente
    async function fetchDataAsync() {
      try {
        const asesores = await fetchData(nombreasesores);
        setAsesores(asesores);


        const cordinador = await fetchData(nombrecordinador);
        setcordinador(cordinador);
        console.log(" los datos:", asesores);
        //setEditingMode(true)
      } catch (error) {
        console.log(" los datos:", asesores);
      }
    }
    fetchDataAsync();
  }, []);

  const correo = props.graphData.mail;

  const residenteSeleccionado = Array.isArray(asesores?.data) && asesores.data.find(
    (item) => {
      console.log("Correo en attributes:", item.attributes?.correo?.toLowerCase());
      console.log("Correo buscado:", correo.toLowerCase());
  
      // Verificar si item.attributes y item.attributes.correo son definidos antes de la comparación
      return item.attributes?.correo?.toLowerCase() === correo.toLowerCase();
    }
  );
  
  const cordinaroseleccionado = Array.isArray(cordinador?.data) && cordinador.data.find(
    (item) => {
      console.log("Correo en attributes:", item.attributes?.correo?.toLowerCase());
      console.log("Correo buscado:", correo.toLowerCase());
  
      // Verificar si item.attributes y item.attributes.correo son definidos antes de la comparación
      return item.attributes?.correo?.toLowerCase() === correo.toLowerCase();
    }
  );
  
 // console.log("ESTE ES EL CORREO CORREO,",correo.toLowerCase())
  //console.log("CORREO", residenteSeleccionado.attributes.correo);
  
  

  if (props.graphData.jobTitle === "Estudiante") {
    // Realiza la navegación a la ruta "/home" si el jobTitle es "Estudiante"
    return (
        <Router>
      <div>
      {/*<PaginaJefeCarrera graphData={props} />*/}
      {/*<PaginaEstu graphData={props}/>*/}
      {/*<PaginaCor graphData={props}/>*/}
      {/*<PaginaAsesorInterno graphData={props} />*/}
      <PaginaEstu graphData={props}/> 
      </div>
    </Router>
      );
  }

  if (props.graphData.jobTitle === "Jefe de Departamento") {
    // Realiza la navegación a la ruta "/home" si el jobTitle es "Estudiante"
    return (
        <Router>
      <div>
      {/*<PaginaJefeCarrera graphData={props} />*/}
      {/*<PaginaEstu graphData={props}/>*/}
      {/*<PaginaCor graphData={props}/>*/}
      {/*<PaginaAsesorInterno graphData={props} />*/}
      <PaginaJefeCarrera graphData={props} />
      </div>
    </Router>
      );
  }

  if (residenteSeleccionado &&
    residenteSeleccionado.attributes &&
    residenteSeleccionado.attributes.correo &&
    props.graphData.mail.toLowerCase() === residenteSeleccionado.attributes.correo) {
    // Realiza la navegación a la ruta "/home" si el jobTitle es "Estudiante"
    return (
        <Router>
      <div>
      {/*<PaginaJefeCarrera graphData={props} />*/}
      {/*<PaginaEstu graphData={props}/>*/}
      {/*<PaginaCor graphData={props}/>*/}
      {/*<PaginaAsesorInterno graphData={props} />*/}
      <PaginaAsesorInterno graphData={props} />
      </div>
    </Router>
      );
  }

  if (cordinaroseleccionado &&
    cordinaroseleccionado.attributes &&
    cordinaroseleccionado.attributes.correo &&
    props.graphData.mail.toLowerCase() === cordinaroseleccionado.attributes.correo) {
    // Realiza la navegación a la ruta "/home" si el jobTitle es "Estudiante"
    return (
        <Router>
      <div>
      {/*<PaginaJefeCarrera graphData={props} />*/}
      {/*<PaginaEstu graphData={props}/>*/}
      {/*<PaginaCor graphData={props}/>*/}
      {/*<PaginaAsesorInterno graphData={props} />*/}
      <PaginaCor graphData={props}/>
      </div>
    </Router>
      );
  }

  return (
    <div id="profile-div">
      <p><strong>First Name: </strong> {props.graphData.givenName}</p>
      <p><strong>Last Name: </strong> {props.graphData.surname}</p>
      <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
      <p><strong>Id: </strong> {props.graphData.id}</p>
      <p><strong>Job Title: </strong> {props.graphData.jobTitle}</p>
    </div>
  );
};
