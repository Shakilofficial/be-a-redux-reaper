/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/quizAppDB";
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// Schema and Model for Quiz
const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

// Utility Function for Error Handling
const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Routes

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Quiz API is running!" });
});

// Create a New Quiz (POST /api/quizzes)
app.post(
  "/api/quizzes",
  asyncHandler(async (req: Request, res: Response) => {
    const { title, description, questions } = req.body;

    if (!title || !description || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and questions are required.",
      });
    }

    const quiz = new Quiz({ title, description, questions });
    await quiz.save();
    res.status(201).json({
      success: true,
      message: "Quiz created successfully.",
      data: quiz,
    });
  })
);

// Get All Quizzes (GET /api/quizzes)
app.get(
  "/api/quizzes",
  asyncHandler(async (req: Request, res: Response) => {
    const quizzes = await Quiz.find();
    res.status(200).json({ success: true, data: quizzes });
  })
);

// Get a Single Quiz by ID (GET /api/quizzes/:id)
app.get(
  "/api/quizzes/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found." });
    }

    res.status(200).json({ success: true, data: quiz });
  })
);

// Update a Quiz (PATCH /api/quizzes/:id)
app.patch(
  "/api/quizzes/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, questions } = req.body;

    if (!title || !description || !questions) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and questions are required.",
      });
    }

    const quiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, questions },
      { new: true }
    );

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found." });
    }

    res.status(200).json({
      success: true,
      message: "Quiz updated successfully.",
      data: quiz,
    });
  })
);

// Delete a Quiz (DELETE /api/quizzes/:id)
app.delete(
  "/api/quizzes/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found." });
    }

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully.",
      data: null,
    });
  })
);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
