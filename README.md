# ResuMate – Smart Resume Builder
***PROJECT REPORT PDF LINK*** - https://github.com/Ananya-Mitra-21/resumate/raw/main/ResuMate_report.pdf
- **Deployed App:** - https://resumate-frontend-psi.vercel.app

## Overview
ResuMate is an AI-powered resume and portfolio builder that helps users create, improve, and share professional resumes with ease. It integrates AI suggestions, PDF export, and public portfolio sharing in a modern web app.

## Features (Day 1–3)
- **Day 1:** Project setup with React + Vite + Tailwind CSS
-  **Day 2:** Resume form built with sections:
  - Personal Info (Name, Email, Phone)
  - Education
  - Experience
  - Skills
  - Social Links (GitHub, LinkedIn, LeetCode)
- **Day 3:** Live resume preview panel
  - Updates instantly as you type
  - Clean, professional Tailwind-styled layout

## Tech Stack
- Frontend: React.js, Tailwind CSS
- State Management: React `useState` (controlled components)
- Deployment-ready structure for future backend/API integratio

- ## Next Steps
- PDF Export functionality
- Multiple resume templates
- AI-powered suggestions for experience & skills
- Save multiple resumes per user with backend                                                                  


## Resume Builder – React + jsPDF + html2canvas(Day 4-5)

A modern resume builder built with **React**. Users can fill out their details, preview their resume in real-time, choose from multiple templates, and export the final version as a **PDF**.

---

## 🚀 Features

- **Multiple Templates**  
  Choose between `Classic`, `Elegant`, and `Modern` resume layouts.

- **Real-time Preview**  
  Resume updates instantly as you type.

- **PDF Exporting**  
  Export resumes to a properly scaled **A4 PDF** using `html2canvas` and `jsPDF`.

- **Link Handling**  
  Any links you enter (GitHub, LinkedIn, portfolio, etc.) are displayed in the PDF so they can be copied and used directly.

- **Custom Sections**  
  Includes support for:
  - Personal details (name, email, phone)
  - Education
  - Experience
  - Skills
  - Projects
  - Certificates
  - Social links (GitHub, LinkedIn, LeetCode, Website)

- **Responsive UI**  
  Built with **TailwindCSS** for clean, responsive, and modern styling.

---

## 🛠️ Tech Stack

- **React** – Frontend framework  
- **TailwindCSS** – Styling  
- **lucide-react** – Icons  
- **html2canvas** – Convert DOM to canvas for export  
- **jsPDF** – PDF generation  

✅ Week 1 (Day 6) — Authentication System

**Added a Node.js + Express backend (backend/ folder).

**Implemented JWT authentication:
POST /auth/register → Register new users (with bcrypt password hashing).
POST /auth/login → Login with username & password, returns JWT token.
GET /auth/me → Protected route to verify logged-in user.

**Frontend Auth Flow (React):
Login & Signup pages connected to backend.
Token stored in localStorage after login.
Navbar shows Login/Signup when logged out, Logout when logged in.
Resume builder access is protected → redirects to login if not authenticated.

🛠️ Tech Stack
Frontend: React.js (Vite), Tailwind CSS
Backend: Node.js, Express.js
Auth: JWT (jsonwebtoken), bcrypt for password hashing
PDF Export: react-to-print / jspdf
Version Control: Git & GitHub

## ✅ Week 2 Work Completed  

### 🔹 Day 8-9 – AI Integration (Setup)  
- Integrated **AI APIs (Cohere & OpenAI free tier)** into the backend.  
- Created a route `/ai/suggest` → takes user input → returns AI-enhanced text.  

### 🔹 Day 10-12 – AI Suggestions (Experience Section)  
- Added **“Improve with AI”** button near the **Experience** field.  
- User enters raw text → AI rewrites it into **professional, impactful job descriptions**.  

### 🔹 Day 13-14 – AI Suggestions (Skills & Summary)  
- Extended AI support for **Skills** and **Summary** fields.  
- AI now suggests **better phrasing** and highlights **missing but relevant skills**.  

### 🔹 Day 15 - Day 17 – Extra Features (Unique Touch)  
- Implemented **Portfolio Mode** → transforms a resume into a **public portfolio site**.  
- Added **Shareable Link** feature → users can share their portfolio using a unique URL.  

---

## 🛠️ Tools & Technologies Used  
- **Frontend:** React.js, Vite, TailwindCSS  
- **Backend:** Node.js, Express.js, MongoDB Atlas  
- **Authentication:** JWT, bcryptjs  
- **AI Integration:** Cohere API (resume improvement)  
- **Other Tools:** Postman, Git/GitHub, Vercel (frontend), Render (backend)  

---

## 🔗 Links (Day-18) 
- **Deployed App:** - https://resumate-frontend-psi.vercel.app

---

## 📌 Conclusion (Day19-20) 
Week 2 concentrated on **AI-powered features, UI improvements, and portfolio functionality**.  
With **AI suggestions, professional templates, and public portfolio sharing**, ResuMate now feels like a **practical, job-ready product** that users can confidently use to create and showcase resumes.  
