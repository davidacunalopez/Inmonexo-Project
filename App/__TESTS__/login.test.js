import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { useAuth } from './context/authContext';

// Crear un mock de `useNavigate`
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,  // Retorna la función mock
}));

// Mock de `useAuth`
jest.mock('./context/authContext', () => ({
  useAuth: jest.fn(),
}));

describe('Login Component', () => {
  test('permite al usuario iniciar sesión con las credenciales correctas', async () => {
    const mockLogin = jest.fn();
    const mockUseAuth = {
      login: mockLogin,
      isAuthenticated: false,
      user: null,
    };

    // Configura el mock de `useAuth`
    useAuth.mockReturnValue(mockUseAuth);

    const { rerender } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simular la entrada de datos
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'david@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '54321' } });

    // Se iniciar sesion
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // login con datos correctos
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'david@gmail.com',
      password: '54321',
    });

    // Simular el cambio de "isAuthenticated" a "true"
    mockUseAuth.isAuthenticated = true;
    rerender(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Se verifica que la navegación a '/dashboard' es correcta
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
