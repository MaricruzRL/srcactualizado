import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTh, FaRegListAlt, FaSignOutAlt } from "react-icons/fa";
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
            <div title='Anteproyectos' className={`boton ${isActive('/anteproyectosrecibidos') ? 'activo' : ''}`} onClick={() => navigateTo('/anteproyectosrecibidos')}>
                <FaRegListAlt className="icono" />
                <h1>Anteproyectos <br /> Recibidos</h1>
            </div>
              {/* Nueva ruta para salir */}
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
