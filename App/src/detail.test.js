import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from './Details';
import { usePropertie } from './context/propertiesContext';
import { useClient } from './context/clientContext';
import { usePay } from './context/payContext';
import { useAuth } from './context/authContext';

// Mocks
jest.mock('./context/propertiesContext', () => ({
  usePropertie: jest.fn(),
}));
jest.mock('./context/clientContext', () => ({
  useClient: jest.fn(),
}));
jest.mock('./context/payContext', () => ({
  usePay: jest.fn(),
}));
jest.mock('./context/authContext', () => ({
  useAuth: jest.fn(),
}));

describe('Details Component', () => {
  beforeEach(() => {
    usePropertie.mockReturnValue({
      propertie: [{ id: 3, nombre: 'Casa Bonita', direccion: 'Calle Principal', tipo: 'venta', precio: 500000 }],
      getPropertieInfo: jest.fn(),
      editPropertie: jest.fn(),
      deletePropertie: jest.fn(),
    });
    useClient.mockReturnValue({
      clientsPropertie: [],
      getClientPropertie: jest.fn(),
    });
    usePay.mockReturnValue({
      payPropertie: [],
      getPaysPropertie: jest.fn(),
      addPay: jest.fn(),
    });
    useAuth.mockReturnValue({
      user: 1,
    });
    jest.clearAllMocks();
  });

  test('renderiza correctamente la información básica de la propiedad', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/details', state: { propId: 3 } }]}>
        <Details />
      </MemoryRouter>
    );

    // Verificar los elementos básicos
    expect(screen.getByLabelText(/nombre de la propiedad:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio:/i)).toBeInTheDocument();
  });

  test('permite eliminar una propiedad con un ID de 3', async () => {
    const { deletePropertie } = usePropertie();

    render(
      <MemoryRouter initialEntries={[{ pathname: '/details', state: { propId: 3 } }]}>
        <Details />
      </MemoryRouter>
    );

    // Simular clic en eliminar propiedad
    fireEvent.click(screen.getByRole('button', { name: /eliminar propiedad/i }));

    // Verificar que se llama la función de eliminar con ID 3
    await waitFor(() => {
      expect(deletePropertie).toHaveBeenCalledWith(3);
    });
  });

  test('permite añadir un nuevo pago recurrente', async () => {
    const { addPay } = usePay();

    render(
      <MemoryRouter initialEntries={[{ pathname: '/details', state: { propId: 3 } }]}>
        <Details />
      </MemoryRouter>
    );

    // Simular inputs de pago recurrente
    fireEvent.change(screen.getByLabelText(/detalle del pago:/i), { target: { value: 'Pago mensual' } });
    fireEvent.change(screen.getByLabelText(/monto:/i), { target: { value: 1000 } });
    fireEvent.change(screen.getByLabelText(/plazo:/i), { target: { value: 'Mensual' } });

    // Clic en añadir pago
    fireEvent.click(screen.getByRole('button', { name: /añadir pago/i }));

    // Verificar que se llama a addPay con los datos correctos
    await waitFor(() => {
      expect(addPay).toHaveBeenCalledWith({
        detalles: 'Pago mensual',
        monto: 1000,
        tipo: 'Mensual',
        propiedadid: 3,
        usuarioid: 1,
      });
    });
  });
});
