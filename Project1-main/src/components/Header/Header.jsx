import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="app-container">
            <div className="overlay"></div>
            <div className="text-content">
                <h1>Welcome to Foodie</h1>
                <p>Discover the best cuisines and recipes in town.</p>
            </div>
        </div>
    );
};

export default Header;