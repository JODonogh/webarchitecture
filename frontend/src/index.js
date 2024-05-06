import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './components/Navigation'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(// render method
  <React.StrictMode>
    <Navigation />
      
  </React.StrictMode>
);
