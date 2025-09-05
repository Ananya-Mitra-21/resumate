import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Core fields (keep your existing ones)
    name: String,
    email: String,
    phone: String,
    education: String,
    experience: String,
    projects: String,
    certificates: String,
    github: String,
    linkedin: String,
    leetcode: String,
    website: String,
    summary: String,

    // Store skills as array for consistency
    skills: { type: [String], default: [] },

    // Public portfolio toggle
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError on nodemon restarts
const Resume =
  mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

export default Resume;



