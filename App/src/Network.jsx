import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import './Network.css';
import { usePropertie } from './context/propertiesContext'

const Network = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const {getPropertieRed, propertiesRed} = usePropertie();

  const menuItems = [
    { name: 'Página principal', icon: faHome, path: '/dashboard' },
    { name: 'Propiedades', icon: faBuilding, path: '/properties' },
    { name: 'Clientes', icon: faUsers, path: '/clients' },
    { name: 'Seguimiento pagos', icon: faMoneyCheckAlt, path: '/payments' },
    { name: 'Calendario', icon: faCalendarAlt, path: '/calendar' }
    //{ name: 'Configuración', icon: faCog, path: '/settings' },
  ];

  // Simulación de datos de propiedades en red activa
  useEffect(() => {
    getPropertieRed();
  }, [])

  useEffect(() => {
    propertiesRed.forEach(function(propiedad) {
      propiedad.imgURL = getRandomImageUrl();
    });

    setProperties(propertiesRed);
  }, [propertiesRed]);

  const handleNavigateToDetailNetwork = (propId) => {
    navigate('/detailsnetwork', { state: { propId } });
  };

  // generar una URL de imagen aleatoria
  const getRandomImageUrl = () => {
    const randomNumber = Math.floor(Math.random() * 12) + 1; // entre 1 y 12
    return `${process.env.PUBLIC_URL}/images/casa${randomNumber}.png`;
  };



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
          <h1>Red InmoNexo</h1>
          <div className="net-properties-container">
            {properties.map((prop) => (
              <button key={prop.id} className="net-property-card" onClick={() => handleNavigateToDetailNetwork(prop.id)} aria-label={`Ver detalles de ${prop.title}`}>
                <div className="net-property-image" style={{ backgroundImage: `url(${prop.imgURL})` }}>
                  <div className="net-property-title">{prop.nombre}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="action-buttons">
            <button onClick={() => navigate('/properties')} className="btn" aria-label="Importar propiedades a tu cuenta">Importar Propiedades</button>
            <button onClick={() => navigate('/properties')} className="btn" aria-label="Filtrar tus propiedades activas">Filtrar Mis Propiedades Activas</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Network;
