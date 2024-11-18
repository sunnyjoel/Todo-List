//src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';  


const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters long.';
    }

    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (password.trim().length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
      return;
    }

    try {
      await register({ username, email, password });
      navigate('/login'); 
    } catch (error) {
      console.error('Error registering:', error);
      setErrors({ apiError: 'Registration failed. Please try again later.' });
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-h2">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={`login-input ${errors.username ? 'error' : ''}`}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p className="error-message">{errors.username}</p>}

        <input
          className={`login-input ${errors.email ? 'error' : ''}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <div className="password-container">
          <input
            className={`login-input ${errors.password ? 'error' : ''}`}
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          >
            {showPassword ? (
              <i className="fa fa-eye-slash"></i> // Eye-slash icon for hidden password
            ) : (
              <i className="fa fa-eye"></i> // Eye icon for visible password
          )}
        </button>
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}

        <button className="login-button" type="submit">Register</button>
        {errors.apiError && <p className="error-message">{errors.apiError}</p>}
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default RegisterPage;
