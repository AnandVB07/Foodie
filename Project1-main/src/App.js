import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Verify from './pages/Verify/Verify';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Footer from './components/Footer/Footer';
import MyOrder from './pages/MyOrder/MyOrder';

const App = () => {
  const[showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}></ LoginPopup>:<></>}
    <div className='app-container'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/myorders" element={<MyOrder/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App