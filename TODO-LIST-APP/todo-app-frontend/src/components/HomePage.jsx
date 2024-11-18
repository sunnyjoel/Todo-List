// src/components/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectList from './ProjectList';

function HomePage() {
    const navigate = useNavigate();

    const handleAddProjectClick = () => {
      navigate('/projects'); 
    };

  return (
    <div className='home-div'>
      <h1 className='home-h1'>Welcome to the Todo App</h1>
      <h3 className='home-h3'>Please log in to get started.</h3>

      <button onClick={handleAddProjectClick} className='home-button'>Add Project</button>

      <ProjectList/>

    </div>
  );
}

export default HomePage;
