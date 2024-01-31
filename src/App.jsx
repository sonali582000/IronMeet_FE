import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import EventPage from "./pages/EventPage";
import UpdateEventPage from "./pages/UpdateEventPage";
import AllComment from "./components/AllComment";
import AllEventsPage from "./pages/AllEventsPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<h1>Page not found</h1>} />
          <Route path="/allEvents" element={<AllEventsPage />} />
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
          <Route
            path="/event/new"
            element={
              <PrivateRoute>
                <EventPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/event/:eventId"
            element={
              <PrivateRoute>
                <UpdateEventPage />
              </PrivateRoute>
            }
          />
          {/* <Route path="/comment/:eventId" element={<AllComment />} /> This is for testing purpose don't uncomment it */}
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
