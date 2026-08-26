import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import StoreContext from '../contexts/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount,token,setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("")
    navigate("/");
  }

  return (
    <div className="navbar">
      <img src="https://i.pinimg.com/736x/4c/0d/6a/4c0d6af9578057f2ddcf3fb38cbf97e0.jpg" alt="food" />
      <h1>foodie</h1>

      <div>
        <ul className="list">
          <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
          <a href="#mob" onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobileapp</a>
          <a href="#explore-menu" onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
          <a href="#footer-content" onClick={() => setMenu("Contact-Us")} className={menu === "Contact-Us" ? "active" : ""}>ContactUs</a>
        </ul>
      </div>

      <div>
        <ul className="cart">
          <li><i className="fa-solid fa-magnifying-glass"></i></li>

          {/* Cart Icon with Notification Dot */}
          <li className="cart-container">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
          </li>
          {!token?<li><button onClick={() => setShowLogin(true)} className='cart-prof'> Sign up</button></li>:
          
          <div className='navbar-profile'>
               <i className="bi bi-person" ></i>
               <ul className="navbar-profile-dropdown">
                <li><Link to="/myorders"><p>My Orders</p></Link></li>
                <li><p>Profile</p></li>
                <li><p>Favourites</p></li>
                <li onClick={logout}>LogOut</li>

               </ul>
          </div>
          }
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;