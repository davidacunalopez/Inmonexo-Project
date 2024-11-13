import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faBuilding, 
  faUsers, 
  faNetworkWired, 
  faMoneyCheckAlt, 
  faCalendarAlt, 
  faCog, 
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';
import { useEvent } from './context/eventContext'
import { useAuth } from './context/authContext'

const Calendario = () => {

  const { user } = useAuth();
  const { postEvent } = useEvent();
  const { getEvents, events} = useEvent();
  const { editEvent } = useEvent();
  const { deleteEvent } = useEvent();

  const location = useLocation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  const [activities, setActivities] = useState([]);
  const [userId, setUserId] = useState(user);

  // Modal para editar actividades
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const handleOpenModal = (activity) => {
    setEditId(activity.id);
    setActivityName(activity.nombre);
    setActivityDescription(activity.descripcion);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditId(null);
    setActivityName('');
    setActivityDescription('');
  };
  
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');

  const filteredEvents = events.filter(event => {
    const formattedEventDate = new Date(event.fechaevento).toISOString().split('T')[0];
    return formattedEventDate === formattedCurrentDate;
  });

  const menuItems = [
    { name: 'Página principal', icon: faHome, path: '/dashboard' },
    { name: 'Propiedades', icon: faBuilding, path: '/properties' },
    { name: 'Clientes', icon: faUsers, path: '/clients' },
    { name: 'Seguimiento pagos', icon: faMoneyCheckAlt, path: '/payments' },
    { name: 'Calendario', icon: faCalendarAlt, path: '/calendar' }
    //{ name: 'Configuración', icon: faCog, path: '/settings' },
  ];

  useEffect(() => {
    try {
      getEvents(userId);
      console.log(currentDate);
      console.log(events);
      //getEvents(userId);
    } catch (error) {
      console.log("error");
    }

  }, [currentDate]);
  
  const handleDateChange = date => {
    setCurrentDate(date);
  };

  const handleAddActivity = async() => {
    if (!activityName || !activityDescription) {
      alert('Por favor, ingrese un nombre y una descripción para la actividad.');
      return;
    }
    const newActivity = {
      name: activityName,
      details: activityDescription,
      state : 0,
      date: currentDate.toISOString().split('T')[0],  // solo se almacena la parte de la fecha
      usuarioid : user
    };
    try{
      console.log(newActivity)
      await postEvent(newActivity);
      await getEvents(userId);
      setActivityName('');
      setActivityDescription('');
    } catch (error) {
      console.log("error");
    }

    //actualiza la lista de eventos con el useEffect
  };

  const handleDeleteActivity = async(id) => {
    console.log("PRAAAAAA");
    try {
      await deleteEvent(id); // Llama a deleteEvent para eliminar el evento en el backend
      await getEvents(userId); // Recarga los eventos para reflejar el cambio
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
    }
  };

  const handleEditActivity = async(id) => {
    if (!activityName || !activityDescription) {
      alert('Por favor, ingrese un nombre y una descripción para la actividad.');
      return;
    }
    const updatedData = {
      name: activityName,
      details: activityDescription,
      state : 0
    };
    try {
      await editEvent(editId, updatedData); // Llama a editEvent para actualizar el evento en el backend
      await getEvents(user); // Recarga los eventos para reflejar el cambio
      handleCloseModal();
    } catch (error) {
      console.error("Error al editar el evento:", error);
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.date === currentDate.toISOString().split('T')[0]
  );

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
              <FontAwesomeIcon icon={faCog} className="menu-icon"/>
            </Link>
          </div>
        </nav>
        <h1 className='titulo1'>Calendario</h1>
        <section className="content-calendar">
          <div className="activities-section">
            <div className="add-activity">
              <input value={activityName} onChange={e => setActivityName(e.target.value)} placeholder="Nombre de actividad" aria-label="Nombre de actividad"/>
              <textarea value={activityDescription} onChange={e => setActivityDescription(e.target.value)} placeholder="Descripción de actividad" aria-label="Descripción de actividad"></textarea>
              <button onClick={handleAddActivity} aria-label="Agregar actividad al calendario">Agregar al día</button>
            </div>
            <div className="activities-list">
              {filteredEvents.map(activity => (
                <div key={activity.id} className="activity">
                  <span>{activity.nombre}</span>
                  <button onClick={() => handleOpenModal(activity)} aria-label={`Editar ${activity.nombre}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => handleDeleteActivity(activity.id)} aria-label={`Eliminar ${activity.nombre}`}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              ))}
            </div>
          </div>
          <div className="calendar-section">
            <Calendar onChange={handleDateChange} value={currentDate} aria-label="Calendario de eventos" role="application"/>
          </div>
        </section>
      </div>
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Editar Actividad</h1>
            <input
              value={activityName}
              onChange={e => setActivityName(e.target.value)}
              placeholder="Nombre de actividad"
            />
            <textarea
              value={activityDescription}
              onChange={e => setActivityDescription(e.target.value)}
              placeholder="Descripción de actividad"
            />
            <button onClick={handleEditActivity}>Guardar Cambios</button>
            <button onClick={handleCloseModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
