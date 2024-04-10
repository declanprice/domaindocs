import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useAuthStore } from '@state/stores/auth.store.ts'

useAuthStore
    .getState()
    ?.checkSession()
    .then(() => {
        ReactDOM.createRoot(document.getElementById('root')!).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        )
    })
