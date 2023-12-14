import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*Componentes*/
import Barra from "./asesor_externo/componentes/barra_lateral.jsx";
import Cabecera from "./componentes/cabecera.jsx";
import Pie from "./componentes/pie_de_pagina.jsx";
/* Paginas */
import Inicio from "./asesor_externo/paginas/inicio.jsx";
import Evaluacionseguimiento from "./asesor_externo/paginas/evaluacionseguimiento.jsx";
import Evaluacionreporte from "./asesor_externo/paginas/evaluacionreporte.jsx";
import Tablaevaluacionesseguimiento from "./asesor_externo/paginas/tablaevaluacionseguimiento.jsx";
import Tablaevaluacionesreporte from "./asesor_externo/paginas/tablaevaluacionreporte.jsx";


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
              <Route path="/evaluacionreporte" element={<Evaluacionreporte />} />
              <Route path="/tablaevaluacionesreporte" element={<Tablaevaluacionesreporte />} />
              <Route path="/evaluacionseguimiento" element={<Evaluacionseguimiento />} />
              <Route path="/tablaevaluacionesseguimiento" element={<Tablaevaluacionesseguimiento />} />
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