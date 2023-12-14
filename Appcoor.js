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
              <Route path="/Anteproyectosrecibidos" element={<Anteproyectosrecibidos />} />
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

