import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';
import { registerRequest } from './api/auth';

// Mock de `useNavigate`
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock de `window.alert`
jest.spyOn(window, 'alert').mockImplementation(() => {});

// Mock de `registerRequest`
jest.mock('./api/auth', () => ({
  registerRequest: jest.fn(),
}));

describe('Register Component', () => {
  test('renderiza correctamente los campos del formulario', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Verificar que todos los campos están en el DOM
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Propietario')).toBeInTheDocument();
    expect(screen.getByLabelText('Agente Inmobiliario')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  test('permite al usuario registrarse con datos válidos', async () => {
    const mockResponse = { data: 'Registro exitoso' };
    registerRequest.mockResolvedValueOnce(mockResponse);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simular la entrada de datos
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Juan Mora' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'juan9191@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '54321' } });
    fireEvent.click(screen.getByLabelText('Propietario'));

    // Simular el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    // Verificar que se llamó a `registerRequest` con los datos correctos
    expect(registerRequest).toHaveBeenCalledWith({
      name: 'Juan Mora',
      email: 'juan9191@gmail.com',
      password: '54321',
      rol: 0, // 0 para propietario
    });

    // Verificar que `window.alert` fue llamado
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Registro realizado correctamente');
    });

    // Verificar que la navegación a '/' fue llamada
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('muestra un mensaje de error si el registro falla', async () => {
    const mockError = { response: { data: ['Correo ya registrado'] } };
    registerRequest.mockRejectedValueOnce(mockError);

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Simular la entrada de datos
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Juan Mora' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'juan9191@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '54321' } });
    fireEvent.click(screen.getByLabelText('Agente Inmobiliario'));

    // Simular el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: /crear cuenta/i }));

    // Verificar que se muestra un mensaje de error
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Correo ya registrado');
    });

    // Verificar que `registerRequest` fue llamado con los datos correctos
    expect(registerRequest).toHaveBeenCalledWith({
      name: 'Juan Mora',
      email: 'juan9191@gmail.com',
      password: '54321',
      rol: 1, // 1 para agente inmobiliario
    });
  });
});
