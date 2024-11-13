import React, { useEffect, useState } from 'react';
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
  faPlusSquare, 
  faCamera 
} from '@fortawesome/free-solid-svg-icons';
import './AddProperties.css';
import { usePropertie } from './context/propertiesContext'
import { useAuth } from './context/authContext'

const AddProperties = () => {
  const location = useLocation();
  const { addPropertie } = usePropertie();
  const { user } = useAuth();
  const navigate = useNavigate()

  const [property, setProperty] = useState({
    name: '',
    address: '',
    type: '',
    price: '',
    status: '',
    concurrentPayments: [{ detail: '', cost: '' }],
    description: '',
    capacity: '',
    usuarioid : 0,
    images: [],
  });

  useEffect(() => {
    property.usuarioid = user;
  }, [])

  // cambiar para diferentes tipos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    // aquí se almacenarían las imágenes como un array
    setProperty({ ...property, images: [...property.images, ...e.target.files] });
  };

  const handleAddPayment = () => {
    setProperty({ ...property, payments: [...property.payments, { detail: '', cost: '' }] });
  };

  const handlePaymentChange = (index, e) => {
    const updatedPayments = [...property.payments];
    updatedPayments[index][e.target.name] = e.target.value;
    setProperty({ ...property, payments: updatedPayments });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // -------------handle del backend-------------
    console.log('Form submitted', property);
    if(property.status == "disponible"){
      property.status = 0;
    } else if(property.status == "vendido"){
      property.status = 1;
    } else {
      property.status = 2;
    }
    addPropertie(property);

    navigate('/properties')
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
          <h1>Crea una nueva propiedad</h1>
          <form className="property-form" onSubmit={handleSubmit} aria-describedby="formHelp">
            {/* Nombre */}
            <div className="form-group">
              <label htmlFor="name">Nombre de la propiedad:</label>
              <input type="text" id="name" name="name" value={property.name} onChange={handleChange} required aria-required="true"/>
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección:</label>
              <input type="text" id="address" name="address" value={property.address} onChange={handleChange} required aria-required="true"/>
            </div>

            <div className="form-group">
              <label htmlFor="type">Tipo:</label>
              <select id="type" name="type" value={property.type} onChange={handleChange} required aria-required="true">
                <option value="">Seleccione</option>
                <option value="alquiler">Alquiler</option>
                <option value="venta">Venta</option>
              </select>
            </div>

            {/* Precio */}
            <div className="form-group">
              <label htmlFor="price">Precio:</label>
              <input type="number" id="price" name="price" value={property.price} onChange={handleChange} required aria-required="true"/>
            </div>

            <div className="form-group">
              <label htmlFor="status">Estado:</label>
              <select id="status" name="status" value={property.status} onChange={handleChange} required aria-required="true">
                <option value="">Seleccione</option>
                <option value="disponible">Disponible</option>
                <option value="vendido">Vendido</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>

            {/* Pagos Concurrentes */}
            {/* {property.concurrentPayments.map((payment, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={`detail-${index}`}>Detalle del Pago {index + 1}:</label>
                <input
                  type="text"
                  id={`detail-${index}`}
                  name="detail"
                  value={payment.detail}
                  onChange={(e) => handlePaymentChange(index, e)}
                  required
                />
                <label htmlFor={`cost-${index}`}>Costo Mensual:</label>
                <input
                  type="number"
                  id={`cost-${index}`}
                  name="cost"
                  value={payment.cost}
                  onChange={(e) => handlePaymentChange(index, e)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddPayment} className="add-payment-btn">Agregar pago concurrente</button> */}

            {/* Descripción */}
            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <textarea id="description" name="description" value={property.description} onChange={handleChange} required aria-required="true"/>
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacidad:</label>
              <input type="number" id="capacity" name="capacity" value={property.capacity} onChange={handleChange} required aria-required="true"/>
            </div>

            <div className="form-group">
              <label htmlFor="images">Imágenes:</label>
              <input type="file" id="images" name="images" multiple onChange={handleImageChange} aria-describedby="imageHelp"/>
              <div id="imageHelp" className="visually-hidden">
                Seleccione una o más imágenes para cargar como parte del registro de la propiedad.
            </div>
            </div>

            <button type="submit" className="submit-btn">Crear propiedad</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddProperties;
