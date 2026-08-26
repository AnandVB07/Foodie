import React, { useContext } from 'react';
import StoreContext from '../../contexts/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    const filteredFoodList = category === "All"
        ? food_list
        : food_list.filter(item => item.category === category);

    return (
        <div className="food-display">
            <h2>Top Dishes Near me📍</h2>
            <div className="food-display-item">
                {filteredFoodList.map((item) => (
                    <FoodItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;