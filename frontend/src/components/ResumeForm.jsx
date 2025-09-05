import axios from "axios";

export default function ResumeForm({ formData, onChange }) {
  // --- helper function to call AI backend ---
  const improveField = async (fieldName) => {
    const fieldValue = formData[fieldName];
    if (!fieldValue || fieldValue.trim() === "") {
      alert(`⚠️ Please write something in ${fieldName} first!`);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/ai/suggest", {
        text: fieldValue,
      });

      if (res.data && res.data.suggestion) {
        onChange({
          target: { name: fieldName, value: res.data.suggestion },
        });
      }
    } catch (err) {
      console.error("AI Suggestion Error:", err);
      alert("❌ AI suggestion failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#ffffff]/80 dark:bg-[#111827]/80 backdrop-blur p-6 rounded-2xl shadow-lg border border-[#e5e7eb] dark:border-[#1f2937] hover:shadow-xl transition">
      <h2 className="text-2xl font-semibold mb-6 text-[#111827] dark:text-[#f3f4f6]">
        ✍️ Build Your Resume
      </h2>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Ananya Mitra"
            className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
              focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
                focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+91 9XXXXXXXXX"
              className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
                focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
            Education
          </label>
          <textarea
            name="education"
            rows={3}
            value={formData.education}
            onChange={onChange}
            placeholder={`B.Tech in CSE, ABC University (2021–2025)\nCGPA: 8.5/10`}
            className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
              focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() => improveField("education")}
            className="mt-2 px-3 py-1 text-sm bg-[#3b82f6] text-white rounded-lg shadow hover:bg-[#2563eb]"
          >
            ✨ Improve with AI
          </button>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
            Experience
          </label>
          <textarea
            name="experience"
            rows={4}
            value={formData.experience}
            onChange={onChange}
            placeholder={`Frontend Intern — XYZ (Jun 2025 – Aug 2025)\n- Built React components with Tailwind\n- Improved performance by 20%`}
            className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
              focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() => improveField("experience")}
            className="mt-2 px-3 py-1 text-sm bg-[#3b82f6] text-white rounded-lg shadow hover:bg-[#2563eb]"
          >
            ✨ Improve with AI
          </button>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={onChange}
            placeholder="React, Tailwind, Node.js, MongoDB"
            className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
              focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
          />
        </div>

        {/* Projects */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
            Projects
          </label>
          <textarea
            name="projects"
            rows={3}
            value={formData.projects}
            onChange={onChange}
            placeholder={`ResuMate — Resume builder app (2025)\n- Built with React and TailwindCSS\n- Supports PDF export`}
            className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
              focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() => improveField("projects")}
            className="mt-2 px-3 py-1 text-sm bg-[#3b82f6] text-white rounded-lg shadow hover:bg-[#2563eb]"
          >
            ✨ Improve with AI
          </button>
        </div>

        {/* Certificates */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
            Certificates (one per line — any language; optional link)
          </label>
          <textarea
            name="certificates"
            rows={3}
            value={formData.certificates || ""}
            onChange={onChange}
            placeholder={`Google Data Analytics — Coursera — https://coursera.org/...\nAWS Cloud Practitioner — Amazon\nHackerRank Java (Gold) — https://www.hackerrank.com/...`}
            className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
              focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() => improveField("certificates")}
            className="mt-2 px-3 py-1 text-sm bg-[#3b82f6] text-white rounded-lg shadow hover:bg-[#2563eb]"
          >
            ✨ Improve with AI
          </button>
          <p className="text-xs mt-1 text-[#6b7280] dark:text-[#9ca3af]">
            Tip: Use “Title — Issuer — Link(optional)” format, but any text
            works.
          </p>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
              GitHub
            </label>
            <input
              type="text"
              name="github"
              value={formData.github || ""}
              onChange={onChange}
              placeholder="https://github.com/username"
              className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
                focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
              LinkedIn
            </label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={onChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
                focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
              LeetCode
            </label>
            <input
              type="text"
              name="leetcode"
              value={formData.leetcode || ""}
              onChange={onChange}
              placeholder="https://leetcode.com/username"
              className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
                focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#374151] dark:text-[#d1d5db]">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={formData.website || ""}
              onChange={onChange}
              placeholder="https://yourwebsite.com"
              className="w-full p-3 border border-[#d1d5db] dark:border-[#374151] rounded-xl bg-[#ffffff] dark:bg-[#111827] 
                focus:ring-2 focus:ring-[#3b82f6] focus:outline-none shadow-sm placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
