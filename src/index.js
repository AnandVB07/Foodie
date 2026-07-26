import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StoreContextProvider } from './contexts/StoreContext'; // ✅ FIXED: Use StoreContextProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <StoreContextProvider>  {/* ✅ FIXED */}
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);

reportWebVitals();
