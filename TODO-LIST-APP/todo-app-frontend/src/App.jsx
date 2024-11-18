//App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'

import Navbar from './components/Navbar';
import Login from '../src/pages/LoginPage';
import Register from '../src/pages/RegisterPage';
import ProjectForm from './components/ProjectFrom';
import ProjectList from './components/ProjectList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import HomePage from './components/HomePage'; 
import Footer from './components/Footer';
import 'font-awesome/css/font-awesome.min.css';
function App() {

  return (
    <>
     <h1>Todo App</h1>
     <Router>
            <Navbar/>
                <Routes>
                   <Route path="/" element={<Navigate to="/login" replace />} />
                   {/* <Route path="/" element={<HomePage />} /> */}
                   <Route path="/login" element={<Login/>}/>
                   <Route path="/register" element={<Register/>}/>

                   <Route path="/projects/:userId" element={<ProjectForm/>}/>
                   <Route path="/projects" element={<ProjectList/>}/>

                   <Route path='/todo-form' element={<TodoForm/>}/>
                   <Route path='/todos/:projectId' element={<TodoList/>}/>
                </Routes>
                <Footer/>
        </Router>
     
    </>
  )
}


export default App
