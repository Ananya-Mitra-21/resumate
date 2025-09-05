import express from "express";
import Resume from "../models/Resume.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ---------------- Create Resume (private) ----------------
router.post("/", auth, async (req, res) => {
  try {
    const payload = { ...req.body };

    // normalize skills: allow string "a,b" or array
    if (typeof payload.skills === "string") {
      payload.skills = payload.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const newResume = new Resume({
      ...payload,
      user: req.user.id, // link to logged-in user
    });

    await newResume.save();
    res.json(newResume);
  } catch (err) {
    res.status(500).json({ message: "Error saving resume", error: err.message });
  }
});

// ---------------- Get Resumes (only current user) ----------------
router.get("/", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({
      updatedAt: -1,
    });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resumes", error: err.message });
  }
});

// ---------------- Update Resume (private/owner only) ----------------
router.put("/:id", auth, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (typeof payload.skills === "string") {
      payload.skills = payload.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      payload,
      { new: true }
    );

    if (!updatedResume) {
      return res
        .status(404)
        .json({ message: "Resume not found or not authorized" });
    }
    res.json(updatedResume);
  } catch (err) {
    res.status(500).json({ message: "Error updating resume", error: err.message });
  }
});

// ---------------- Delete Resume (private/owner only) ----------------
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedResume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedResume) {
      return res
        .status(404)
        .json({ message: "Resume not found or not authorized" });
    }
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting resume", error: err.message });
  }
});

// ---------------- Publish Resume (set public, owner only) ----------------
router.put("/:id/publish", auth, async (req, res) => {
  try {
    const updated = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isPublic: true },
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Resume not found or not authorized" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error publishing resume", error: err.message });
  }
});

// ---------------- Public Portfolio Route (no auth) ----------------
router.get("/public/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).lean();
    if (!resume || !resume.isPublic) {
      return res.status(404).json({ message: "This portfolio is not public." });
    }
    // Optional: avoid leaking owner id
    const { user, ...safe } = resume;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: "Error fetching public resume", error: err.message });
  }
});

export default router;

