import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*Componentes*/
import Barra from "./coordinadora/componentes/menu_lateral.jsx";
import Cabecera from "./componentes/cabecera.jsx";
import Pie from "./componentes/pie_de_pagina.jsx";
/* Paginas */
import Inicio from "./coordinadora/paginas/inicio.jsx";
import Anteproyectosrecibidos from "./coordinadora/paginas/Anteproyectosrecibidos.jsx";
/*Estilos*/
import './App.css';
import Salir from './coordinadora/paginas/salir.jsx';

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */


const PaginaCor = (props) => {
   
    
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
              <Route path="/Anteproyectosrecibidos" element={<Anteproyectosrecibidos />} />
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

export default PaginaCor;