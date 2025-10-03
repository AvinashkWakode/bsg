import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ✅ Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true },
  mobile: { type: String, required: true },
  place: { type: String, required: true },
  instructor: { type: String, required: true },
  date: { type: String, required: true },
  ratings: [{ type: String, required: true }],
  comments: { type: String, required: true }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

// ✅ API Routes

// Save Feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "✅ Feedback saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to save feedback" });
  }
});

// Get All Feedbacks
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to fetch feedbacks" });
  }
});

// Root Check
app.get("/", (req, res) => {
  res.send("🎯 BSG Feedback Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
