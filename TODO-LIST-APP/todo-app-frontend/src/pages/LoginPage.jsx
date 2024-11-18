//src/Pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';  
import { login } from '../api';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      const userId = response.userId;
      
      localStorage.setItem('userId', userId);
      console.log('User ID:', userId);
      console.log("login successful", userId, username, password);
      navigate('/projects'); 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-h2">Login</h2>
      <form onSubmit={handleSubmit}> 
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="password-input-container">
        <input
          className="login-input"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
       <button
          type="button"
          className="password-toggle-btn-login"
          onClick={() => setShowPassword(!showPassword)} 
        >
        {showPassword ? (
          <i className="fa fa-eye-slash"></i> // Eye-slash icon for hidden password
        ) : (
          <i className="fa fa-eye"></i> // Eye icon for visible password
        )}
        </button>

        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
      <p className="login-link">
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
};

export default LoginPage;
