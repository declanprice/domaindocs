import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useAuthStore } from './state/stores/auth.store';
import App from './App';

useAuthStore
  .getState()
  ?.checkSession()
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
