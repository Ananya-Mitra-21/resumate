import { GraduationCap, Briefcase, Wrench, Mail, Phone, User } from "lucide-react";

export default function ResumePreview({ formData }) {
  const hasHeader = formData.name || formData.email || formData.phone;

  const skills = (formData.skills || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const socialLinks = [
    { name: "GitHub", url: formData.github },
    { name: "LinkedIn", url: formData.linkedin },
    { name: "LeetCode", url: formData.leetcode },
    { name: "Website", url: formData.website },
  ].filter(link => link.url);

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">📄 Preview</h2>

      {hasHeader ? (
        <div className="mx-auto max-w-[800px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          {/* Header */}
          <div className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold leading-tight">
                  {formData.name || "Your Name"}
                </h1>
                <p className="text-sm opacity-90">
                  {formData.email || "your.email@example.com"} • {formData.phone || "123-456-7890"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Education */}
            {formData.education && (
              <section>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Education
                </h3>
                <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {formData.education}
                </p>
              </section>
            )}

            {/* Experience */}
            {formData.experience && (
              <section>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Experience
                </h3>
                <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {formData.experience}
                </p>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, i) => (
                    <span
                      key={`${skill}-${i}`}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-indigo-700/40 dark:to-blue-700/40 dark:text-blue-100 border border-blue-200/60 dark:border-indigo-700/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {formData.projects && (
              <section>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <Wrench className="w-5 h-5 text-pink-600" />
                  Projects
                </h3>
                <p className="mt-3 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {formData.projects}
                </p>
              </section>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 pb-2">
                  <Wrench className="w-5 h-5 text-purple-600" />
                  Social Links
                </h3>
                <div className="flex flex-col mt-3 gap-2">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 italic">
          Start typing on the left — your resume will render here in real time.
        </div>
      )}
    </div>
  );
}

