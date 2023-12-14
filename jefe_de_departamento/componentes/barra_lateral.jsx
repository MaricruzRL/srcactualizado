import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTh, FaRegListAlt,FaWpforms, FaRegFileAlt,FaSignOutAlt } from "react-icons/fa";
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
            case '/anteproyectosrecibidos':
                return location.pathname === ruta;
            case '/asignacionasesoresint':
                return location.pathname === ruta;
            case '/evaluacionseguimiento':
                return location.pathname === ruta;
            case '/evaluacionreporte':
                return location.pathname === ruta;
           // case '/evaluacionesseguimiento':
             //   return location.pathname === ruta;
            case '/evaluacionesreporte':
                return location.pathname === ruta;
                case '/salir':
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
            <div title='Ante Proyectos Recibidos' className={`boton ${isActive('/anteproyectosrecibidos') ? 'activo' : ''}`} onClick={() => navigateTo('/anteproyectosrecibidos')}>
                <FaWpforms className="icono" />
                <h1>AnteProyectos Recibidos <br /> Interno</h1>
            </div>
            <div title='Asignación Asesor Interno' className={`boton ${isActive('/asignacionasesoresint') ? 'activo' : ''}`} onClick={() => navigateTo('/asignacionasesoresint')}>
                <FaRegListAlt className="icono" />
                <h1>Asignación Asesor <br /> Interno</h1>
            </div>
            <div title='Evaluación Seguimiento' className={`boton ${isActive('/evaluacionseguimiento') ? 'activo' : ''}`} onClick={() => navigateTo('/evaluacionseguimiento')}>
                <FaRegFileAlt className="icono" />
                <h1>Evaluación<br />Seguimiento</h1>
            </div>
            <div title='Evaluación Reporte' className={`boton ${isActive('/evaluacionreporte') ? 'activo' : ''}`} onClick={() => navigateTo('/evaluacionreporte')}>
                <FaRegFileAlt className="icono" />
                <h1>Evaluación<br />Reporte</h1>
            </div>
           {/* <div title='Evaluaciones seguimiento' className={`boton ${isActive('/evaluacionesseguimiento') ? 'activo' : ''}`} onClick={() => navigateTo('/evaluacionesseguimiento')}>
                <FaRegFileAlt className="icono" />
                <h1>Evaluaciones<br />Seguimiento</h1>
    </div>*/}
            <div title='Evaluaciones Reporte' className={`boton ${isActive('/evaluacionesreporte') ? 'activo' : ''}`} onClick={() => navigateTo('/evaluacionesreporte')}>
                <FaRegFileAlt className="icono" />
                <h1>Evaluaciones<br />Reporte</h1>
            </div>
            <div title='Salir' className={`boton ${isActive('/salir') ? 'activo' : ''}`} onClick={() => navigateTo('/salir')}>
                <FaSignOutAlt className="icono" />
                <h1>Salir</h1>
            </div>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Barra;