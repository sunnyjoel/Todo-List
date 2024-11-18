// src/components/Navbar.jsx
import React, { useEffect, useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';


function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = () => {
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId); // Update login state based on localStorage
    };

    useEffect(() => {
        checkLoginStatus();         // Check login status on mount
        // Listen for custom event to handle login/logout updates
        const updateLoginStatus = () => checkLoginStatus();
        window.addEventListener('loginStatusChanged', updateLoginStatus);
        return () => {
            window.removeEventListener('loginStatusChanged', updateLoginStatus);  // Cleanup the event listener on component unmount
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        window.dispatchEvent(new Event('loginStatusChanged')); // Trigger login status update
        setIsLoggedIn(false); // Update state
        navigate('/login');
    };

    return (
        <nav className="navbar-nav">
            <h1 className="navbar-h1">Todo List App</h1> 
            <div className="navbar-container">    
                {isLoggedIn ? (
                    <>
                <Link to="/projects" className="navbar-link"><i className="fa fa-home"></i>
                Home</Link>
                <Link to="/projects" className="navbar-link">
                New Project</Link>
                <button onClick={handleLogout}>Logout</button>
                </>
                ) : (
                    <Link to="/login" className="navbar-link">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
