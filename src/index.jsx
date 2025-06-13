import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const mountPoint = document.getElementById('react-slide-app') || document.getElementById('root');

if (mountPoint) {
  ReactDOM.createRoot(mountPoint).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} 
