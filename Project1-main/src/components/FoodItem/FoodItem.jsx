import React, { useContext } from 'react';
import './FoodItem.css';
import StoreContext from '../../contexts/StoreContext';

const FoodItem = ({ id, name, price, description, image, category }) => {
    const { cartItems, addToCart, removeToCart, url } = useContext(StoreContext);
    const quantityInCart = cartItems[id] || 0;

    const getImageSrc = () => {
        if (!image) return 'https://via.placeholder.com/300x200?text=Food+Image';
        if (typeof image === 'string' && (image.startsWith('http') || image.startsWith('data:') || image.startsWith('/'))) {
            return image;
        }
        if (typeof image === 'object' || (typeof image === 'string' && image.includes('static/media'))) {
            return image;
        }
        return `${url}/images/${image}`;
    };

    const formattedPrice = typeof price === 'number' ? price : parseFloat(price.toString().replace(/[^0-9.]/g, '')) || 0;

    return (
        <div className="food-item-card">
            <div className="food-item-img-container">
                <img className="food-item-image" src={getImageSrc()} alt={name} />
                
                {category && (
                    <span className="category-pill-tag">{category}</span>
                )}

                <div className="quantity-control-wrapper">
                    {quantityInCart === 0 ? (
                        <button className="add-btn-circle" onClick={() => addToCart(id)} title="Add to Cart">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    ) : (
                        <div className="food-item-counter">
                            <button className="counter-btn remove" onClick={() => removeToCart(id)}>
                                <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="counter-qty">{quantityInCart}</span>
                            <button className="counter-btn add" onClick={() => addToCart(id)}>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="food-item-info">
                <div className="food-item-header">
                    <h3 className="food-item-title">{name}</h3>
                    <div className="food-item-rating">
                        <span>★ 4.8</span>
                    </div>
                </div>
                
                <p className="food-item-desc">{description}</p>
                
                <div className="food-item-footer">
                    <span className="food-item-price">${formattedPrice.toFixed(2)}</span>
                    <span className="price-tag-sub">Per Portion</span>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;