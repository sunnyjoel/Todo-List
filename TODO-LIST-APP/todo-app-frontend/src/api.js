
//api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;// Replace with your backend URL

/** Authentication APIs **/
// Register a new user
export const register = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
};

// Login a user
export const login = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    const { userId } = response.data;

    if (userId) {
        // Save user ID to localStorage
        localStorage.setItem('userId', userId);
        window.dispatchEvent(new Event('loginStatusChanged')); // Trigger login event
    }

    return response.data;
};

// Logout user
export const logout = () => {
    localStorage.removeItem('userId');
    window.dispatchEvent(new Event('loginStatusChanged')); // Trigger logout event
};

/** Project APIs **/
// Get all projects for the logged-in user
export const getProjects = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User is not authenticated');

    // const response = await axios.get(`${API_BASE_URL}/projects`, {
    //     params: { userId }
    // });
    const response = await axios.get(`${API_BASE_URL}/projects/${userId}`);
    return response.data;
};

// Get details of a single project by ID
export const getProjectById = async (projectId) => {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`);
    return response.data;
};

// Create a new project
export const createProject = async (userId, projectData) => {
    if (!userId) throw new Error('User is not authenticated');

    // const response = await axios.post(`${API_BASE_URL}/projects`, { ...projectData, userId });
    const response = await axios.post(`${API_BASE_URL}/projects/${userId}`, projectData);  // Include userId in URL
    return response.data;
};

// Update a project by ID
export const updateProject = async (projectId, projectData) => {
    const response = await axios.put(`${API_BASE_URL}/projects/${projectId}`, projectData);
    return response.data;
};

// Delete a project by ID
export const deleteProject = async (projectId) => {
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
    return response.data;
};

/** Todo APIs **/
// Get all todos for a specific project
export const getTodosByProject = async (projectId) => {
    // const response = await axios.get(`${API_BASE_URL}/todos`, {
    //     params: { projectId }
    // });
    const response = await axios.get(`${API_BASE_URL}/todos/${projectId}`);
    return response.data;
};

// Create a new todo under a specific project
export const createTodo = async (projectId, todoData) => {
    // const response = await axios.post(`${API_BASE_URL}/todos`, { ...todoData, projectId });
    const response = await axios.post(`${API_BASE_URL}/todos/${projectId}`, { ...todoData });
    return response.data;
};

// Update a todo by ID
export const updateTodo = async (todoId, todoData) => {
    const response = await axios.put(`${API_BASE_URL}/todos/${todoId}`, todoData);
    return response.data;
};

// Delete a todo by ID
export const deleteTodo = async (todoId) => {
    const response = await axios.delete(`${API_BASE_URL}/todos/${todoId}`);
    return response.data;
};
