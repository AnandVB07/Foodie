import React from 'react';
import './Header.css';

const Header = () => {
    const scrollToMenu = () => {
        const menuElement = document.getElementById('explore-menu');
        if (menuElement) {
            menuElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="hero-header">
            <div className="hero-overlay"></div>
            
            <div className="hero-content">
                <div className="hero-badge">
                    <span>⚡ Superfast 30 Min Delivery</span>
                </div>
                
                <h1 className="hero-title">
                    Savor The Best <br />
                    <span className="gradient-text">Cuisines In Town</span>
                </h1>
                
                <p className="hero-subtitle">
                    Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.
                </p>
                
                <div className="hero-buttons">
                    <button className="btn-primary" onClick={scrollToMenu}>
                        Explore Menu <span>→</span>
                    </button>
                    <button className="btn-secondary" onClick={scrollToMenu}>
                        View Offers 🏷️
                    </button>
                </div>
                
                <div className="hero-stats">
                    <div className="stat-card">
                        <h3>50+</h3>
                        <p>Special Dishes</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-card">
                        <h3>4.9 ★</h3>
                        <p>Customer Rating</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-card">
                        <h3>100%</h3>
                        <p>Fresh Ingredients</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;