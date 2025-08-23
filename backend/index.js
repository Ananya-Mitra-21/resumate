import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 5000; // backend runs on port 5000

// Middleware
app.use(cors()); // allow requests from frontend
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
