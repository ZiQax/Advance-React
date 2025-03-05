import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import Register
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import ProfilePage from "./pages/ProfilePage"; 
import SubscriptionPage from "./pages/SubscriptionPage"; 
import PaymentPage from "./pages/Payment";
import "./App.css";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} /> 
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} /> 
        <Route path="/subscription" element={user ? <SubscriptionPage /> : <Navigate to="/login" />} /> 
        <Route path="/payment" element={user ? <PaymentPage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
