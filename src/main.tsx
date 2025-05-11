
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Changed from BrowserRouter to HashRouter
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter> {/* Changed from BrowserRouter with basename to HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);
