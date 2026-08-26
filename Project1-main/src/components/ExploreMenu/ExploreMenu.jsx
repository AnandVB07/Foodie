import React from 'react';
import assets from '../../assets/assets'; // Assuming this is an array of objects with menu_name and menu_img
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Order our best food options</h1>
            <p className='explore-menu-text'>"Savor every bite crafted with love❤️, just for you!"</p>
            <div className="explore-menu-list">
                {assets.map((item, index) => (
                    <div
                        onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        key={index}
                        className={`explore-menu-list-item ${category === item.menu_name ? "actives" : ""}`}
                    >
                        <img src={item.menu_img} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreMenu;