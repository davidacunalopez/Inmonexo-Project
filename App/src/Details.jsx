import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faBuilding, faUsers, faNetworkWired, faMoneyCheckAlt,
  faCalendarAlt, faCog, faPlus, faTrash, faSave
} from '@fortawesome/free-solid-svg-icons';
import './Details.css';
import { usePropertie } from './context/propertiesContext'
import {useClient} from './context/clientContext'
import {usePay} from './context/payContext'
import {useAuth } from './context/authContext'

const Details = () => {
  const location = useLocation();
  const { propertie, getPropertieInfo, editPropertie, deletePropertie, changeStatus } = usePropertie();
  const { getClientPropertie, clientsPropertie } = useClient();
  const {getPaysPropertie, payPropertie, addPay} = usePay();
  const {user} = useAuth();
  const navigate = useNavigate();

  // Datos simulados 
  const [clients, setClients] = useState([]);

  const propId = location.state ? location.state.propId : null; // id para sacar la info de las propiedades

    // Datos de ejemplo (simulados) para la propiedad
    const [property, setProperty] = useState({
      name: '',
      address: '',
      type: '',
      price: '',
      status: '',
      description: '',
      capacity: '',
    });    
  useEffect(() => {
    getPropertieInfo(propId);
    getClientPropertie(propId);
    getPaysPropertie(propId);
  }, []);


  useEffect(() => {
    if(clientsPropertie[0]){
      setClients(clientsPropertie);
    }
  }, [clientsPropertie])

  useEffect(() => {
    setPayments(payPropertie)
  }, [payPropertie])

  useEffect(() => {
    if(propertie[0]){
      property.name = propertie[0].nombre;
      property.address = propertie[0].direccion;
      property.type = propertie[0].tipo;
      property.price = propertie[0].precio;
      property.status = '';
      property.description = propertie[0].descripcion;
      property.capacity = propertie[0].capacidad;
      
      setIsIncludedInNetwork(propertie[0].inred)
      setIsTakenByAgent(propertie[0].getagent)
      if(propertie[0].tipo == 0){
        property.status = "Disponible";
      } else if(propertie[0].tipo == 1) {
        property.status = "Vendido";
      } else{
        property.status = "Pendiente";
      }
    }
    console.log("Id de la propiedad:", propId)
  }, [propertie]);

  // Sección de imágenes

  const [images, setImages] = useState([
    { id: 1, url: "https://via.placeholder.com/200x200" },
    { id: 2, url: "https://via.placeholder.com/200x200" },
    { id: 3, url: "https://via.placeholder.com/200x200" },
    { id: 4, url: "https://via.placeholder.com/200x200" },
  ]);
  const [newImages, setNewImages] = useState([]);

  const handleImageChange = (event) => {
    setNewImages([...newImages, ...event.target.files]);
  };

  const saveImages = () => {
    console.log('Saving images:', newImages);
    // enviar nuevas imágenes al servidor
  };

  // Sección de pagos
    // Lista inicial de pagos concurrentes
    const [payments, setPayments] = useState([]);

  const [newPayment, setNewPayment] = useState({
    detalles: '',
    monto: 0,
    tipo: '',
    propiedadid: propId,
    usuarioid : user
  });

  // Manejo de actualización de la propiedad
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPayment({ ...newPayment, [name]: value });
    setProperty(prevState => ({ ...prevState, [name]: value }));
  };

  const addPayment = () => {
    const newId = payments.length + 1; // generación del id
    addPay(newPayment)
    setPayments([...payments, { ...newPayment, id: newId }]);
    setNewPayment({ detalles: "", monto: "", tipo: "" }); // resetear formulario
    navigate('/properties');
  };
  

  // Sección de documentos

  // Lista inicial de documentos existentes
  const [documents, setDocuments] = useState([
    { id: 1, detail: "Plano de la Propiedad", filename: "plano.pdf" },
    { id: 2, detail: "Contrato de Arrendamiento", filename: "contrato.pdf" },
    { id: 3, detail: "Declaración de Propiedad", filename: "declara.pdf" }
  ]);

  const [newDocument, setNewDocument] = useState({
    detail: '',
    file: null
  });

  const handleDocumentDetailChange = (event) => {
    setNewDocument({ ...newDocument, detail: event.target.value });
  };

  const handleDocumentFileChange = (event) => {
    setNewDocument({ ...newDocument, file: event.target.files[0] });
  };

  const addDocument = () => {
    const newId = documents.length + 1;
    setDocuments([...documents, { ...newDocument, id: newId }]);
    setNewDocument({ detail: '', file: null }); // resetear formulario
  };

  // Sección para adicional

  const [isIncludedInNetwork, setIsIncludedInNetwork] = useState(1);
  const [isTakenByAgent, setIsTakenByAgent] = useState(0); // Estado simulado, verdadero para verde

  const toggleNetworkStatus = () => {
    setIsIncludedInNetwork(!isIncludedInNetwork);
  };

  const toggleAgentStatus = () => {
    setIsTakenByAgent(!isTakenByAgent); // Simula cambiar el estado, en producción conectarse al backend
  };

  const saveChangesNetwork = () => {
    console.log('Guardar cambios:', { isIncludedInNetwork, isTakenByAgent }); // Este change es el de la sección adicional
    // lógica para enviar los cambios al servidor
    const data = {red : 0}
    //Parsing de datos
    //isIncludedInNetwork
    if (isIncludedInNetwork) {
      data.red = 1;
    }
    changeStatus(propId, data)
  };

  const deleteProperty = () => {
    console.log('Eliminar propiedad');
    // lógica para eliminar la propiedad del servidor
    //Antes de eliminar la propiedad, se tiene que eliminar los pagos que estan registrados a ella
    deletePropertie(propId);
    navigate('/dashboard');
  };


  const saveChanges = () => {

    // lógica para guardar los cambios en la base, primer botón de cambios
    console.log('Changes saved:', property);

    if (property.status == "Disponible"){
      property.status = 0;
    } else if (property.status == "Vendido"){
      property.status = 1;
    } else {
      property.status = 2;
    }

    editPropertie(propId, property)
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
          <h1>Gestión de la propiedad</h1>

          {/* Contenedor para información base de la propiedad */}
          <div className="property-info">
            <h2>Información Básica</h2>
            <label htmlFor="name">Nombre de la propiedad:</label>
            <input type="text" name="name" value={property.name} onChange={handleInputChange} placeholder="Nombre de la propiedad" />
            <label htmlFor="address">Dirección:</label>
            <input type="text" name="address" value={property.address} onChange={handleInputChange} placeholder="Dirección" />
            <label htmlFor="type">Tipo:</label>
            <select name="type" value={property.type} onChange={handleInputChange}>
              <option value="alquiler">Alquiler</option>
              <option value="venta">Compra</option>
            </select>
            <label htmlFor="price">Precio:</label>
            <input type="number" name="price" value={property.price} onChange={handleInputChange} placeholder="Precio" />
            {/* Estado */}
            <label htmlFor="status">Estado:</label>
            <select id="status" name="status" value={property.status} onChange={handleInputChange} required>
                <option value="disponible">Disponible</option>
                <option value="vendido">Vendido</option>
                <option value="pendiente">Pendiente</option>
            </select>
            <label htmlFor="description">Descripción:</label>
            <textarea name="description" value={property.description} onChange={handleInputChange} placeholder="Descripción" />
            <label htmlFor="capacity">Capacidad:</label>
            <input type="text" name="capacity" value={property.capacity} onChange={handleInputChange} placeholder="Capacidad" />
            <button className='btn-cambios' onClick={saveChanges} aria-label="Guardar cambios de la propiedad"><FontAwesomeIcon icon={faSave} /> Guardar Cambios</button>
          </div>

          {/* Contenedor para clientes potenciales */}
          <div className="property-clients">
            <h2>Clientes Potenciales</h2>
            {clients.length > 0 ? (
                <div className="client-cards">
                {clients.map(client => (
                    <div key={client.id} className="client-card">
                    <div className="client-details">
                        <h3>{client.nombre}</h3>
                        <p>Email: {client.correo}</p>
                        <p>Detalles: {client.descripcion}</p>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <p>No hay clientes potenciales asociados a esta propiedad.</p>
            )}
            <Link to="/clients" aria-label="Gestionar clientes">
                <button>Gestionar clientes</button>
            </Link>
          </div>
          
          {/* Contenedor para gestionar las imágenes */}
          <div className="property-images">
            <h2>Imágenes de la Propiedad</h2>
            <div className="existing-images">
                {images.map(image => (
                <div key={image.id} className="image-wrapper">
                    <img src={image.url} alt="Property" />
                </div>
                ))}
            </div>
            <input type="file" multiple onChange={handleImageChange} aria-label="Subir nuevas imágenes"/>
            <button onClick={saveImages} aria-label="Guardar imágenes nuevas">Guardar Imágenes</button>
          </div>

          {/* Contenedor para pagos recurrentes */}
          <div className="property-payments">
            <h2>Pagos Recurrentes</h2>
            <div>
                {payments.map(payment => (
                <div key={payment.id}>
                    <h4>{payment.detalles} - {payment.monto} - {payment.tipo}</h4>
                </div>
                ))}
            </div>
            <div>
                <label htmlFor="payment-detail">Detalle del pago:</label>
                <input
                type="text"
                name="detalles"
                value={newPayment.detail}
                onChange={handleInputChange}
                placeholder="Detalle del pago"
                required
                />
                <label htmlFor="payment-amount">Monto:</label>
                <input
                type="number"
                name="monto"
                value={newPayment.amount}
                onChange={handleInputChange}
                placeholder="Monto"
                required
                />
                <label htmlFor="payment-term">Plazo:</label>
                <select name="tipo" value={newPayment.tipo} onChange={handleInputChange} placeholder="Plazo" required>
                    <option value="">Seleccionar</option>
                    <option value="Mensual">Mensual</option>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Semestral">Semestral</option>
                    <option value="Anual">Anual</option>
                </select>
                <button onClick={addPayment} aria-label="Añadir nuevo pago">Añadir Pago</button>
            </div>
          </div>

          {/* Contenedor para gestionar los documentos */}
          <div className="property-documents">
            <h2>Documentos Importantes</h2>
            <div>
                {documents.map(document => (
                <div key={document.id}>
                    <span>{document.detail}</span>
                    <a href={`${process.env.PUBLIC_URL}/docs/${document.filename}`} target="_blank" rel="noopener noreferrer" aria-label={`Abrir documento ${document.detail}`}>
                    <button>Abrir Documento</button>
                    </a>
                </div>
                ))}
            </div>
            <div>
                <h3>Agregar nuevo documento</h3>
                <input
                type="text"
                value={newDocument.detail}
                onChange={handleDocumentDetailChange}
                placeholder="Detalle del Documento"
                />
                <input
                type="file"
                onChange={handleDocumentFileChange}
                aria-label="Subir archivo de documento"
                />
                <button onClick={addDocument} aria-label="Agregar nuevo documento">Agregar Documento</button>
            </div>
            </div>

            <div className="property-extra">
                <h2>Adicional</h2>
                <div>
                    <button onClick={deleteProperty}>Eliminar propiedad</button>
                </div>
            </div>
                </section>
            </div>
          </div>
  );
};

export default Details;
