import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTh, FaRegListAlt, FaRegFileAlt } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';

const Barra = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const navigateTo = (ruta) => {
        navigate(ruta); // Función de manejo de rutas
    };
    const isActive = (ruta) => {
        switch (ruta) {
            case '/inicio':
            case '/':
                return location.pathname === ruta;
                case '/evaluacionreporte':
                    return location.pathname === ruta;
                case '/tablaevaluacionesreporte':
                    return location.pathname === ruta;
                case '/evaluacionseguimiento':
                    return location.pathname === ruta;
               case '/tablaevaluacionesseguimiento':
                    return location.pathname === ruta;
            default:
                return false;
        }
    };
    return (
        <div className={`barra__lateral ${isOpen ? 'barra__lateral_abierta' : ''}`} title='Menu'>
            <header onClick={toggleSidebar} className='barra__lateral_titulo'>
                <h1>Sistemas e <br />informática </h1>
                <GiHamburgerMenu className="iconomenu" />
            </header>
            <div title='Inicio' className={`boton ${isActive('/inicio') ? 'activo' : ''}`} onClick={() => navigateTo('/inicio')} >
                <FaTh className="icono"  />
                <h1>Inicio </h1>
            </div>
            <div title='Evaluación Reporte' className={`boton ${isActive('/evaluacionreporte') ? 'activo' : ''}`} onClick={() => navigateTo('/evaluacionreporte')}>
                <FaRegFileAlt className="icono" />
                <h1>Evaluación<br />Reporte</h1>
            </div>
            <div title='Relación De Evaluación Reporte' className={`boton ${isActive('/tablaevaluacionesreporte') ? 'activo' : ''}`} onClick={() => navigateTo('/tablaevaluacionesreporte')}>
                <FaRegFileAlt className="icono" />
                <h1>Evaluación<br />Reporte</h1>
            </div>
            <div title='Evaluación Seguimiento' className={`boton ${isActive('/evaluacionseguimiento') ? 'activo' : ''}`} onClick={() => navigateTo('/evaluacionseguimiento')}>
                <FaRegFileAlt className="icono" />
                <h1>Evaluación<br />Seguimiento</h1>
            </div>
            <div title='Relación De Evaluación Seguimiento' className={`boton ${isActive('/tablaevaluacionesseguimiento') ? 'activo' : ''}`} onClick={() => navigateTo('/tablaevaluacionesseguimiento')}>
                <FaRegFileAlt className="icono" />
                <h1>Evaluación<br />Seguimiento</h1>
            </div>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Barra;
