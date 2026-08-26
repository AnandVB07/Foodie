import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <>
            <div className='footer-content' id='footer-content'>
                <div className="footer-content-left">
                    <div className='foot-content-logo'>
                        <div className='foot-content-logo-row'>
                            <img src='https://i.pinimg.com/736x/4c/0d/6a/4c0d6af9578057f2ddcf3fb38cbf97e0.jpg' alt='food' />
                            <h1>foodie</h1>
                        </div>
                        <p>@2024 All rights Reserved</p>
                    </div>

                </div>

                <div className="footer-content-center">
                    <h2>Contact Us</h2>
                    <p>Help & Support</p>
                    <p>Partner with us</p>
                    <p>Ride with us</p>
                    <h2>Legal</h2>
                    <p>Terms & conditions</p>
                    <p>Cookies policy</p>
                    <p>Privacy Policy</p>
                </div>
                <div className="footer-content-right">
                    <h2>Follow Us</h2>
                    <i className="bi bi-instagram" id='links'/>
                    <i className="bi bi-linkedin" id='link'></i>
                    <h4>anandrocky61@gmail.com</h4>
                    <p><img src='https://w7.pngwing.com/pngs/506/939/png-transparent-app-store-logo-iphone-app-store-get-started-now-button-electronics-text-telephone-call.png' alt='app_store' /></p>
                    <p><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQWWITYNF6AEDoseS8KCNqbOyuSFhqYKvTDw&s' alt='app_store'/></p>
                </div>
            </div>
            <hr className='footer-content-line'/>
            <p className='footer-content-rights'>© 2025 Foodie Ltd. All rights reserved.</p>
        </>
    )
}

export default Footer