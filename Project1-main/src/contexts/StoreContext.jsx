import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { food_list as localFoodList } from '../assets/assets';

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const url = "http://localhost:4000"; // Backend URL

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success && response.data.data.length > 0) {
                setFoodList(response.data.data);
            } else {
                // Fallback: use local static food list
                setFoodList(localFoodList.map(item => ({
                    ...item,
                    price: parseFloat(item.price.replace('₹', '')) || 0
                })));
            }
        } catch (error) {
            console.error("Backend not reachable, using local food list:", error.message);
            // Fallback: use local static food list with numeric prices
            setFoodList(localFoodList.map(item => ({
                ...item,
                price: parseFloat(String(item.price).replace('₹', '')) || 0
            })));
        }
    };

    const fetchCart = async () => {
        if (token) {
            try {
                const response = await axios.post(`${url}/api/cart/get`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.error("Error fetching cart:", error.message);
            }
        }
    };

    const addToCart = async (itemId) => {
        const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
        setCartItems(updatedCart);
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) {
                console.error("Error adding to cart:", error.message);
            }
        }
    };

    const removeToCart = async (itemId) => {
        const updatedCart = { ...cartItems };
        if (updatedCart[itemId] > 0) {
            updatedCart[itemId] -= 1;
            if (updatedCart[itemId] === 0) {
                delete updatedCart[itemId];
            }
            setCartItems(updatedCart);
            if (token) {
                try {
                    await axios.post(`${url}/api/cart/remove`, { itemId }, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                } catch (error) {
                    console.error("Error removing from cart:", error.message);
                }
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find(item => item._id === itemId);
                if (itemInfo) {
                    totalAmount += Number(itemInfo.price) * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    // On mount and when token changes: fetch food list & cart
    useEffect(() => {
        fetchFoodList();
        fetchCart();
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContextProvider };
export default StoreContext;