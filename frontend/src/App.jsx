import { useState } from "react";
import Navbar from "./components/Navbar";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#ffffff] to-[#eff6ff] dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#111827] text-[#111827] dark:text-[#f3f4f6]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResumeForm formData={formData} onChange={handleChange} />
          <ResumePreview formData={formData} />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-[#6b7280] dark:text-[#9ca3af]">
        © {new Date().getFullYear()} ResuMate — Build. Preview. Shine.
      </footer>
    </div>
  );
}



