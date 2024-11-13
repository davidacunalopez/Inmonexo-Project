import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // useNavigate en lugar de useHistory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBuilding,
  faUsers,
  faNetworkWired,
  faMoneyCheckAlt,
  faCalendarAlt,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './User.css';
import { useAuth } from './context/authContext'

const User = () => {
  const navigate = useNavigate(); // usar useNavigate aquís
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    rol: '' // no editable
  });

  const [userRol, setUserRol] = useState('');

  const { user, userInfoRequest, dataUser, editUser } = useAuth();

  
  useEffect(() => {
    // Simulación de carga de datos desde la base de datos
    // TODO: Reemplazar con la llamada del backend
    if (dataUser.rol == 0){
      setUserRol("Propietario");
    } else {
      setUserRol("Agente");
    }
    setUserInfo({
      
      nombre: dataUser.nombre,
      email: dataUser.correo,
      contraseña: '',
      rol: userRol // o 'Propietario'
    });
  }, [dataUser]);

  useEffect(() => {
    userInfoRequest(user);
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleSaveChanges = () => {
    console.log('Guardando cambios...', userInfo);
    // Enviar datos al backend y luego manejar respuesta
    if(userInfo.contraseña.length < 4){
      alert("La contraseña debe de ser mayor a los 4 caracteres")
    }
    else{

      const data = {
        name: userInfo.nombre,
        email: userInfo.email,
        password: userInfo.contraseña,
      }

      editUser(user, data);
      navigate('/dashboard');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.')) {
      console.log('Cuenta eliminada');
      navigate('/'); 
    }
  };

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    navigate('/');
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
            <button onClick={handleLogout} className="logout-btn" aria-label="Cerrar sesión">
              <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
              Salir
            </button>
          </div>
        </nav>
        <section className="content">
          <h1>Información de la Cuenta</h1>
          <form className="account-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={userInfo.nombre} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo:</label>
              <input type="email" id="email" name="email" value={userInfo.email} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="contraseña">Contraseña:</label>
              <input type="password" id="contraseña" name="contraseña" value={userInfo.contraseña} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="rol">Rol:</label>
              <input type="text" id="rol" name="rol" value={userInfo.rol} readOnly aria-readonly="true"/>
            </div>
            <div className="form-actions">
              <button type="button" className="save-btn" onClick={handleSaveChanges} aria-label="Guardar cambios en la cuenta">Guardar Cambios</button>
              <button type="button" className="delete-btn" onClick={handleDeleteAccount} aria-label="Eliminar cuenta permanentemente">Eliminar Cuenta</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default User;
