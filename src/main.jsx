import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext.jsx'
import EventContextProvider from './contexts/EventContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <EventContextProvider>
          <App />
        </EventContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
