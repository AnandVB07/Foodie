import React, { useContext } from 'react';
import StoreContext from '../../contexts/StoreContext';
import './Toast.css';

const Toast = () => {
    const { toastMessage } = useContext(StoreContext);

    if (!toastMessage) return null;

    return (
        <div className="toast-notification">
            <div className="toast-content">
                <span className="toast-icon">✨</span>
                <span className="toast-text">{toastMessage}</span>
            </div>
        </div>
    );
};

export default Toast;
