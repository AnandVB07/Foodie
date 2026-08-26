import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import StoreContext from '../../contexts/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, url, token } = useContext(StoreContext);

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

    if (!token) {
      alert("Please login to place an order.");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30,  // ₹30 delivery fee
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert(response.data.message || "Error placing the order");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Something went wrong while placing the order. Is the backend running?");
    }
  };

  return (
    <form onSubmit={handlePlaceOrder} className='place-order-form'>
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <div className='place-order-flex'>
          <input className='form-style' name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' required />
          <input type='text' name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
        </div>
        <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
        <input type='text' name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
        <div className='place-order-flex'>
          <input type='text' name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
          <input type='text' name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
        </div>
        <div className='place-order-flex'>
          <input type='text' name='pincode' onChange={onChangeHandler} value={data.pincode} placeholder='Pincode' required />
          <input type='text' name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
        </div>
        <input type='tel' name='phoneNumber' onChange={onChangeHandler} value={data.phoneNumber} placeholder='Phone Number' required />
      </div>

      <div className="place-order-right">
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-items">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-items">
              <p>Delivery fee</p>
              <p>₹30</p>
            </div>
            <hr />
            <div className="cart-total-items">
              <p>Total amount</p>
              <p>₹{getTotalCartAmount() + 30}</p>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
