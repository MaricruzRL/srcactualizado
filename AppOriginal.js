import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/*Componentes*/
import Barra from "./estudiante/componentes/menu_lateral.jsx";
import Cabecera from "./componentes/cabecera.jsx";
import Pie from "./componentes/pie_de_pagina.jsx";
/* Paginas */
import Inicio from "./estudiante/paginas/inicio.jsx";
import Anteproyectosubir from "./estudiante/paginas/anteproyectosubir.js";



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
              <Route path="/anteproyectosubir" element={<Anteproyectosubir />} />

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

