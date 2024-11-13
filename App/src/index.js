import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AccessibilityProvider } from './AccessibilityContext'; // Asegúrate de que el path sea correcto

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AccessibilityProvider> {/* Envuelve tu App con el AccessibilityProvider */}
      <App />
    </AccessibilityProvider>
  </React.StrictMode>
);

reportWebVitals();

