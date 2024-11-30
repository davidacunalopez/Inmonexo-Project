import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddProperties from './AddProperties';
import { usePropertie } from './context/propertiesContext';
import { useAuth } from './context/authContext';

// Mock de `usePropertie`
jest.mock('./context/propertiesContext', () => ({
  usePropertie: jest.fn(),
}));

// Mock de `useAuth`
jest.mock('./context/authContext', () => ({
  useAuth: jest.fn(),
}));

// Mock de `useNavigate`
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AddProperties Component', () => {
  beforeEach(() => {
    // Mock del contexto de usuario
    useAuth.mockReturnValue({ user: 1 });

    // Mock de la función `addPropertie`
    usePropertie.mockReturnValue({
      addPropertie: jest.fn(),
    });

    jest.clearAllMocks();
  });

  test('renderiza correctamente los campos del formulario', () => {
    render(
      <MemoryRouter>
        <AddProperties />
      </MemoryRouter>
    );

    // Verificar que todos los campos están en el DOM
    expect(screen.getByLabelText(/nombre de la propiedad:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estado:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/capacidad:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imágenes:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear propiedad/i })).toBeInTheDocument();
  });

  test('permite crear una propiedad con datos válidos', async () => {
    const mockAddPropertie = jest.fn();
    usePropertie.mockReturnValue({ addPropertie: mockAddPropertie });

    render(
      <MemoryRouter>
        <AddProperties />
      </MemoryRouter>
    );

    // Simular la entrada de datos en el formulario
    fireEvent.change(screen.getByLabelText(/nombre de la propiedad:/i), { target: { value: 'Casa en el Centro' } });
    fireEvent.change(screen.getByLabelText(/dirección:/i), { target: { value: 'Avenida Principal #123' } });
    fireEvent.change(screen.getByLabelText(/tipo:/i), { target: { value: 'venta' } });
    fireEvent.change(screen.getByLabelText(/precio:/i), { target: { value: '250000' } });
    fireEvent.change(screen.getByLabelText(/estado:/i), { target: { value: 'disponible' } });
    fireEvent.change(screen.getByLabelText(/descripción:/i), { target: { value: 'Propiedad en excelente ubicación.' } });
    fireEvent.change(screen.getByLabelText(/capacidad:/i), { target: { value: '4' } });

    // Simular el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: /crear propiedad/i }));

    // Verificar que se llamó a `addPropertie` con los datos correctos
    await waitFor(() => {
      expect(mockAddPropertie).toHaveBeenCalledWith({
        name: 'Casa en el Centro',
        address: 'Avenida Principal #123',
        type: 'venta',
        price: '250000',
        status: 0, // `disponible` mapeado a 0
        concurrentPayments: [{ detail: '', cost: '' }],
        description: 'Propiedad en excelente ubicación.',
        capacity: '4',
        usuarioid: 1,
        images: [],
      });

      // Verificar que la navegación ocurrió correctamente
      expect(mockNavigate).toHaveBeenCalledWith('/properties');
    });
  });

  test('muestra un mensaje de error si falta un campo requerido', async () => {
    render(
      <MemoryRouter>
        <AddProperties />
      </MemoryRouter>
    );

    // Dejar algunos campos vacíos y enviar el formulario
    fireEvent.change(screen.getByLabelText(/nombre de la propiedad:/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/dirección:/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /crear propiedad/i }));

    // Verificar que no se llama a `addPropertie` debido a validaciones
    const mockAddPropertie = usePropertie().addPropertie;
    expect(mockAddPropertie).not.toHaveBeenCalled();
  });
});
