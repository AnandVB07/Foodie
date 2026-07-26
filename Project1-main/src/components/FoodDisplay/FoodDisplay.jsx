import React, { useContext } from 'react';
import StoreContext from '../../contexts/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const { food_list, searchQuery, setSearchQuery } = useContext(StoreContext);

    const filteredFoodList = food_list.filter(item => {
        const matchesCategory = category === "All" || item.category.toLowerCase() === category.toLowerCase();
        const matchesSearch = !searchQuery || 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="food-display" id="food-display">
            <div className="food-display-header">
                <h2>
                    {category === "All" ? "Top Dishes Near You" : `${category} Specialties`} 📍
                </h2>
                {searchQuery && (
                    <p className="search-status-tag">
                        Showing results for "<strong>{searchQuery}</strong>"
                        <span onClick={() => setSearchQuery("")} className="clear-search"> × Clear</span>
                    </p>
                )}
            </div>

            {filteredFoodList.length === 0 ? (
                <div className="no-food-found">
                    <div className="no-food-icon">🔍</div>
                    <h3>No dishes found</h3>
                    <p>We couldn't find any dishes matching your search criteria.</p>
                    <button className="reset-filter-btn" onClick={() => setSearchQuery("")}>
                        Reset Search Filters
                    </button>
                </div>
            ) : (
                <div className="food-display-grid">
                    {filteredFoodList.map((item, index) => (
                        <div 
                            key={item._id} 
                            className="food-card-wrapper"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <FoodItem
                                id={item._id}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                image={item.image}
                                category={item.category}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodDisplay;