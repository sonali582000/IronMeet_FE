import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EventDetails from './pages/EventDetailsPage';
import './App.css';

function App() {
  return (
    <>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} /> 
          <Route path='/eventDetail/:eventId' element={<EventDetails />} /> 
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
