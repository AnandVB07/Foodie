import React, { useContext, useEffect, useState } from 'react';
import './MyOrder.css';
import StoreContext from '../../contexts/StoreContext';
import axios from 'axios';

const MyOrder = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setOrders(response.data.data.reverse()); // newest first
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    const statusColor = (status) => {
        switch (status) {
            case 'Food Processing': return '#f59e0b';
            case 'Out for Delivery': return '#3b82f6';
            case 'Delivered': return '#10b981';
            default: return '#6b7280';
        }
    };

    if (!token) {
        return (
            <div className="myorder-empty">
                <div className="myorder-empty-icon">🔐</div>
                <h2>Please login to view your orders</h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="myorder-loading">
                <div className="myorder-spinner"></div>
                <p>Loading your orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="myorder-empty">
                <div className="myorder-empty-icon">🍽️</div>
                <h2>No orders yet!</h2>
                <p>Looks like you haven't ordered anything yet. Go explore the menu!</p>
            </div>
        );
    }

    return (
        <div className="myorder">
            <h2>My Orders</h2>
            <div className="myorder-container">
                {orders.map((order) => (
                    <div key={order.id} className="myorder-card">
                        <div className="myorder-card-header">
                            <div className="myorder-icon">🛍️</div>
                            <div className="myorder-info">
                                <p className="myorder-items-summary">
                                    {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                                </p>
                                <p className="myorder-date">
                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric',
                                        hour: '2-digit', minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="myorder-card-footer">
                            <div className="myorder-amount">
                                <span>Items: {order.items.reduce((sum, i) => sum + i.quantity, 0)}</span>
                                <span className="myorder-total">₹{order.amount}</span>
                            </div>
                            <div
                                className="myorder-status"
                                style={{ backgroundColor: statusColor(order.status) }}
                            >
                                ● {order.status}
                            </div>
                        </div>
                        <div className="myorder-address">
                            <p>📦 {order.address.firstName} {order.address.lastName}, {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrder;
