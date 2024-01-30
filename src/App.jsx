import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EventDetails from "./pages/EventDetailsPage";
import "./App.css";
import EventPage from "./pages/EventPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import AllComment from "./components/AllComment";
import AllEventsPage from "./pages/AllEventsPage";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/allEvents" element={<AllEventsPage />} />
          <Route path="/*" element={<h1>Page not found</h1>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/eventDetail/:eventId" element={<EventDetails />} />
          <Route path="/event/new" element={<EventPage />} />
          <Route path="/event/:eventId" element={<UpdateEventPage />} />
          <Route path="/comment/:eventId" element={<AllComment />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
