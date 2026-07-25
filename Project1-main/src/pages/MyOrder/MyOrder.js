import React, { useContext } from 'react';
import StoreContext from '../../contexts/StoreContext';
import './MyOrder.css';
import { useNavigate } from 'react-router-dom';

const MyOrder = () => {
    const { orders } = useContext(StoreContext);
    const navigate = useNavigate();

    const getStatusStep = (status) => {
        switch (status) {
            case "Order Placed": return 1;
            case "Preparing": return 2;
            case "Out for Delivery": return 3;
            case "Delivered": return 4;
            default: return 3;
        }
    };

    return (
        <div className="my-orders-page">
            <div className="my-orders-header">
                <h1>My Orders 📦</h1>
                <p>Track your current food deliveries and past order history</p>
            </div>

            {orders.length === 0 ? (
                <div className="no-orders-card">
                    <div className="no-orders-icon">🛵</div>
                    <h2>No orders placed yet!</h2>
                    <p>Hungry? Order your favorite meals now and track them live right here.</p>
                    <button onClick={() => navigate('/')} className="order-now-btn">
                        Browse Food Menu
                    </button>
                </div>
            ) : (
                <div className="orders-list-container">
                    {orders.map((order) => {
                        const currentStep = getStatusStep(order.status);
                        return (
                            <div className="order-card" key={order._id}>
                                <div className="order-card-top">
                                    <div className="order-meta">
                                        <span className="order-id-badge">{order._id}</span>
                                        <span className="order-date-txt">{order.date}</span>
                                    </div>
                                    <div className="order-status-badge">
                                        <span className={`status-pill ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                            ● {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-items-preview">
                                    <div className="items-list-text">
                                        <i className="fa-solid fa-box-open"></i>
                                        <p>
                                            {order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
                                        </p>
                                    </div>
                                    <div className="order-total-price">
                                        <span>Total:</span>
                                        <strong>${typeof order.amount === 'number' ? order.amount.toFixed(2) : order.amount}</strong>
                                    </div>
                                </div>

                                {/* Order Tracker Timeline */}
                                <div className="order-tracker-timeline">
                                    <div className={`step-item ${currentStep >= 1 ? 'completed' : ''}`}>
                                        <div className="step-icon">📋</div>
                                        <p>Placed</p>
                                    </div>
                                    <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
                                    <div className={`step-item ${currentStep >= 2 ? 'completed' : ''}`}>
                                        <div className="step-icon">👨‍🍳</div>
                                        <p>Preparing</p>
                                    </div>
                                    <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
                                    <div className={`step-item ${currentStep >= 3 ? 'completed' : ''}`}>
                                        <div className="step-icon">🛵</div>
                                        <p>On The Way</p>
                                    </div>
                                    <div className={`step-line ${currentStep >= 4 ? 'active' : ''}`}></div>
                                    <div className={`step-item ${currentStep >= 4 ? 'completed' : ''}`}>
                                        <div className="step-icon">😋</div>
                                        <p>Delivered</p>
                                    </div>
                                </div>

                                <div className="order-card-bottom">
                                    <span className="delivery-address-txt">
                                        📍 Deliver to: {order.address?.street ? `${order.address.street}, ${order.address.city}` : 'Home Address'}
                                    </span>
                                    <button className="track-order-btn" onClick={() => alert(`Tracking ${order._id}: Package is ${order.status}`)}>
                                        Track Live Status 📡
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyOrder;
