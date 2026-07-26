import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import StoreContext from '../../contexts/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const { cartItems, token, setToken, searchQuery, setSearchQuery } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const totalCartCount = Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleNavClick = (menuName, targetId) => {
    setMenu(menuName);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" onClick={() => setMenu("home")} className="navbar-logo">
          <span className="logo-icon">🍕</span>
          <span className="logo-text">Foodie</span>
        </Link>
      </div>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <span onClick={() => handleNavClick("menu", "explore-menu")} className={menu === "menu" ? "active" : ""}>
          Menu
        </span>
        <span onClick={() => handleNavClick("contact", "footer-content")} className={menu === "contact" ? "active" : ""}>
          Contact Us
        </span>
        {token && (
          <Link to="/myorders" onClick={() => setMenu("orders")} className={menu === "orders" ? "active" : ""}>
            My Orders
          </Link>
        )}
      </ul>

      <div className="navbar-right">
        {/* Search Bar */}
        <div className={`search-container ${showSearch ? "expanded" : ""}`}>
          <i
            className="fa-solid fa-magnifying-glass search-icon"
            onClick={() => setShowSearch(!showSearch)}
            title="Search dishes"
          ></i>
          {showSearch && (
            <input
              type="text"
              className="search-input"
              placeholder="Search food, pizza..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          )}
        </div>

        {/* Cart Link with Badge */}
        <Link to="/cart" className="navbar-cart-icon">
          <i className="fa-solid fa-basket-shopping"></i>
          {totalCartCount > 0 && (
            <span className="cart-badge-count">{totalCartCount}</span>
          )}
        </Link>

        {/* Auth / Profile */}
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="navbar-button">
            Sign In
          </button>
        ) : (
          <div className="navbar-profile">
            <div className="avatar-circle">
              <i className="fa-solid fa-user"></i>
            </div>
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <i className="fa-solid fa-bag-shopping"></i>
                <p>My Orders</p>
              </li>
              <li onClick={() => navigate("/cart")}>
                <i className="fa-solid fa-cart-shopping"></i>
                <p>View Cart</p>
              </li>
              <hr />
              <li onClick={logout} className="logout-item">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
