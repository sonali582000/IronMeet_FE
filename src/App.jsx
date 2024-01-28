import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from "./pages/aboutPage";
import ProfilePage from "./pages/ProfilePage";
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />

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
