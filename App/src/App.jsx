import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAccessibility } from './AccessibilityContext'; // Asegúrate de que la ruta al contexto es correcta
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import User from './User';
import Propiedades from './Propiedades';
import Clientes from './Clientes';
import Network from './Network';
import Payments from './Payments';
import Calendario from './Calendario';
import Accessibility from './Accessibility';
import './App.css'; // Asegúrate de que la ruta al CSS de App es correcta
import { AuthProvider } from './context/authContext';
import { ClientProvider } from './context/clientContext';
import { PropertieProvider } from './context/propertiesContext'
import { PayProvider } from './context/payContext';
import { EventProvider } from './context/eventContext'
import ProtectedRoute from './ProtectedRoute';
import AddProperties from './AddProperties';
import AddClients from './AddClients';
import EditClients from './EditClients';
import Details from './Details';
import NetDetails from './NetDetails';

function App() {
  const { highContrastMode } = useAccessibility(); // Utilizar el hook de contexto

  return (
    <div className={highContrastMode ? 'App high-contrast' : 'App'}>
      <AuthProvider>
        <ClientProvider>
          <PropertieProvider>
            <PayProvider>
              <EventProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute/>}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/account-info" element={<User />}/>
                      <Route path="/properties" element={<Propiedades />} />
                      <Route path="/clients" element={<Clientes />} />
                      <Route path="/network" element={<Network />} />
                      <Route path="/payments" element={<Payments />} />
                      <Route path="/calendar" element={<Calendario />} />
                      <Route path="/settings" element={<Accessibility />} />
                      <Route path="/addproperty" element={<AddProperties />}  />
                      <Route path="/addclients" element={<AddClients />} />
                      <Route path="/editclients" element={<EditClients />} />
                      <Route path="/details" element={<Details />} />
                      <Route path="/detailsnetwork" element={<NetDetails />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </EventProvider>
            </PayProvider>
          </PropertieProvider>
        </ClientProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
