import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ResumeDashboard from "./pages/ResumeDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PortfolioView from "./pages/PortfolioView"; // ⬅️ NEW

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} isLoggedIn={!!token} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Routes>
          {/* Public route for portfolio (no login required) */}
          <Route path="/portfolio/:id" element={<PortfolioView />} />

          {!token ? (
            <>
              {/* Public routes */}
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {/* Private routes after login */}
              <Route path="/" element={<ResumeDashboard />} />
              <Route path="/dashboard" element={<ResumeDashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </main>

      <footer className="py-6 text-center text-sm text-[#6b7280] dark:text-[#9ca3af]">
        © {new Date().getFullYear()} ResuMate — Build. Preview. Shine.
      </footer>
    </Router>
  );
}





