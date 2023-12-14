import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*Componentes*/
import Barra from "./estudiante/componentes/menu_lateral.jsx";
import Cabecera from "./componentes/cabecera.jsx";
import Pie from "./componentes/pie_de_pagina.jsx";
/* Paginas */
import Inicio from "./estudiante/paginas/inicio.jsx";
import Anteproyectosubir from "./estudiante/paginas/anteproyectosubir.js";
import Salir from './estudiante/paginas/salir.jsx';
import Resultadoevaluaciones from "./estudiante/paginas/resultadoevaluaciones.jsx"
import Seguimientoresidencia from './estudiante/paginas/seguimientoresidencia.jsx'
/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */

const PaginaEstu = (props) => {
 // console.log("PAGINA ESTU",props.graphData);
    
    return (
        <div className="contenedor">
        <Barra />
        <div className="principal">
          <header className="cabecera">
            <Cabecera graphData={props}  />
          </header>
          <main className="cuerpo">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/anteproyectosubir" element={<Anteproyectosubir graphData={props} />} />
              <Route path="/resultadoevaluaciones" element={<Resultadoevaluaciones graphData={props} />} />
              <Route path="/seguimientoresidencia" element={<Seguimientoresidencia graphData={props} />} />
              <Route path="/salir" element={<Salir />} />
            </Routes>
          </main>
          <footer className="pie-pagina">
            <Pie />
          </footer>
        </div>
      </div>
    );
};

export default PaginaEstu;