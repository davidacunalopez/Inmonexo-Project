import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
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
import './Payments.css';
import { useAuth } from './context/authContext'
import { usePropertie } from './context/propertiesContext'
import { useClient } from './context/clientContext'

const AddClients = () => {
  const location = useLocation();
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    propertyId: '',
    origin: '',
    type: '',
    details: '',
    usuarioid: 0
  });
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const { user } = useAuth();
  const { getPropertiesName, propertiesName } = usePropertie();
  const { postClient } = useClient();

  useEffect(() => {
    // Simular el fetch del backend
    getPropertiesName(user);
  }, []);

  useEffect(() => {
    setProperties(propertiesName)
    clientData.usuarioid = user;
  }, [propertiesName])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting client data:', clientData);
    // Backend del submit botón
    if(clientData.type == 'Propietario'){
      clientData.type = 0;
    } else {
      clientData.type = 1;
    }
    postClient(clientData);
    navigate('/dashboard');
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
          <h1>Agregar Clientes</h1>
          <form onSubmit={handleSubmit} aria-describedby="formInstructions">
            <p id="formInstructions" className="visually-hidden">
              Complete los campos a continuación para agregar un nuevo cliente.
            </p>
            <div className="form-group">
              <label>Nombre:</label>
              <input type="text" name="name" value={clientData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Correo:</label>
              <input type="email" name="email" value={clientData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Propiedad:</label>
              <select name="propertyId" value={clientData.propertyId} onChange={handleChange} required>
                <option value="">Seleccione una propiedad</option>
                {properties.map(property => (
                  <option key={property.id} value={property.id}>{property.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Origen:</label>
              <input type="text" name="origin" value={clientData.origin} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Tipo:</label>
              <select name="type" value={clientData.type || ''} onChange={handleChange} required>
                <option value="">Seleccione una opción</option>
                <option value="Propietario">Propietario</option>
                <option value="Agente">Agente Inmobiliario</option>
              </select>
            </div>
            <div className="form-group">
              <label>Detalles:</label>
              <textarea name="details" value={clientData.details} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="submit-btn">Agregar cliente</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddClients;
