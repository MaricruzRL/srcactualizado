import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*Componentes*/
import Barra from "./jefe_de_departamento/componentes/barra_lateral.jsx";
import Cabecera from "./componentes/cabecera.jsx";
import Pie from "./componentes/pie_de_pagina.jsx";
/* Paginas */
import Inicio from "./jefe_de_departamento/paginas/inicio.jsx";
import Asignacionasesoresint from "./jefe_de_departamento/paginas/asignacionasesoresint.jsx";
import Evaluacionesreporte from "./jefe_de_departamento/paginas/evaluacionesreporte.jsx";
import Evaluacionesseguimiento from "./jefe_de_departamento/paginas/evaluacionesseguimiento.jsx";
import Evaluacionseguimiento from "./jefe_de_departamento/paginas/evaluacionseguimiento.jsx";
import Evaluacionreporte from "./jefe_de_departamento/paginas/evaluacionreporte.jsx";
import Salir from './jefe_de_departamento/paginas/salir.jsx';
import Anteproyectosrecibidos from './jefe_de_departamento/paginas/Anteproyectosrecibidos.jsx';
/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */

const PaginaJefe = (props) => {
   
    
    return (
        <div className="contenedor">
        <Barra />
        <div className="principal">
          <header className="cabecera">
            <Cabecera graphData={props} />
          </header>
          <main className="cuerpo">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/Anteproyectosrecibidos" element={<Anteproyectosrecibidos graphData={props} />}/>
              <Route path="/asignacionasesoresint" element={<Asignacionasesoresint graphData={props} />} />
              <Route path="/evaluacionseguimiento" element={<Evaluacionseguimiento   graphData={props} />} />
              <Route path="/evaluacionreporte" element={<Evaluacionreporte   graphData={props} />} />
             {/*<Route path="/evaluacionesseguimiento" element={<Evaluacionesseguimiento  />} />*/} 
              <Route path="/evaluacionesreporte" element={<Evaluacionesreporte  graphData={props} />} />
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

export default PaginaJefe;