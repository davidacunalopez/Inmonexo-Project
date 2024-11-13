import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding, faUsers, faWallet, faChartLine, faNetworkWired, faMoneyCheckAlt, faCalendarAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import ActivityChart from './ActivityChart';
import {usePay} from './context/payContext';
import {useClient} from './context/clientContext';
import {usePropertie} from './context/propertiesContext'
import {useAuth} from './context/authContext'

const Dashboard = () => {
  const location = useLocation();
  const [recentClients, setRecentClients] = useState([]);

  const {getClients, clientsData, getFiveClient, fiveClient} = useClient();
  const {getPropertieAlquiler, getPropertieCompra, propertieAlquiler, propertieCompra} = usePropertie();
  const {getPaysUser, userPays} = usePay();
  const {user, userInfoRequest, dataUser} = useAuth();

  const [userData, setUserData] = useState({nombre : ''}); ; // Simulación de datos del usuario, cambiar por datos reales del backend

  useEffect(() => {
    getClients(user);
    getPropertieAlquiler(user);
    getPropertieCompra(user);
    userInfoRequest(user);
    getFiveClient(user);
    getPaysUser(user);
  }, []);

  useEffect(() => {
    setUserData(dataUser);
  }, [dataUser])

  useEffect(() => {
    setRecentClients(fiveClient);
  }, [fiveClient])

  // Simulación de datos de clientes, reemplazar con llamada al API
 

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const menuItems = [
    { name: 'Página principal', icon: faHome, path: '/dashboard' },
    { name: 'Propiedades', icon: faBuilding, path: '/properties' },
    { name: 'Clientes', icon: faUsers, path: '/clients' },
    { name: 'Seguimiento pagos', icon: faMoneyCheckAlt, path: '/payments' },
    { name: 'Calendario', icon: faCalendarAlt, path: '/calendar' }//,
    //{ name: 'Configuración', icon: faCog, path: '/settings' },
  ];

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
            <button 
              onClick={handleLogout} 
              className="logout-btn" 
              aria-label="Salir de la sesión">
              Salir de sesión
            </button>
          </div>
        </nav>
        <section className="content" aria-label="Resumen del dashboard">
          <h1>Hola {userData.nombre}</h1>
          <p>Un gusto volver a gestionar tus propiedades</p>
          <div className="stats" role="group" aria-label="Estadísticas clave">
            <div className="stat-card" role="article" aria-label="Propiedades en venta">
              <FontAwesomeIcon icon={faBuilding} className="stat-icon"/>
              <h3>{propertieCompra.length}</h3>
              <p>Propiedades en venta</p>
            </div>
            <div className="stat-card" role="article" aria-label="Propiedades en alquiler">
              <FontAwesomeIcon icon={faBuilding} className="stat-icon"/>
              <h3>{propertieAlquiler.length}</h3>
              <p>Propiedades en alquiler</p>
            </div>
            <div className="stat-card" aria-label="Clientes totales">
              <FontAwesomeIcon icon={faUsers} className="stat-icon"/>
              <h3>{clientsData.length}</h3>
              <p>Clientes totales</p>
            </div>
            <div className="stat-card" aria-label="Pagos totales">
              <FontAwesomeIcon icon={faWallet} className="stat-icon"/>
              <h3>{userPays.length}</h3>
              <p>Pagos totales</p>
            </div>
          </div>
          <div className="dual-container">
            <div className="activity" role="complementary">
              <ActivityChart />
            </div>
            <div className="recent-clients">
              <h2>Últimos clientes añadidos</h2>
              <ul aria-label="Lista de clientes recientes">
                {recentClients.map(client => (
                  <li key={client.id}>{client.nombre} - {client.origen}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="actions">
            <Link to="/clients" className="action-button" aria-label="Ver lista completa de clientes">Ver lista de clientes</Link>
            <Link to="/properties" className="action-button" aria-label="Administrar propiedades">Gestionar propiedades</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
