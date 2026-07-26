import React, { useEffect } from "react";
import './Verify.css';
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId") || "ORD-" + Math.floor(1000 + Math.random() * 9000);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/myorders");
        }, 2200);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="verify-page">
            <div className="verify-card">
                <div className="success-checkmark-wrapper">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
                <h2>Payment Verified! 🎉</h2>
                <p className="order-id-txt">Order Reference: <strong>{orderId}</strong></p>
                <p className="verify-sub">Your order has been placed successfully and sent to the kitchen.</p>
                
                <div className="redirect-loading">
                    <div className="dot-flashing"></div>
                    <span>Redirecting to My Orders...</span>
                </div>
            </div>
        </div>
    );
};

export default Verify;
