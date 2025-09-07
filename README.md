# ResuMate – Smart Resume Builder

## Overview
ResuMate is an interactive resume builder that allows users to input personal, education, experience, skills, and social links, with a live preview of the resume in real time.

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

✅ Week 2 -Full setup

📄 ResuMate – AI-Powered Resume & Portfolio Builder

ResuMate is a full-stack MERN application that helps users build professional resumes, generate AI-enhanced content, and create shareable online portfolios.

Users can:
✅ Build and manage multiple resumes
✅ Export resumes as professional PDF templates
✅ Use AI suggestions (via Cohere API) to improve content
✅ Add certificates, skills, projects, and social links
✅ Securely register/login with JWT authentication
✅ Publish resumes as public portfolios

🚀 Live Demo

Frontend (Vercel): https://resumate-frontend-psi.vercel.app

📌 Features

🔒 User Authentication – Secure login & signup with JWT + bcrypt

📝 Resume Builder – Structured fields (education, experience, skills, projects, certificates, etc.)

🎨 Multiple Templates – Professionally styled resume layouts with PDF export

🤖 AI Suggestions – Cohere-powered improvements for resume content

🌐 Portfolio Sharing – Generate public portfolio links

🛠 CRUD Operations – Create, update, delete resumes (saved in MongoDB)

🧪 API Testing – Routes tested with Postman

🛠️ Tech Stack
**Frontend
React.js
Tailwind CSS
Vite

**Backend
Node.js
Express.js
MongoDB Atlas
JWT Authentication

**AI Integration
Cohere API (for resume suggestions)

**Tools
Postman (API testing)
Git & GitHub (version control)
Vercel (frontend deployment)
Render (backend deployment during development)
