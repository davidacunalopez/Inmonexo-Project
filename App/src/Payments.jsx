import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faBuilding, faUsers, faNetworkWired, faMoneyCheckAlt, faCalendarAlt, faCog 
} from '@fortawesome/free-solid-svg-icons';
import './Payments.css';
import { usePay } from './context/payContext'
import { useAuth } from './context/authContext'

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [payments, setPayments] = useState({ Mensual: [], Trimestral: [], Semestral: [], Anual: [] });

  const { getPaysUser, userPays, deletePay } = usePay();
  const {user} = useAuth();

  // Simulación de datos de ejemplo, se comenta esta sección y se descomenta la llamada al backend cuando esté disponible
  useEffect(() =>{
    getPaysUser(user);
  }, [])

  useEffect(() => {
    // Simulación de datos
    const sortedPayments = { Mensual: [], Trimestral: [], Semestral: [], Anual: [] };
    userPays.forEach(payment => {
      sortedPayments[payment.tipo].push(payment);
    });
    setPayments(sortedPayments);
  }, [userPays]);

  /* Descomentar esto para usar con el backend
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payments');
        const sortedPayments = { mensual: [], trimestral: [], semestral: [], anual: [] };
        response.data.forEach(payment => {
          sortedPayments[payment.term].push(payment);
        });
        setPayments(sortedPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);
  */

  const deletePayment = (term, id) => {
    try {
      deletePay(id);
      setPayments(prevPayments => ({
        ...prevPayments,
        [term]: prevPayments[term].filter(payment => payment.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
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
              <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="InmoNexo Logo" className="logo"/>
            </Link>
          </div>
          <div className="user-container">
            <Link to="/account-info" className="account-info-btn" aria-label="Configuración de la cuenta">
              <FontAwesomeIcon icon={faCog} className="menu-icon" />
            </Link>
          </div>
        </nav>
        <section className="content">
          <h1>Seguimiento de pagos</h1>
          {Object.entries(payments).map(([tipo, paymentsList]) => (
            <div key={tipo} role="list">
              <h2>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
              {paymentsList.map(payment => (
                <div key={payment.id} className="payment-card"  role="listitem">
                  <p>{payment.detalles} - ${payment.monto} - {payment.nombre}</p>
                  <div className="button-group">
                    <button onClick={() => deletePayment(payment.tipo, payment.id)} className="delete-button" aria-label="Eliminar pago">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Payments;
