import { useMemo, useState } from "react"; 
import { GraduationCap, Briefcase, Wrench, Award, Link2, User } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const HEX = {
  blue600: "#2563eb",
  indigo600: "#4f46e5",
  green600: "#16a34a",
  purple600: "#9333ea",
  pink600: "#db2777",
  gray900: "#111827",
  gray800: "#1f2937",
  gray700: "#374151",
  gray600: "#4b5563",
  gray500: "#6b7280",
  gray300: "#d1d5db",
  white: "#ffffff",
};

// -------- Helpers --------
const parseLines = (txt) =>
  (txt || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

const parseSkills = (txt) =>
  (txt || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const parseCertificates = (txt) =>
  parseLines(txt).map((line) => {
    const parts = line.split(/—|-|\|/).map((p) => p.trim()).filter(Boolean);
    const [title, issuer, maybeLink] = parts;
    return {
      title: title || line,
      issuer: issuer || "",
      link: maybeLink && /^https?:\/\//i.test(maybeLink) ? maybeLink : "",
      raw: line,
    };
  });

const SectionHeader = ({ icon: Icon, color, children }) => (
  <h3
    className="text-lg font-semibold flex items-center gap-2 border-b pb-2"
    style={{ color: HEX.gray900, borderColor: "#e5e7eb" }}
  >
    <Icon className="w-5 h-5" style={{ color }} />
    {children}
  </h3>
);

// --------- Templates ----------
function TemplateClassic({ formData }) {
  const skills = useMemo(() => parseSkills(formData.skills), [formData.skills]);
  const certs = useMemo(() => parseCertificates(formData.certificates), [formData.certificates]);
  const education = useMemo(() => parseLines(formData.education), [formData.education]);
  const experience = useMemo(() => parseLines(formData.experience), [formData.experience]);
  const projects = useMemo(() => parseLines(formData.projects), [formData.projects]);

  return (
    <div
      className="mx-auto max-w-[800px] rounded-2xl border shadow-sm"
      style={{ background: HEX.white, borderColor: "#e5e7eb" }}
    >
      {/* Header */}
      <div className="rounded-t-2xl p-6" style={{ background: HEX.blue600, color: HEX.white }}>
        <div className="flex items-center gap-3">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <User className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold leading-tight">{formData.name || "Your Name"}</h1>
            <p style={{ opacity: 0.9, wordBreak: "break-word", overflowWrap: "anywhere" }}>
              {(formData.email || "your.email@example.com") + " • " + (formData.phone || "123-456-7890")}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6" style={{ color: HEX.gray800 }}>
        {/* Education */}
        {education.length > 0 && (
          <section>
            <SectionHeader icon={GraduationCap} color={HEX.indigo600}>Education</SectionHeader>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              {education.map((line, i) => (
                <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <SectionHeader icon={Briefcase} color={HEX.green600}>Experience</SectionHeader>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              {experience.map((line, i) => (
                <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <SectionHeader icon={Wrench} color={HEX.purple600}>Skills</SectionHeader>
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm font-medium border"
                  style={{
                    background: "#f3f4f6",
                    color: HEX.gray700,
                    borderColor: "#e5e7eb",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <SectionHeader icon={Wrench} color={HEX.pink600}>Projects</SectionHeader>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              {projects.map((line, i) => (
                <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Certificates */}
        {certs.length > 0 && (
          <section>
            <SectionHeader icon={Award} color={HEX.indigo600}>Certificates</SectionHeader>
            <ul className="mt-3 space-y-2">
              {certs.map((c, i) => (
                <li key={i} className="flex flex-col gap-1" style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
                  <div className="font-medium" style={{ color: HEX.gray900 }}>
                    {c.title}{c.issuer ? <span className="font-normal"> — {c.issuer}</span> : null}
                  </div>
                  {c.link && (
                    <span
                      className="inline-flex items-center gap-1 text-sm"
                      style={{ color: HEX.blue600, wordBreak: "break-word", overflowWrap: "anywhere" }}
                    >
                      <Link2 className="w-4 h-4" /> {c.link}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Social Links */}
        {(formData.github || formData.linkedin || formData.leetcode || formData.website) && (
          <section>
            <SectionHeader icon={Wrench} color={HEX.blue600}>Social Links</SectionHeader>
            <div className="flex flex-wrap gap-4 mt-3 text-sm" style={{ wordBreak: "break-word" }}>
              {formData.github && <span style={{ color: HEX.blue600 }}>{formData.github}</span>}
              {formData.linkedin && <span style={{ color: HEX.blue600 }}>{formData.linkedin}</span>}
              {formData.leetcode && <span style={{ color: HEX.blue600 }}>{formData.leetcode}</span>}
              {formData.website && <span style={{ color: HEX.blue600 }}>{formData.website}</span>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function TemplateElegant({ formData }) {
  const skills = parseSkills(formData.skills);
  const certs = parseCertificates(formData.certificates);
  const leftBg = "#0f172a"; 
  const leftText = "#e5e7eb";

  return (
    <div className="mx-auto max-w-[800px] rounded-2xl border shadow-sm overflow-hidden"
         style={{ background: HEX.white, borderColor: "#e5e7eb" }}>
      <div className="grid grid-cols-3">
        {/* Left sidebar */}
        <div className="p-6 col-span-1" style={{ background: leftBg, color: leftText }}>
          <div className="mb-6">
            <div className="text-2xl font-extrabold leading-tight" style={{ color: HEX.white }}>
              {formData.name || "Your Name"}
            </div>
            <div className="text-sm opacity-90" style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
              {formData.email || "your.email@example.com"}<br />{formData.phone || "123-456-7890"}
            </div>
          </div>

          {skills.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2" style={{ color: HEX.white }}>Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="px-2 py-1 rounded text-xs border" style={{ borderColor: "rgba(229,231,235,0.3)" }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {(formData.github || formData.linkedin || formData.leetcode || formData.website) && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2" style={{ color: HEX.white }}>Social</h4>
              <div className="flex flex-col gap-2 text-sm">
                {formData.github && (
                  <span style={{ color: leftText, wordBreak: "break-all", overflowWrap: "anywhere", display: "block" }}>
                    {formData.github}
                  </span>
                )}
                {formData.linkedin && (
                  <span style={{ color: leftText, wordBreak: "break-all", overflowWrap: "anywhere", display: "block" }}>
                    {formData.linkedin}
                  </span>
                )}
                {formData.leetcode && (
                  <span style={{ color: leftText, wordBreak: "break-all", overflowWrap: "anywhere", display: "block" }}>
                    {formData.leetcode}
                  </span>
                )}
                {formData.website && (
                  <span style={{ color: leftText, wordBreak: "break-all", overflowWrap: "anywhere", display: "block" }}>
                    {formData.website}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certs.length > 0 && (
            <div className="mb-2">
              <h4 className="font-semibold mb-2" style={{ color: HEX.white }}>Certificates</h4>
              <ul className="space-y-2 text-sm">
                {certs.map((c, i) => (
                  <li key={i}>
                    <div className="font-medium" style={{ color: HEX.white }}>{c.title}</div>
                    {c.issuer && <div style={{ opacity: 0.8 }}>{c.issuer}</div>}
                    {c.link && (
                      <span
                        style={{ color: HEX.indigo600, wordBreak: "break-all", overflowWrap: "anywhere", display: "block" }}
                      >
                        {c.link}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right body */}
        <div className="p-6 col-span-2" style={{ color: HEX.gray900 }}>
          {parseLines(formData.education).length > 0 && (
            <section className="mb-6">
              <h4 className="font-semibold mb-2">Education</h4>
              <ul className="list-disc pl-5 space-y-1">
                {parseLines(formData.education).map((l, i) => (
                  <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{l}</li>
                ))}
              </ul>
            </section>
          )}

          {parseLines(formData.experience).length > 0 && (
            <section className="mb-6">
              <h4 className="font-semibold mb-2">Experience</h4>
              <ul className="list-disc pl-5 space-y-1">
                {parseLines(formData.experience).map((l, i) => (
                  <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{l}</li>
                ))}
              </ul>
            </section>
          )}

          {parseLines(formData.projects).length > 0 && (
            <section className="mb-6">
              <h4 className="font-semibold mb-2">Projects</h4>
              <ul className="list-disc pl-5 space-y-1">
                {parseLines(formData.projects).map((l, i) => (
                  <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{l}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function TemplateModern({ formData }) {
  const skills = parseSkills(formData.skills);
  const certs = parseCertificates(formData.certificates);
  const headerBg = "#111827";
  const accent = HEX.blue600;

  return (
    <div className="mx-auto max-w-[800px] rounded-2xl border shadow-sm overflow-hidden"
         style={{ background: HEX.white, borderColor: "#e5e7eb" }}>
      {/* Header */}
      <div className="p-6" style={{ background: headerBg, color: HEX.white }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold">{formData.name || "Your Name"}</div>
            <div className="text-sm opacity-90" style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
              {(formData.email || "your.email@example.com") + " • " + (formData.phone || "123-456-7890")}
            </div>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-end max-w-[50%]">
              {skills.slice(0, 6).map((s, i) => (
                <span key={i} className="px-2 py-1 rounded text-xs"
                      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Two-column content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ color: HEX.gray800 }}>
        {/* Left */}
        <div className="space-y-6">
          {parseLines(formData.education).length > 0 && (
            <section>
              <SectionHeader icon={GraduationCap} color={accent}>Education</SectionHeader>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                {parseLines(formData.education).map((l, i) => (
                  <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{l}</li>
                ))}
              </ul>
            </section>
          )}

          {parseLines(formData.projects).length > 0 && (
            <section>
              <SectionHeader icon={Wrench} color={HEX.purple600}>Projects</SectionHeader>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                {parseLines(formData.projects).map((l, i) => (
                  <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{l}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right */}
        <div className="space-y-6">
          {parseLines(formData.experience).length > 0 && (
            <section>
              <SectionHeader icon={Briefcase} color={HEX.green600}>Experience</SectionHeader>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                {parseLines(formData.experience).map((l, i) => (
                  <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{l}</li>
                ))}
              </ul>
            </section>
          )}

          {certs.length > 0 && (
            <section>
              <SectionHeader icon={Award} color={HEX.indigo600}>Certificates</SectionHeader>
              <ul className="mt-3 space-y-2">
                {certs.map((c, i) => (
                  <li key={i} style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>
                    <div className="font-medium" style={{ color: HEX.gray900 }}>
                      {c.title} {c.issuer ? <span className="font-normal">— {c.issuer}</span> : null}
                    </div>
                    {c.link && (
                      <span
                        className="text-sm"
                        style={{ color: accent, wordBreak: "break-all", overflowWrap: "anywhere", display: "block" }}
                      >
                        {c.link}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(formData.github || formData.linkedin || formData.leetcode || formData.website) && (
            <section>
              <SectionHeader icon={Wrench} color={accent}>Social</SectionHeader>
              <div className="flex flex-wrap gap-4 mt-3 text-sm" style={{ wordBreak: "break-word" }}>
                {formData.github && <span style={{ color: accent }}>{formData.github}</span>}
                {formData.linkedin && <span style={{ color: accent }}>{formData.linkedin}</span>}
                {formData.leetcode && <span style={{ color: accent }}>{formData.leetcode}</span>}
                {formData.website && <span style={{ color: accent }}>{formData.website}</span>}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------- Main Preview --------------
export default function ResumePreview({ formData }) {
  const [template, setTemplate] = useState("classic");

  const hasHeader = formData.name || formData.email || formData.phone;

  const downloadPDF = () => {
    const input = document.getElementById("resume-preview");
    if (!input) return;

    const containerRect = input.getBoundingClientRect();
    const linkRects = Array.from(input.querySelectorAll("a[href]")).map((a) => {
      const r = a.getBoundingClientRect();
      const href = a.getAttribute("href") || "";
      return {
        href,
        x: r.left - containerRect.left,
        y: r.top - containerRect.top,
        w: r.width,
        h: r.height,
      };
    }).filter(l => l.href && l.w > 0 && l.h > 0);

    const originalBg = input.style.backgroundColor;
    input.style.backgroundColor = HEX.white;

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      backgroundColor: HEX.white,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();

        const ratio = canvas.height / canvas.width;
        let renderW = pageW;
        let renderH = renderW * ratio;
        if (renderH > pageH) {
          renderH = pageH;
          renderW = renderH / ratio;
        }
        const offsetX = (pageW - renderW) / 2;
        const offsetY = (pageH - renderH) / 2;

        pdf.addImage(imgData, "PNG", offsetX, offsetY, renderW, renderH);

        pdf.save("resume.pdf");
      })
      .finally(() => {
        input.style.backgroundColor = originalBg || "";
      });
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">📄 Preview</h2>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">Template:</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="text-sm px-2 py-1 border rounded-md"
          >
            <option value="classic">Classic</option>
            <option value="elegant">Elegant</option>
            <option value="modern">Modern</option>
          </select>

          {hasHeader && (
            <button
              onClick={downloadPDF}
              className="ml-2 px-4 py-2 rounded-xl text-white font-medium"
              style={{ background: HEX.blue600 }}
            >
              Download PDF
            </button>
          )}
        </div>
      </div>

      {hasHeader ? (
        <div id="resume-preview">
          {template === "classic" && <TemplateClassic formData={formData} />}
          {template === "elegant" && <TemplateElegant formData={formData} />}
          {template === "modern" && <TemplateModern formData={formData} />}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 italic">
          Start typing on the left — your resume will render here in real time.
        </div>
      )}
    </div>
  );
}


