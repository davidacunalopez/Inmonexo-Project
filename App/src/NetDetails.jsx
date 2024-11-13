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
import './NetDetails.css';
import { useAccessibility } from './AccessibilityContext';
import {usePropertie} from './context/propertiesContext'
import {usePay} from './context/payContext'

const NetDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propId = location.state?.propId;
  const { highContrastMode, toggleHighContrast } = useAccessibility(); // usa el hook de accesibilidad

  const { getPropertieInfo, propertie, changeAgent } = usePropertie();
  const {getPaysPropertie, payPropertie} = usePay();

  const handleContrastChange = (event) => {
    // elige si el modo de contraste debe estar activo
    const isHighContrast = event.target.value === 'highContrast';
    toggleHighContrast(isHighContrast);
  };
  
  // Simulación de datos de la propiedad
  const [property, setProperty] = useState({
    nombre : '',
    direccion : '',
    tipo : '',
    precio: 0,
    descripcion : ''
  });

  // Simulación de datos del propietario
  const [ownerInfo, setOwnerInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com'
  });

  // Simulación de pagos asociados
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Aquí se realizaría la carga de datos de la API
    // fetchPropertyDetails(propId);
    getPropertieInfo(propId);
    getPaysPropertie(propId);
  }, []);

  useEffect(() => {
    setPayments(payPropertie)
  }, [payPropertie])

  useEffect(() => {
    if(propertie[0]){
      setProperty(propertie[0]);
      console.log(propertie[0]);
    }
  }, [propertie])

  const openQRCode = () => {
    window.open(`${process.env.PUBLIC_URL}/images/qrcode.png`, '_blank');
  };

  const handleWorkOnProperty = () => {
    changeAgent(propId, {agent : 1})
    navigate('/network');  // Navega de vuelta a la pantalla de Red InmoNexo
  };

  // Función simulada para cargar detalles de la propiedad (actualmente sólo simula la carga)
  const fetchPropertyDetails = async (propId) => {
    console.log('Fetching property details for ID:', propId);
    // Simular carga de datos
    // const response = await fetch(`/api/properties/${propId}`);
    // const data = await response.json();
    // setProperty(data);
    // setPayments(data.payments);
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
            <h1>Detalles de propiedad en Red InmoNexo</h1>

            <div className="property-info">
                <h2>Información Básica</h2>
                <p><strong>Nombre:</strong> {property.nombre}</p>
                <p><strong>Dirección:</strong> {property.direccion}</p>
                <p><strong>Tipo:</strong> {property.tipo}</p>
                <p><strong>Costo Estimado:</strong> ${property.precio}</p>
                <p><strong>Descripción:</strong> {property.descripcion}</p>
            </div>

            <div className="property-images">
                <h2>Imágenes de la Propiedad</h2>
                <div className="images-container">
                <img src="https://via.placeholder.com/300x200" alt="Imagen 1" />
                <img src="https://via.placeholder.com/300x200" alt="Imagen 2" />
                <img src="https://via.placeholder.com/300x200" alt="Imagen 3" />
                </div>
            </div>

            {/* Pagos recurrentes */}
            <div className="property-payments">
                <h2>Pagos Asociados</h2>
                <ul>
                {payments.map(payment => (
                    <li key={payment.id}>{payment.detalles} - ${payment.monto}</li>
                ))}
                </ul>
            </div>

            {/* Información del propietario */}
            <div className="property-payments">
              <h2>Información del Propietario</h2>
              <p><strong>Nombre:</strong> {ownerInfo.name}</p>
              <p><strong>Correo:</strong> {ownerInfo.email}</p>
              <p>Si va a trabajar con esta propiedad es recomendable que contacte al propietario por medio de correo electrónico para conversar los detalles.</p>
            </div>

            <div className="actions">
                <button className='net-btn' onClick={handleWorkOnProperty} aria-label="Trabajar en esta propiedad">Trabajar en esta propiedad</button>
                <button className='net-btn' onClick={openQRCode} aria-label="Generar código QR para la propiedad">Generar código QR</button>
            </div>
        </section>

      </div>
    </div>
  );
};

export default NetDetails;
