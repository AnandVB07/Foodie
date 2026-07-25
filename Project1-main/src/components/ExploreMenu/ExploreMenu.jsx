import React from 'react';
import assets from '../../assets/assets';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className="explore-menu" id="explore-menu">
            <div className="explore-menu-header">
                <span className="section-subtitle">OUR MENU</span>
                <h2 className="section-title">Explore Delicious Categories 🍲</h2>
                <p className="explore-menu-text">
                    Discover hand-crafted culinary wonders prepared fresh to satisfy every craving.
                </p>
            </div>

            <div className="explore-menu-list">
                <div 
                    onClick={() => setCategory("All")}
                    className={`explore-menu-list-item ${category === "All" ? "active" : ""}`}
                >
                    <div className="menu-img-wrapper">
                        <span className="all-icon">🍽️</span>
                    </div>
                    <p>All Items</p>
                </div>

                {assets.map((item, index) => (
                    <div
                        onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        key={index}
                        className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
                    >
                        <div className="menu-img-wrapper">
                            <img src={item.menu_img} alt={item.menu_name} />
                        </div>
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr className="explore-menu-hr" />
        </div>
    );
};

export default ExploreMenu;