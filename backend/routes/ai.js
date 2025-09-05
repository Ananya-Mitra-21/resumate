import express from "express";
import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// ✅ Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.CO_API_KEY, // from your .env
});

// ✅ AI suggestion route
router.post("/suggest", async (req, res) => {
  try {
    const { text, field } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text input" });
    }

    // ✅ Use Chat API (not generate)
    const response = await cohere.chat({
      model: "command-r-plus", // free tier chat model
      message: `Improve the following resume ${field} entry so it looks professional, concise, and impactful:\n\n${text}`,
    });

    const suggestion = response?.text?.trim();

    if (!suggestion) {
      return res.status(500).json({ error: "No suggestion generated" });
    }

    res.json({ suggestion });
  } catch (error) {
    console.error("Cohere API Error:", error);
    res
      .status(500)
      .json({ error: "AI suggestion failed. Please try again later." });
  }
});

export default router;



