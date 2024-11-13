import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Register.css'; 
import {registerRequest} from './api/auth.js'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('owner'); // Estado para manejar el rol seleccionado en el switch

  const navigate = useNavigate(); 

  const handleRegistration = async (e) => {
    e.preventDefault();
    // Nota para Darío: lógica de registro aquí con el backend
    var roleNumber = 0;
    if (role === "agent"){
      roleNumber = 1;
    }
    const dataRegister = {
      name : name,
      email : email,
      password : password,
      rol : roleNumber
    }

    try{
      const response = await registerRequest(dataRegister);
      console.log("Response: ", response)
      console.log('Registro con:', name, email, password, role);
      alert("Registro realizado correctamente")
      navigate('/'); // Redirige a la página de inicio de sesión

    }catch (error){
      console.log(error.response.data)
      alert(error.response.data[0])
    }
    
  };

  return (
    <div className="register-container">
      <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="InmoNexo Logo" className="logo"/>
      <h2>Crea una nueva cuenta</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Ingresa tu nombre completo"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            aria-required="true"
          />
          <label htmlFor="password">¿Qué eres?</label>
        </div>
        <div className="switch-field">
          <input
            type="radio"
            id="owner"
            name="role"
            value="owner"
            checked={role === 'owner'}
            onChange={e => setRole(e.target.value)}
            aria-labelledby="role-label owner"
          />
          <label htmlFor="owner">Propietario</label>
          <input
            type="radio"
            id="agent"
            name="role"
            value="agent"
            checked={role === 'agent'}
            onChange={e => setRole(e.target.value)}
            aria-labelledby="role-label agent"
          />
          <label htmlFor="agent">Agente Inmobiliario</label>
        </div>
        <button type="submit" className="register-button">Crear cuenta</button>
      </form>
    </div>
  );
};

export default Register;
