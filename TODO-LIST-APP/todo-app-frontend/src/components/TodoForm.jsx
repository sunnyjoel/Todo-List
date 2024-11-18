// src/components/TodoForm.jsx
import React, { useState } from 'react';
import { createTodo } from '../api';

function TodoForm({ onAddTodo ,projectId}) {
    const [description, setDescription] = useState('');
    const [error, setError] = useState(''); 

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (!description.trim()) {
            setError('Task description cannot be empty!');
            return;
        }
        setError(''); 
        
        try {
            // Call the API to create the todo, passing the projectId and description
            const newTodo = await createTodo(projectId, { description });
            onAddTodo(newTodo); // Update parent component with new todo
            setDescription(''); 
        } catch (error) {
            console.error('Error creating todo:', error);
            setError('An error occurred while adding the task.');
        }
    };

    return (
        <div className="todo-form">   
        <form onSubmit={handleSubmit} className="todo-form-container">
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a new task"
                className='todo-form-input'
            />
            {error && <p className="error-message">{error}</p>} 
            <button type="submit" className='todo-form-button'>+</button>
        </form>
        </div>
    );
}

export default TodoForm;
