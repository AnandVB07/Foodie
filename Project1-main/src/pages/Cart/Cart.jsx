import React, { useContext, useState } from 'react';
import './Cart.css';
import StoreContext from '../../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeToCart, addToCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FOODIE20') {
      setDiscount(0.2); // 20% discount
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscount(0.1);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "FOODIE20" for 20% off!');
    }
  };

  const subTotal = getTotalCartAmount();
  const deliveryFee = subTotal > 0 ? 2.0 : 0.0;
  const discountAmount = subTotal * discount;
  const finalTotal = subTotal > 0 ? subTotal + deliveryFee - discountAmount : 0.0;

  const getImageSrc = (item) => {
    if (!item.image) return 'https://via.placeholder.com/100?text=Food';
    if (typeof item.image === 'string' && (item.image.startsWith('http') || item.image.startsWith('data:') || item.image.startsWith('/'))) {
      return item.image;
    }
    if (typeof item.image === 'object' || (typeof item.image === 'string' && item.image.includes('static/media'))) {
      return item.image;
    }
    return `${url}/images/${item.image}`;
  };

  const cartHasItems = Object.values(cartItems).some(qty => qty > 0);

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h1>Your Shopping Cart 🛒</h1>
        <p>Review your selected items and proceed to checkout</p>
      </div>

      {!cartHasItems ? (
        <div className="empty-cart-state">
          <div className="empty-cart-icon">🛍️</div>
          <h2>Your cart is empty!</h2>
          <p>Looks like you haven't added any delicious meals to your cart yet.</p>
          <button onClick={() => navigate('/')} className="explore-btn">
            Explore Menu & Order
          </button>
        </div>
      ) : (
        <div className="cart-container-grid">
          <div className="cart-items-section">
            <div className="cart-table-header">
              <p className="col-item">Dish</p>
              <p className="col-title">Title</p>
              <p className="col-price">Price</p>
              <p className="col-qty">Quantity</p>
              <p className="col-total">Total</p>
              <p className="col-remove">Action</p>
            </div>
            <div className="cart-items-list">
              {food_list.map((item) => {
                const quantity = cartItems[item._id] || 0;
                if (quantity > 0) {
                  const priceNum = typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0;
                  return (
                    <div className="cart-item-row" key={item._id}>
                      <div className="col-item">
                        <img src={getImageSrc(item)} alt={item.name} className="cart-item-img" />
                      </div>
                      <div className="col-title">
                        <p className="item-name">{item.name}</p>
                        <span className="item-cat">{item.category}</span>
                      </div>
                      <div className="col-price">${priceNum.toFixed(2)}</div>
                      <div className="col-qty">
                        <div className="cart-qty-toggle">
                          <button onClick={() => removeToCart(item._id)}>-</button>
                          <span>{quantity}</span>
                          <button onClick={() => addToCart(item._id)}>+</button>
                        </div>
                      </div>
                      <div className="col-total">${(priceNum * quantity).toFixed(2)}</div>
                      <div className="col-remove">
                        <button onClick={() => removeToCart(item._id)} className="remove-btn-icon" title="Remove item">
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="promo-box">
              <h3>Have a Promo Code?</h3>
              <form onSubmit={handleApplyPromo} className="promo-input-group">
                <input
                  type="text"
                  placeholder="Enter code (e.g. FOODIE20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <button type="submit" disabled={promoApplied}>
                  {promoApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </form>
              {promoApplied && <p className="promo-success">🎉 Promo code applied! You saved ${discountAmount.toFixed(2)}</p>}
            </div>

            <div className="cart-total-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount (20%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="summary-row total-row">
                <span>Total Amount</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => navigate('/order')} className="checkout-btn">
                PROCEED TO CHECKOUT ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;