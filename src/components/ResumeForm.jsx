export default function ResumeForm({ formData, onChange }) {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">✍️ Build Your Resume</h2>

      <div className="space-y-5">
        {/* Personal Info */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Ananya Mitra"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+91 9XXXXXXXXX"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Education</label>
          <textarea
            name="education"
            rows={3}
            value={formData.education}
            onChange={onChange}
            placeholder={`B.Tech in CSE, ABC University (2021–2025)\nCGPA: 8.5/10`}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Experience</label>
          <textarea
            name="experience"
            rows={3}
            value={formData.experience}
            onChange={onChange}
            placeholder={`Frontend Intern — XYZ (Jun 2025 – Aug 2025)\n- Built React components with Tailwind\n- Improved performance by 20%`}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={onChange}
            placeholder="React, Tailwind, Node.js, MongoDB"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Social Links</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">GitHub</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={onChange}
                placeholder="https://github.com/username"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={onChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">LeetCode</label>
              <input
                type="url"
                name="leetcode"
                value={formData.leetcode}
                onChange={onChange}
                placeholder="https://leetcode.com/username"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Personal Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={onChange}
                placeholder="https://yourwebsite.com"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Projects</label>
          <textarea
            name="projects"
            rows={3}
            value={formData.projects}
            onChange={onChange}
            placeholder={`Project Name — Brief Description\n- Tech used: React, Node.js\n- Achievements or link`}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

