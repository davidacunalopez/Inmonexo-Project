import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock de useAccessibility, ajusta si necesitas otro contexto
jest.mock('./AccessibilityContext', () => ({
  useAccessibility: () => ({
    highContrastMode: false,
  }),
}));

test('renders login form with welcome text', () => {
  render(<App />);

  // Busca el texto "Bienvenido de vuelta"
  const welcomeText = screen.getByText(/bienvenido de vuelta/i);
  expect(welcomeText).toBeInTheDocument();

  // Verifica que hay un botón para iniciar sesión
  const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });
  expect(loginButton).toBeInTheDocument();
});