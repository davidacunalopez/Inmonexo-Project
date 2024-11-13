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
  faCog,
  faPlus,
  faEdit,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import './Clientes.css';
import { useAuth } from './context/authContext'
import { useClient } from './context/clientContext'

const Clientes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Estado para la lista de clientes
  const [clients, setClients] = useState([]);

  const menuItems = [
    { name: 'Página principal', icon: faHome, path: '/dashboard' },
    { name: 'Propiedades', icon: faBuilding, path: '/properties' },
    { name: 'Clientes', icon: faUsers, path: '/clients' },
    { name: 'Seguimiento pagos', icon: faMoneyCheckAlt, path: '/payments' },
    { name: 'Calendario', icon: faCalendarAlt, path: '/calendar' }
    //{ name: 'Configuración', icon: faCog, path: '/settings' },
  ];

  const { user } = useAuth();
  const { getClients, clientsData, removeClient } = useClient();

  useEffect(() => {
    setClients(clientsData);
  }, [clientsData])


  // simulado con datos de prueba por ahora
  useEffect(() => {
    // Descomentar y actualizar con una llamada al backend
    getClients(user);

    // Datos de prueba para clientes
    /*
    const mockClients = [
      { id: 1, name: 'Juan Perez', email: 'juanperez@example.com', origin: 'Referido', type: 'Propietario', property: 'Casa moderna', details: 'Interesado en alquilar' },
      { id: 2, name: 'Ana González', email: 'anagonzalez@example.com', origin: 'Internet', type: 'Agente Inmobiliario', property: 'Casa amueblada en la ciudad', details: 'Pendiente de cancelar' },
      { id: 3, name: 'Mario Chacón', email: 'machacon@example.com', origin: 'Facebook', type: 'Propietario', property: 'Casa moderna', details: 'Cancelado' },
      { id: 1, name: 'Juan Perez', email: 'juanperez@example.com', origin: 'Referido', type: 'Propietario', property: 'Casa moderna', details: 'Interesado en alquilar' },
      { id: 2, name: 'Ana González', email: 'anagonzalez@example.com', origin: 'Internet', type: 'Agente Inmobiliario', property: 'Casa rústica con acabados en piedra', details: 'Pendiente de cancelar' },
      { id: 3, name: 'Mario Chacón', email: 'machacon@example.com', origin: 'Facebook', type: 'Propietario', property: 'Casa moderna', details: 'Cancelado' },
      { id: 1, name: 'Juan Perez', email: 'juanperez@example.com', origin: 'Referido', type: 'Propietario', property: 'Casa moderna', details: 'Interesado en alquilar' },
      { id: 2, name: 'Ana González', email: 'anagonzalez@example.com', origin: 'Internet', type: 'Agente Inmobiliario', property: 'Casa moderna', details: 'Pendiente de cancelar' },
      { id: 3, name: 'Mario Chacón', email: 'machacon@example.com', origin: 'Facebook', type: 'Propietario', property: 'Casa moderna', details: 'Cancelado' },
    ];
    */
    // Establecer los datos de prueba en el estado
    //setClients(mockClients);
  }, []);

  const handleEditClient = (clientId) => {
    navigate('/editclients', { state: { clientId } });
  };

  const handleDeleteClient = (clientId) => {
    console.log('Delete client', clientId);
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente? Esta acción es irreversible.')) {
      // TODO: Implementar la lógica para eliminar el cliente en el backend
      console.log('Cliente eliminado');
      // Eliminar cliente en el backend y manejar respuesta / Update
      removeClient(clientId);
      navigate('/dashboard');
    }
  };

  const handleAddClient = () => {
    console.log('Add new client');
    // este handle también queda medio obsoleto porque todo se está manejando con links / edit: ni tanto bro
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        {menuItems.map(item => (
          <Link key={item.name} to={item.path} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}>
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
          <h1>Listado de clientes</h1>
          <div className="table-container">
            <table className="clients-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Origen</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Propiedad</th>
                  <th scope="col">Detalles</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.nombre}</td>
                  <td>{client.correo}</td>
                  <td>{client.origen}</td>
                  <td>{client.tipo}</td>
                  <td>{client.nombrepropiedad}</td>
                  <td>{client.descripcion}</td>
                  <td>
                    <button onClick={() => handleEditClient(client.id)} className="icon-button" aria-label={`Edit ${client.name}`}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteClient(client.id)} className="icon-button" aria-label={`Delete ${client.name}`}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <Link to="/addclients" className="btn btn-add-client" aria-label="Añadir nuevo cliente">
            <FontAwesomeIcon icon={faPlus} /> Añadir Cliente
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Clientes;
