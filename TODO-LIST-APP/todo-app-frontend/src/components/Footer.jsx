import React from 'react';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p>Made by Sunny<i className="fa fa-heart" style={{ color: 'red', fontSize: '16px', paddingLeft: '5px' }}></i></p>

                <p>&copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}

export default Footer;
