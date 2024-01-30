import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/aboutPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EventDetails from "./pages/EventDetailsPage";
import "./App.css";
import EventPage from "./pages/EventPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<h1>Page not found</h1>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/eventDetail/:eventId"
            element={
              <PrivateRoute>
                <EventDetailsPage />
              </PrivateRoute>
            }
          />

          <Route path="/event/new" element={<EventPage />} />
          <Route path="/event/:eventId" element={<UpdateEventPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
