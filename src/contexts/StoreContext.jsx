import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { food_list as defaultFoodList } from '../assets/assets';

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [food_list, setFoodList] = useState(defaultFoodList);
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : {};
        } catch (e) {
            return {};
        }
    });
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [searchQuery, setSearchQuery] = useState("");
    const [toastMessage, setToastMessage] = useState(null);
    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem('foodie_orders');
            return savedOrders ? JSON.parse(savedOrders) : [
                {
                    _id: "ORD-9821",
                    date: new Date(Date.now() - 3600000 * 2).toLocaleDateString() + " " + new Date(Date.now() - 3600000 * 2).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    items: [
                        { name: "Margherita Pizza", price: 150, quantity: 1 },
                        { name: "Garlic Bread", price: 30, quantity: 2 }
                    ],
                    amount: 212,
                    status: "Out for Delivery",
                    address: { city: "New York", street: "5th Avenue" }
                }
            ];
        } catch (e) {
            return [];
        }
    });

    const url = "http://localhost:400"; // Backend URL

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 2800);
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data && response.data.data && response.data.data.length > 0) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            // Silently fall back to default assets
            setFoodList(defaultFoodList);
        }
    };

    const fetchCart = async () => {
        if (token) {
            try {
                const response = await axios.post(`${url}/api/cart/get`, { userId: token }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data && response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.log("Cart sync using local storage fallback");
            }
        }
    };

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (e) { }
    }, [cartItems]);

    useEffect(() => {
        try {
            localStorage.setItem('foodie_orders', JSON.stringify(orders));
        } catch (e) { }
    }, [orders]);

    const addToCart = async (itemId) => {
        const item = food_list.find(f => f._id === itemId);
        const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
        setCartItems(updatedCart);
        if (item) {
            showToast(`Added "${item.name}" to cart 🛒`);
        }
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId, userId: token }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) { }
        }
    };

    const removeToCart = async (itemId) => {
        const updatedCart = { ...cartItems };
        if (updatedCart[itemId] > 0) {
            const item = food_list.find(f => f._id === itemId);
            updatedCart[itemId] -= 1;
            if (updatedCart[itemId] === 0) {
                delete updatedCart[itemId];
            }
            setCartItems(updatedCart);
            if (item) {
                showToast(`Removed "${item.name}" from cart 🗑️`);
            }
            if (token) {
                try {
                    await axios.post(`${url}/api/cart/remove`, { itemId, userId: token }, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                } catch (error) { }
            }
        }
    };

    const clearCart = () => {
        setCartItems({});
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find(item => item._id === itemId);
                if (itemInfo) {
                    const priceNum = typeof itemInfo.price === 'number'
                        ? itemInfo.price
                        : parseFloat(itemInfo.price.toString().replace(/[^0-9.]/g, '')) || 0;
                    totalAmount += priceNum * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    const addOrder = (orderData) => {
        const newOrder = {
            _id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            items: orderData.items,
            amount: orderData.amount,
            status: "Order Placed",
            address: orderData.address
        };
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        return newOrder._id;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchFoodList();
        fetchCart();
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeToCart,
        clearCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        orders,
        addOrder
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContextProvider };
export default StoreContext;