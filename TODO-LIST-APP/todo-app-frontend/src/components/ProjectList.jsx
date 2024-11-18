// src/components/ProjectList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, deleteProject,createProject,updateProject} from '../api';
import ProjectForm from '../components/ProjectFrom';
import { format } from 'date-fns';  
import { saveAs } from 'file-saver';


function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null); // For tracking the project being edited
    const [searchQuery, setSearchQuery] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        async function fetchProjects() {
            if (!userId) {
                console.error('User not authenticated');
                return; 
            }
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }
        fetchProjects();
    }, [userId]);

    const handleAddProject = async (projectData) => {
        try {
            const newProject = await createProject(userId,projectData);
            setProjects(prev => [...prev, newProject]);
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProject(id);
            setProjects((prev) => prev.filter((project) => project.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleUpdateProject = async (updatedProject) => {
         console.log('Updated Project:', updatedProject); 

        if (!updatedProject || !updatedProject.id || !updatedProject.title) {
            console.error('Invalid project data for update');
            return;
        }
        try {
            await updateProject(updatedProject.id, { title: updatedProject.title });
            setProjects((prev)=> 
                prev.map((project) => 
                    project.id === updatedProject.id ? { ...project, title: updatedProject.title } : project
                )
            );        
            setEditingProject(null);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    // Filtered projects based on search query (searches by title)
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to generate markdown content for the project
    function generateMarkdown(project) {
        const completedTodos = project.todos.filter(todo => todo.status === true);
        const pendingTodos = project.todos.filter(todo => todo.status === false);

        const pendingTodosList = pendingTodos.length ? 
            pendingTodos.map(todo => `- [ ] ${todo.description}`).join('\n') : 'No pending todos';
        const completedTodosList = completedTodos.length ? 
            completedTodos.map(todo => `- [x] ${todo.description}`).join('\n') : 'No completed todos';
        return `
# ${project.title}
###Summary: ${completedTodos.length} / ${project.todos.length} completed.

---

## Pending Todos
${pendingTodos.length > 0 ? 
    pendingTodos.map(todo => `- [ ] ${todo.description}`).join('\n') : 'No pending todos to show.'}
    
---

## Completed Todos
${completedTodos.length > 0 ? 
    completedTodos.map(todo => `- [x] ${todo.description}`).join('\n') : 'No completed todos to show.'}
    `.trim();
}

    // Function to handle exporting the project to a .md file
    async function handleExport(project) {
        if (!project.todos || project.todos.length === 0) {
            alert('No todos to export for this project.');
            return;
        }

        const markdownContent = generateMarkdown(project);
        // Save the markdown file locally
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        saveAs(blob, `${project.title}.md`);
        // TODO: upload to GitHub Gist (see below)
        await exportToGist(markdownContent, project.title);
    }

    // Function to export the markdown content to GitHub Gist
    async function exportToGist(markdownContent, projectName) {
        const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;  //Github Token
        const gistData = {
            description: `Project summary for ${projectName}`,
            public: false, // Secret gist
            files: {
                [`${projectName}.md`]: { content: markdownContent },
            },
        };
        try {
            const response = await fetch('https://api.github.com/gists', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gistData),
            });

            if (response.ok) {
                const gist = await response.json();
                alert(`Gist created successfully: ${gist.html_url}`);
            } else {
                console.error('Failed to create gist:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating gist:', error);
        }
    }

    return (
        <> 
         <div className="projectlist-container">
                {!editingProject && (
                    <ProjectForm
                    onSave={handleAddProject}
                    userId={userId}
                    />
                )}

                {/* Update Project Form */}
                {editingProject && (
                    <ProjectForm
                        project={editingProject}
                        onSave={handleUpdateProject}
                        userId={userId}
                    />
                )}
  
            <h2 className="projectlist-h2">My Projects</h2>
            <div className="projectlist-search">
                <input
                type="text"
                placeholder="Search Projects by Title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <table className="projectlist-table">
                <thead>
                        <tr>
                            <th className="projectlist-created">Created</th> {/* Header for date */}
                            <th className="projectlist-name">Project Name</th> {/* Header for project name */}
                            <th></th> 
                            <th></th> 
                            <th></th>
                        </tr>
                    </thead>
                <tbody>
                {(searchQuery ? filteredProjects : projects).map((project) => (
                        <tr key={project.id} className="projectlist-row">
                            {/* <td className='projectlist-id'>{project.id}</td> */}
                            <td className='projectlist-date'>{format(new Date(project.createdDate), 'MMM dd, yyyy HH:mm')}</td> 
                            <td>
                                <Link to={`/todos/${project.id}`} className="projectlist-link">
                                    {project.title}
                                </Link>
                            </td>                       
                            <td>
                                <button
                                onClick={() => setEditingProject(project)} 
                                className="projectlist-edit-btn"
                                >
                                <i className="fa fa-edit"></i> Edit
                                </button>
                            </td>
                            <td>
                                <button
                                onClick={() => handleDelete(project.id)}
                                className="projectlist-delete-btn"
                                >
                                <i className="fa fa-trash"></i> Delete
                                </button>
                            </td>
                            <td>
                                <button
                                onClick={() => handleExport(project)}
                                className="projectlist-export-btn"
                                >
                                <i className="fas fa-share"></i>
                                Export
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default ProjectList;
