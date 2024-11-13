import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBuilding,
  faUsers,
  faNetworkWired,
  faMoneyCheckAlt,
  faCalendarAlt,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import './Accessibility.css';
import { useAccessibility } from './AccessibilityContext';

const Accessibility = () => {
  const location = useLocation();
  const { highContrastMode, toggleHighContrast } = useAccessibility(); // Utiliza el hook de contexto de accesibilidad

  const handleContrastChange = (event) => {
    // si el modo de alto contraste debe estar activado
    const isHighContrast = event.target.value === 'highContrast';
    toggleHighContrast(isHighContrast);
  };

  const menuItems = [
    { name: 'Página principal', icon: faHome, path: '/dashboard' },
    { name: 'Propiedades', icon: faBuilding, path: '/properties' },
    { name: 'Clientes', icon: faUsers, path: '/clients' },
    { name: 'Seguimiento pagos', icon: faMoneyCheckAlt, path: '/payments' },
    { name: 'Calendario', icon: faCalendarAlt, path: '/calendar' }
    //{ name: 'Configuración', icon: faCog, path: '/settings' },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        {menuItems.map(item => (
          <Link key={item.name} to={item.path} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            aria-current={location.pathname === item.path ? 'page' : undefined}>
            <FontAwesomeIcon icon={item.icon} className="menu-icon" />
            {item.name}
          </Link>
        ))}
      </aside>
      
      <div className="main-content">
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/dashboard" aria-label="Volver a la página de inicio">
              <img 
                src={`${process.env.PUBLIC_URL}/logo2.png`} 
                alt="InmoNexo Logo" 
                className="logo"
              />
            </Link>
          </div>
          <div className="user-container">
            <Link to="/account-info" className="account-info-btn" aria-label="Configuración de la cuenta">
              <FontAwesomeIcon icon={faCog} className="menu-icon" />
            </Link>
          </div>
        </nav>
        <section className="content">
          <h1>Configuraciones de accesibilidad</h1>
          <div className="accessibility-settings">
            <label htmlFor="contrast-select">Contraste de Colores:</label>
            <select
              id="contrast-select"
              onChange={handleContrastChange}
              value={highContrastMode ? 'highContrast' : 'normal'}
              aria-describedby="contrastHelp"
            >
              <option value="normal">Desactivado</option>
              <option value="highContrast">Modo Contraste</option>
            </select>
            <div id="contrastHelp" className="visually-hidden">
              Seleccione el modo de alto contraste para mejorar la visibilidad.
            </div>
          </div>

          {/* Nuevo contenedor para guía de navegación por teclado con estilo personalizado */}
          <div className="keyboard-navigation-guide" style={{ backgroundColor: '#4E5D6C', padding: '20px', borderRadius: '8px' }}>
            <h2>Guía de navegación por teclado</h2>
            <p>
              Utiliza las siguientes teclas para navegar por la aplicación de manera más eficiente:
            </p>
            <ul style={{ listStyleType: 'disc', marginLeft: '20px'}}>
              <li><strong>Tab</strong> (Tabulador): Moverse hacia adelante a través de los elementos interactivos de la página.</li>
              <li><strong>Shift + Tab</strong>: Moverse hacia atrás a través de los elementos interactivos.</li>
              <li><strong>Enter</strong> (Intro): Activar botones seleccionados, enlaces o acciones.</li>
              <li><strong>Arrow Keys</strong> (Flechas): Navegar dentro de los elementos como menús desplegables y controles de formulario.</li>
              <li><strong>Esc</strong> (Escape): Cerrar menús o diálogos abiertos.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Accessibility;
