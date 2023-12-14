// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importa tus componentes según sea necesario (asegúrate de que las rutas sean correctas)
import Home from './Home';
import About from './About';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* Asegúrate de que estás utilizando Link de react-router-dom */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          {/* Asegúrate de que estás utilizando Route de react-router-dom */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}
