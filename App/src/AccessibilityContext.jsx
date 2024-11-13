import React, { createContext, useState, useContext } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [highContrastMode, setHighContrastMode] = useState(false);

  // Cambiar para aceptar un valor y establecer el estado
  const toggleHighContrast = (value) => {
    setHighContrastMode(value);
  };

  return (
    <AccessibilityContext.Provider value={{ highContrastMode, toggleHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
