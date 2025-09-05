import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { useNavigate } from "react-router-dom";

export default function ResumeDashboard() {
  const navigate = useNavigate();

  const emptyForm = {
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
    certificates: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [savedResumes, setSavedResumes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [userId, setUserId] = useState(null);

  // ---------------- Token helpers ----------------
  const getToken = () => localStorage.getItem("token");
  const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const requireLogin = () => {
    if (!isTokenValid()) {
      alert("⚠️ Please log in or your session has expired");
      localStorage.removeItem("token");
      return false;
    }
    return true;
  };

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  // ---------------- Load dashboard state from localStorage ----------------
  useEffect(() => {
    if (isTokenValid()) {
      const token = getToken();
      const decoded = jwtDecode(token);
      const uid = decoded.id || decoded._id || decoded.email; // depending on your backend
      setUserId(uid);

      const state = localStorage.getItem(`resumeDashboardState_${uid}`);
      if (state) {
        try {
          const parsed = JSON.parse(state);
          setFormData(parsed.formData || emptyForm);
          setSavedResumes(parsed.savedResumes || []);
          setEditingId(parsed.editingId || null);
        } catch (e) {
          console.error("Error parsing dashboard state:", e);
        }
      } else {
        // fresh form for new user
        setFormData(emptyForm);
        setSavedResumes([]);
        setEditingId(null);
      }

      loadResumes(); // only load if token exists and is valid
    }
  }, []);

  // ---------------- Save dashboard state ----------------
  const saveDashboardState = (
    updatedForm = formData,
    updatedResumes = savedResumes,
    updatedEditingId = editingId
  ) => {
    if (!userId) return;
    const stateToSave = {
      formData: updatedForm,
      savedResumes: updatedResumes,
      editingId: updatedEditingId,
    };
    localStorage.setItem(
      `resumeDashboardState_${userId}`,
      JSON.stringify(stateToSave)
    );
  };

  // ---------------- Handle input changes ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    saveDashboardState(updatedForm, savedResumes, editingId);
  };

  // ---------------- Create new resume ----------------
  const createNewResume = () => {
    setFormData(emptyForm);
    setEditingId(null);
    saveDashboardState(emptyForm, savedResumes, null);
  };

  // ---------------- Save new resume ----------------
  const saveResume = async () => {
    if (!requireLogin()) return;

    try {
      const payload = {
        ...formData,
        skills: formData.skills
          ? formData.skills.split(",").map((s) => s.trim())
          : [],
      };

      const res = await fetch("http://localhost:5000/resume", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save resume");
      }

      const data = await res.json();

      alert("✅ Resume saved!");
      const updatedResumes = [data, ...savedResumes];
      setSavedResumes(updatedResumes);
      setEditingId(data._id);
      saveDashboardState(formData, updatedResumes, data._id);
    } catch (err) {
      console.error("Error saving resume:", err);
      alert(`❌ ${err.message}`);
    }
  };

  // ---------------- Load resumes ----------------
  const loadResumes = async () => {
    if (!requireLogin()) return;

    try {
      const res = await fetch("http://localhost:5000/resume", {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to load resumes");
      }

      const data = await res.json();
      setSavedResumes(data);
      saveDashboardState(formData, data, editingId);
    } catch (err) {
      console.error("Error loading resumes:", err);
      alert(`❌ ${err.message}`);
    }
  };

  // ---------------- Update resume ----------------
  const updateResume = async () => {
    if (!editingId) return alert("⚠️ No resume selected for editing");
    if (!requireLogin()) return;

    try {
      const payload = {
        ...formData,
        skills: formData.skills
          ? formData.skills.split(",").map((s) => s.trim())
          : [],
      };

      const res = await fetch(`http://localhost:5000/resume/${editingId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update resume");
      }

      const data = await res.json();

      alert("✏️ Resume updated!");
      const updatedResumes = savedResumes.map((r) =>
        r._id === editingId ? data : r
      );
      setSavedResumes(updatedResumes);
      saveDashboardState(formData, updatedResumes, editingId);
    } catch (err) {
      console.error("Error updating resume:", err);
      alert(`❌ ${err.message}`);
    }
  };

  // ---------------- Delete resume ----------------
  const deleteResume = async (id) => {
    if (!requireLogin()) return;

    try {
      const res = await fetch(`http://localhost:5000/resume/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete resume");
      }

      alert("🗑️ Resume deleted!");
      const updatedResumes = savedResumes.filter((resume) => resume._id !== id);
      setSavedResumes(updatedResumes);

      let updatedEditingId = editingId;
      if (editingId === id) updatedEditingId = null;
      setEditingId(updatedEditingId);

      saveDashboardState(formData, updatedResumes, updatedEditingId);
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert(`❌ ${err.message}`);
    }
  };

  // ---------------- Publish & Share (Public) ----------------
  const publishResume = async () => {
    if (!editingId) return alert("⚠️ Select a resume first (click from list).");
    if (!requireLogin()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/resume/${editingId}/publish`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to publish resume");
      }

      const data = await res.json(); // updated resume with isPublic = true
      const updatedResumes = savedResumes.map((r) =>
        r._id === data._id ? data : r
      );
      setSavedResumes(updatedResumes);
      saveDashboardState(formData, updatedResumes, editingId);

      const shareUrl = `${window.location.origin}/portfolio/${data._id}`;

      // Copy to clipboard + prompt
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("🔗 Share link copied to clipboard:\n" + shareUrl);
      } catch {
        alert("🔗 Share this link:\n" + shareUrl);
      }
    } catch (err) {
      console.error("Error publishing resume:", err);
      alert(`❌ ${err.message}`);
    }
  };

  // ---------------- Quick view portfolio ----------------
  const openPortfolio = () => {
    if (!editingId) return alert("⚠️ Select a resume first.");
    window.open(`/portfolio/${editingId}`, "_blank");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Form + buttons + list */}
      <div>
        <ResumeForm formData={formData} onChange={handleChange} />

        <div className="flex gap-2 mt-6 flex-wrap">
          <button
            onClick={createNewResume}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
          >
            🆕 Create New Resume
          </button>

          <button
            onClick={saveResume}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
          >
            💾 Save New
          </button>

          <button
            onClick={updateResume}
            className={`px-4 py-2 rounded-xl shadow ${
              editingId
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!editingId}
          >
            ✏️ Update
          </button>

          <button
            onClick={loadResumes}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          >
            📂 Load Resumes
          </button>

          <button
            onClick={publishResume}
            className={`px-4 py-2 rounded-xl shadow ${
              editingId
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!editingId}
          >
            🌐 Publish & Get Share Link
          </button>

          <button
            onClick={openPortfolio}
            className={`px-4 py-2 rounded-xl shadow ${
              editingId
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!editingId}
          >
            🖥️ View Portfolio
          </button>
        </div>

        {/* Saved resumes list */}
        {savedResumes.length > 0 && (
          <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-inner">
            <h2 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
              Saved Resumes
            </h2>
            <ul className="space-y-2">
              {savedResumes.map((resume) => (
                <li
                  key={resume._id}
                  className="flex justify-between items-center bg-white dark:bg-gray-900 p-2 rounded-lg shadow-sm"
                >
                  <button
                    className={`text-left flex-1 ${
                      editingId === resume._id
                        ? "text-yellow-600 font-semibold"
                        : "text-blue-600 hover:underline"
                    }`}
                    onClick={() => {
                      const selectedResume = {
                        ...resume,
                        skills: Array.isArray(resume.skills)
                          ? resume.skills.join(", ")
                          : resume.skills || "",
                      };
                      setFormData(selectedResume);
                      setEditingId(resume._id);
                      saveDashboardState(
                        selectedResume,
                        savedResumes,
                        resume._id
                      );
                    }}
                  >
                    {resume.name || "Untitled"} ({resume.email})
                    {resume.isPublic && (
                      <span className="ml-2 text-xs text-green-600">
                        • Public
                      </span>
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        window.open(`/portfolio/${resume._id}`, "_blank")
                      }
                      className="text-teal-600 hover:text-teal-800 text-sm"
                      title="Open portfolio"
                    >
                      🖥️
                    </button>
                    <button
                      onClick={() => deleteResume(resume._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right: Preview */}
      <ResumePreview formData={formData} />
    </div>
  );
}




















