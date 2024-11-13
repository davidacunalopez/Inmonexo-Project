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
import './AddClients.css';
import { useClient } from './context/clientContext'

const EditClients = () => {
  const navigate = useNavigate(); // usar useNavigate aquís
  const location = useLocation();
  const clientId = location.state ? location.state.clientId : null;

  const { client, getInfoClient, editClient } = useClient();

  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    origin: '',
    type: '', 
    details: ''
  });

  useEffect(() => {
    getInfoClient(clientId);
  }, []);

  
  useEffect(() => {
    if(!client[0]){

    }else{
      console.log("Cliente id", clientId)
      console.log("Cliente", client[0])
      clientData.name = client[0].nombre;
      clientData.email = client[0].correo;
      clientData.origin = client[0].origen;
      clientData.details = client[0].descripcion; 
      if(client[0].tipo == 0){
        clientData.type = "Propietario";
      }
      else{
        clientData.type = "Agente";
      }
    }
  }, [client]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting client data:', clientData);
    // Actualización de los datos del cliente
    
    const data = {
      name : clientData.name,
      email : clientData.email,
      origin : clientData.origin,
      type : clientData.type,
      details : clientData.details
    }

    if(data.type == "Propietario"){
      data.type = 0
    } else{
      data.type = 1
    }
    
    editClient(clientId, data);
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
        <section className="content">
          <h1>Editar cliente</h1>
          <form onSubmit={handleSubmit} aria-label="Formulario de edición de cliente">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input type="text" name="name" value={clientData.name || ''} onChange={handleChange} required aria-required="true"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo:</label>
              <input type="email" name="email" value={clientData.email || ''} onChange={handleChange} required aria-required="true"/>
            </div>
            <div className="form-group">
              <label htmlFor="origin">Origen:</label>
              <input type="text" name="origin" value={clientData.origin || ''} onChange={handleChange} required aria-required="true"/>
            </div>
            <div className="form-group">
              <label htmlFor="type">Tipo:</label>
              <select name="type" value={clientData.type || ''} onChange={handleChange} required aria-required="true">
                <option value="">Seleccione una opción</option>
                <option value="Propietario">Propietario</option>
                <option value="Agente">Agente inmobiliario</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="details">Detalles:</label>
              <textarea name="details" value={clientData.details || ''} onChange={handleChange} required aria-required="true"></textarea>
            </div>
            <button type="submit" className="submit-btn" aria-label="Guardar cambios del cliente">Guardar cambios</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditClients;
