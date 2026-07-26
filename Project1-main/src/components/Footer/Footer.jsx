import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section" id="footer-content">
            <div className="footer-content">
                <div className="footer-content-left">
                    <div className="footer-logo">
                        <span className="footer-logo-icon">🍕</span>
                        <span className="footer-logo-text">Foodie</span>
                    </div>
                    <p className="footer-bio">
                        Bringing hot, fresh, and delicious meals straight to your doorstep with love and lightning speed. Your satisfaction is our top recipe!
                    </p>
                    <div className="footer-social-icons">
                        <a href="#instagram" className="social-circle" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#twitter" className="social-circle" title="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                        <a href="#linkedin" className="social-circle" title="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="#facebook" className="social-circle" title="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                    </div>
                </div>

                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#explore-menu">About Us</a></li>
                        <li><a href="#explore-menu">Delivery Partners</a></li>
                        <li><a href="#explore-menu">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li><i className="fa-solid fa-phone"></i> +1 (555) 234-5678</li>
                        <li><i className="fa-solid fa-envelope"></i> support@foodie.com</li>
                        <li><i className="fa-solid fa-location-dot"></i> 452 Culinary St, Food City</li>
                    </ul>
                    <div className="app-download-badges">
                        <button className="store-badge-btn">
                            <i className="fa-brands fa-apple"></i>
                            <div>
                                <span className="sub-txt">Download on</span>
                                <span className="main-txt">App Store</span>
                            </div>
                        </button>
                        <button className="store-badge-btn">
                            <i className="fa-brands fa-google-play"></i>
                            <div>
                                <span className="sub-txt">GET IT ON</span>
                                <span className="main-txt">Google Play</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            
            <hr className="footer-divider" />
            <p className="footer-copyright">© {new Date().getFullYear()} Foodie Inc. All rights reserved.</p>
        </footer>
    );
};

export default Footer;