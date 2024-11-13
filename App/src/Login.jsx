import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 
import backgroundImage from './llaves_casa.jpg';
import { useAuth } from './context/authContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegar

  const { login,isAuthenticated,user } = useAuth();

  const loginStyle = {
    height: '100vh',
    width: '100vw', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c2c', 
  };

  useEffect(() => {
    if(isAuthenticated){
      navigate('/dashboard')
      console.log("User: ", user);
    }
  }, [isAuthenticated])
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const dataUser = {
      email : email,
      password : password
    }

    login(dataUser)
  };

  return (
    <div className="login-container" style={loginStyle}>
      <div className="login-image" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="login-form">
        <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="InmoNexo Logo" className="logo"/>
        <h2>Bienvenido de vuelta</h2>
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                value={email}
                placeholder="Ingresa tu correo"
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
                value={password}
                placeholder="Ingresa tu contraseña"
                onChange={e => setPassword(e.target.value)}
                required
                aria-required="true"
                />
                <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          <button type="submit" className="login-button" aria-label="Iniciar sesión">Iniciar sesión</button>
        </form>
        <div className="register-link">
            ¿Aún no tienes cuenta? <Link to="/register" aria-label="Crea una cuenta nueva">Crea una</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
