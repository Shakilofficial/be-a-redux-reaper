"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ["http://localhost:5173"] }));
// MongoDB Connection
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/quizAppDB";
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
});
// Schema and Model for Quiz
const quizSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true },
        },
    ],
}, { timestamps: true });
const Quiz = mongoose_1.default.model("Quiz", quizSchema);
// Utility Function for Error Handling
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Routes
// Root Route
app.get("/", (req, res) => {
    res.json({ success: true, message: "Quiz API is running!" });
});
// Create a New Quiz (POST /api/quizzes)
app.post("/api/quizzes", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, questions } = req.body;
    if (!title || !description || !questions || questions.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Title, description, and questions are required.",
        });
    }
    const quiz = new Quiz({ title, description, questions });
    yield quiz.save();
    res.status(201).json({
        success: true,
        message: "Quiz created successfully.",
        data: quiz,
    });
})));
// Get All Quizzes (GET /api/quizzes)
app.get("/api/quizzes", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizzes = yield Quiz.find();
    res.status(200).json({ success: true, data: quizzes });
})));
// Get a Single Quiz by ID (GET /api/quizzes/:id)
app.get("/api/quizzes/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const quiz = yield Quiz.findById(id);
    if (!quiz) {
        return res
            .status(404)
            .json({ success: false, message: "Quiz not found." });
    }
    res.status(200).json({ success: true, data: quiz });
})));
// Update a Quiz (PATCH /api/quizzes/:id)
app.patch("/api/quizzes/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, questions } = req.body;
    if (!title || !description || !questions) {
        return res.status(400).json({
            success: false,
            message: "Title, description, and questions are required.",
        });
    }
    const quiz = yield Quiz.findByIdAndUpdate(id, { title, description, questions }, { new: true });
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
})));
// Delete a Quiz (DELETE /api/quizzes/:id)
app.delete("/api/quizzes/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const quiz = yield Quiz.findByIdAndDelete(id);
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
})));
// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});
// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
