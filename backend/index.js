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
  ratings: [{ type: String, required: true }], // array of answers for 10 questions
  comments: { type: String, required: true }
}, { timestamps: true });

// ✅ Unique index on name + date to prevent duplicate submission
feedbackSchema.index({ name: 1, date: 1 }, { unique: true });

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
    if (err.code === 11000) {
      return res.status(400).json({ error: "Feedback for this name and date already exists!" });
    }
    res.status(500).json({ error: "❌ Failed to save feedback" });
  }
});

// Check if feedback already exists by name + date
app.get("/api/feedback/check", async (req, res) => {
  try {
    const { name, date } = req.query;
    if (!name || !date) {
      return res.status(400).json({ error: "Name and date are required" });
    }

    const existing = await Feedback.findOne({ name, date });
    res.json({ exists: !!existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to check feedback" });
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

// Report API for Charts
app.get("/api/report", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    const report = {
      overall: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      questions: []
    };

    const questionCount = 10;
    for (let i = 0; i < questionCount; i++) {
      report.questions.push({
        qIndex: i + 1,
        counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
    }

    feedbacks.forEach(fb => {
      fb.ratings.forEach((r, i) => {
        if (report.overall[r] !== undefined) report.overall[r]++;
        if (report.questions[i]) report.questions[i].counts[r]++;
      });
    });

    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Failed to generate report" });
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
