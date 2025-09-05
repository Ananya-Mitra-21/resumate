import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PortfolioView() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/resume/public/${id}`);
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Not found");
        }
        const data = await res.json();
        setResume(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [id]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Portfolio</h1>
        <p className="text-red-600">❌ {error}</p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  const {
    name,
    email,
    phone,
    github,
    linkedin,
    leetcode,
    website,
    summary,
    experience,
    education,
    projects,
    certificates,
    skills,
  } = resume;

  const skillList = Array.isArray(skills) ? skills : (skills || "").split(",").map(s => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b">
        <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">{name || "Portfolio"}</h1>
            <p className="text-gray-600">{summary}</p>
          </div>
          <div className="text-sm text-gray-700 space-y-1">
            {email && <div>📧 {email}</div>}
            {phone && <div>📞 {phone}</div>}
            <div className="flex flex-wrap gap-3 mt-2">
              {github && (
                <a className="underline" href={github} target="_blank" rel="noreferrer">GitHub</a>
              )}
              {linkedin && (
                <a className="underline" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              )}
              {leetcode && (
                <a className="underline" href={leetcode} target="_blank" rel="noreferrer">LeetCode</a>
              )}
              {website && (
                <a className="underline" href={website} target="_blank" rel="noreferrer">Website</a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-10">
        {skillList.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skillList.map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-gray-100 border text-sm">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {experience && (
          <section>
            <h2 className="text-xl font-bold mb-2">Experience</h2>
            <div className="prose max-w-none whitespace-pre-wrap">{experience}</div>
          </section>
        )}

        {projects && (
          <section>
            <h2 className="text-xl font-bold mb-2">Projects</h2>
            <div className="prose max-w-none whitespace-pre-wrap">{projects}</div>
          </section>
        )}

        {education && (
          <section>
            <h2 className="text-xl font-bold mb-2">Education</h2>
            <div className="prose max-w-none whitespace-pre-wrap">{education}</div>
          </section>
        )}

        {certificates && (
          <section>
            <h2 className="text-xl font-bold mb-2">Certificates</h2>
            <div className="prose max-w-none whitespace-pre-wrap">{certificates}</div>
          </section>
        )}
      </main>

      <footer className="border-t">
        <div className="max-w-5xl mx-auto p-6 text-sm text-gray-500">
          © {new Date().getFullYear()} {name || "Portfolio"}
        </div>
      </footer>
    </div>
  );
}
