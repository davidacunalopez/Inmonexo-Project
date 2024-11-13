import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faHome,
  faBuilding,
  faUsers,
  faNetworkWired,
  faMoneyCheckAlt,
  faCalendarAlt,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import './Propiedades.css';
import { useAuth } from './context/authContext'
import { usePropertie } from './context/propertiesContext'

const Propiedades = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const {user} = useAuth();
  const {getMyProperties, propertiesData} = usePropertie();

  // genera url random
  const getRandomImageUrl = () => {
    const randomNumber = Math.floor(Math.random() * 12) + 1; // genera número entre 1 y 12
    return `${process.env.PUBLIC_URL}/images/casa${randomNumber}.png`;
  };

  useEffect(() => {
    getMyProperties(user);
  }, [])
  // usar ester useEffect para datos simulados (se puede comentar esto cuando se use la base de datos)
  useEffect(() => {
    // Mock data setup
    propertiesData.forEach(function(propiedad) {
      propiedad.imgURL = getRandomImageUrl();
    })
    
    setProperties(propertiesData);
  }, [propertiesData]);

  const handlePropertyClick = (id) => {
    // redirige
    console.log("Property clicked:", id);
  };

  const handleNavigateToDetails = (propId) => {
    navigate('/details', { state: { propId } });
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
          <Link key={item.name} to={item.path} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`} aria-current={location.pathname === item.path ? 'page' : undefined}>
            <FontAwesomeIcon icon={item.icon} className="menu-icon" />
            {item.name}
          </Link>
        ))}
      </aside>
      <div className="main-content">
        <nav className="navbar">
          <div className="logo-container">
            <Link to="/dashboard" aria-label="Volver a la página de inicio">
              <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="InmoNexo Logo" className="logo" />
            </Link>
          </div>
          <div className="user-container">
            <Link to="/account-info" className="account-info-btn" aria-label="Configuración de la cuenta">
              <FontAwesomeIcon icon={faCog} className="menu-icon" />
            </Link>
          </div>
        </nav>
        <div className="fixed-header">
          <h1>Administra tus propiedades o crea nuevas</h1>
        </div>
        <div className="scrollable-content">
          <div className="properties-container">
            {properties.map((prop) => (
              <button key={prop.id} className="property-card" onClick={() => handleNavigateToDetails(prop.id)} aria-label={`Ver detalles de ${prop.title}`}>
                <div className="property-image" style={{ backgroundImage: `url(${prop.imgURL})` }}>
                  <div className="property-title">{prop.nombre}</div>
                </div>
              </button>
            ))}
            <Link to="/addproperty" className="property-card add-new" aria-label="Agregar nueva propiedad">
              <FontAwesomeIcon icon={faPlus} className="add-icon" />
            </Link>
          </div>
        </div>
        <div className="fixed-footer">
          <Link to="/clients" className="btn" aria-label="Ver lista de clientes">Ver lista de clientes</Link>
        </div>
      </div>
    </div>
  );
};

export default Propiedades;
