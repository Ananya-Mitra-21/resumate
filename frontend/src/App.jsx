import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
    github: "",
    linkedin: "",
    leetcode: "",
    website: "",
    projects: "",
  });

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} isLoggedIn={!!token} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ResumeForm formData={formData} onChange={handleChange} />
                    <ResumePreview formData={formData} />
                  </div>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
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
