import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Verify from './pages/Verify/Verify';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import MyOrder from './pages/MyOrder/MyOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Footer from './components/Footer/Footer';
import Toast from './components/Toast/Toast';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Toast />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrder />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default App;