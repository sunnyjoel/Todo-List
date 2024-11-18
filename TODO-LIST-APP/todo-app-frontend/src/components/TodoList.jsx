// src/components/TodoList.jsx
import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import { useParams } from 'react-router-dom'; 
import { updateTodo, getTodosByProject,deleteTodo } from '../api';
import { format } from 'date-fns'; 

function TodoList() {
    const { projectId } = useParams(); // Get projectId from URL
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const data = await getTodosByProject(projectId);
                const todosWithDefaults = data.map(todo => ({
                    ...todo,
                    updatedDate: todo.updatedDate || new Date().toISOString(),
                }));
                setTodos(todosWithDefaults);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        }
        if (projectId) { // Ensuring projectId is available before fetching
            fetchTodos();
        }
    }, [projectId]);

    const handleToggleStatus = async (todo) => {
        const updatedTodo = { ...todo, status: !todo.status, updatedDate: new Date().toISOString()  }; // Toggle status    
        try {
            await updateTodo(updatedTodo.id, updatedTodo); 
            setTodos((prev) =>
            prev.map((t) => (t.id === todo.id ? updatedTodo : t))
        );
        }catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await deleteTodo(todoId);
            setTodos((prev) => prev.filter((t) => t.id !== todoId));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const totalTasks = todos.length;
    const completedTasks = todos.filter((todo) => todo.status).length;

    const lastUpdated = todos.reduce((latest, todo) => {
        const todoDate = new Date(todo.updatedDate);
        const latestDate = latest ? new Date(latest.updatedDate) : null;
        return !latest || todoDate > latestDate ? todo : latest;
    }, null);

    return (
        <div className='todo-list-container'>
             {/* <TodoForm
                onAddTodo={(newTodo) => setTodos((prev) => [...prev, newTodo])}
                projectId={projectId}
            /> */}
            <TodoForm
                 onAddTodo={(newTodo) => {
                const todoWithUpdatedDate = { ...newTodo, updatedDate: new Date().toISOString() };
                setTodos((prev) => [...prev, todoWithUpdatedDate]);
                }}
            projectId={projectId}
            />

            <h4 className="todo-list-summary"> 
                {`${completedTasks}/${totalTasks} tasks completed`}
            </h4>

            {lastUpdated && lastUpdated.updatedDate ? (
            <h4 className="todo-list-updateddate">Last Updated: {format(new Date(lastUpdated.updatedDate), 'MM/dd/yyyy HH:mm:ss')}</h4>
            ) : (
            <h4 className="todo-list-updateddate">Last Updated: No updates yet</h4>
            )}

            <div className="todo-list-section">
                <h4 className='todo-list-h4'>
                    Pending Task <i className="fa fa-hourglass-start" style={{ color: 'orange', fontSize: '20px' }}></i>
                </h4>
                <div className="todo-list-items">
                    {todos
                        .filter(todo => !todo.status)
                        .map(todo => (
                            <div key={todo.id} className="todo-item">
                                <input
                                    type="checkbox"
                                    className='todo-list-checkbox'
                                    checked={todo.status}
                                    onChange={() => handleToggleStatus(todo)}
                                /> 
                                {todo.description}
                                <button
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="todo-list-dlt-btn"
                                >
                                <i className="fa fa-trash"></i> Delete
                                </button>
                            </div>
                        ))}
                </div>
            </div>

            <div className="todo-list-section">
                <h4 className='todo-list-h4'>
                    Completed Task <i className="fa fa-check-circle" style={{ color: 'green', fontSize: '20px' }}></i>
                </h4>
                <div className="todo-list-items">
                    {todos
                        .filter(todo => todo.status)
                        .map(todo => (
                            <div key={todo.id} className="todo-item completed">
                                <input
                                    type="checkbox"
                                    className='todo-list-checkbox'
                                    checked={todo.status}
                                    onChange={() => handleToggleStatus(todo)}
                                />
                                <span>{todo.description}</span>
                                <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="todo-list-dlt-btn"
                                >
                                     <i className="fa fa-trash"></i> Delete
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
