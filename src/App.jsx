import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Define other routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
