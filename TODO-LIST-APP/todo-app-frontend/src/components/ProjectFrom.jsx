// src/components/ProjectForm.jsx
import React, { useState , useEffect} from 'react';
import { createProject, updateProject } from '../api';

function ProjectForm({ project, onSave,userId }) {
    const [title, setTitle] = useState(project ? project.title : '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (project) {
            setTitle(project.title); // Set the title from the existing project when editing
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Project title cannot be empty or only spaces.');
            return;
        }

        // Pass the data to the parent component (handleUpdateProject or handleAddProject)
        onSave({ ...project, title });

        if (!project) {
            setTitle(''); // Reset input field when adding a new project
        }
        setError(''); 
    };

    return (
        <div className="project-form">
            <form onSubmit={handleSubmit} className="project-form-container">
                {/* <label className='project-form-label'>Project Title</label> */}
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='project-form-input'
                placeholder="Enter project title"
                />
                
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className='project-form-button'>{project ? 'Update' : 'Add'} </button>
            </form>
        </div>
    );
}

export default ProjectForm;
