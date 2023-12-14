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


/*Estilos*/
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="contenedor">
        <Barra />
        <div className="principal">
          <header className="cabecera">
            <Cabecera />
          </header>
          <main className="cuerpo">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/asignacionasesoresint" element={<Asignacionasesoresint />} />
              <Route path="/evaluacionseguimiento" element={<Evaluacionseguimiento />} />
              <Route path="/evaluacionreporte" element={<Evaluacionreporte />} />
              <Route path="/evaluacionesseguimiento" element={<Evaluacionesseguimiento />} />
              <Route path="/evaluacionesreporte" element={<Evaluacionesreporte />} />

            </Routes>
          </main>
          <footer className="pie-pagina">
            <Pie />
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

