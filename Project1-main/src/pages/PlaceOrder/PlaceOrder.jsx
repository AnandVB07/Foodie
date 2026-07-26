import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import StoreContext from '../../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, addOrder, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phoneNumber: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          price: typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0,
          quantity: cartItems[item._id]
        });
      }
    });

    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/");
      return;
    }

    const subTotal = getTotalCartAmount();
    const finalAmount = subTotal + 2;

    const orderData = {
      address: data,
      items: orderItems,
      amount: finalAmount,
      paymentMethod
    };

    // Try sending to backend, if backend unavailable or offline, use local storage state handler
    if (token) {
      try {
        const response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.success && response.data.session_url) {
          window.location.href = response.data.session_url;
          return;
        }
      } catch (error) {
        console.log("Backend API offline - using frontend order simulator");
      }
    }

    // Local state fallback order processing
    const orderId = addOrder(orderData);
    navigate(`/verify?success=true&orderId=${orderId}`);
  };

  const subTotal = getTotalCartAmount();
  const deliveryFee = subTotal > 0 ? 2 : 0;
  const grandTotal = subTotal + deliveryFee;

  return (
    <div className="place-order-page">
      <form onSubmit={handlePlaceOrder} className="place-order-form">
        <div className="place-order-left">
          <h2>Delivery Information 🚚</h2>
          <p className="form-subtitle">Enter your details to receive your order</p>
          
          <div className="place-order-flex">
            <input className="form-input" name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name *" required />
            <input className="form-input" name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name *" required />
          </div>

          <input className="form-input" type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email Address *" required />
          <input className="form-input" type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street / House No *" required />

          <div className="place-order-flex">
            <input className="form-input" type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City *" required />
            <input className="form-input" type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State *" required />
          </div>

          <div className="place-order-flex">
            <input className="form-input" type="text" name="pincode" onChange={onChangeHandler} value={data.pincode} placeholder="Zip / Pincode *" required />
            <input className="form-input" type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country *" required />
          </div>

          <input className="form-input" type="tel" name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber} placeholder="Phone Number *" required />
        </div>

        <div className="place-order-right">
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
            <hr />
            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <div className="payment-options">
              <h3>Payment Method</h3>
              <div 
                className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <i className="fa-solid fa-credit-card"></i>
                <span>Credit / Debit Card</span>
              </div>
              <div 
                className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <i className="fa-solid fa-money-bill-wave"></i>
                <span>Cash on Delivery</span>
              </div>
            </div>

            <button type="submit" className="proceed-payment-btn">
              PROCEED TO PAYMENT (${grandTotal.toFixed(2)}) ➔
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
