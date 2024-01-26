import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from "./pages/aboutPage";
import ProfilePage from "./pages/ProfilePage";
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
