import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/User.js";
import Contact from "./models/Contact.js";
import Review from "./models/Review.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB Compass
mongoose.connect("mongodb://127.0.0.1:27017/savoryScoreDB")
    .then(() => console.log("✅ Connected to MongoDB Compass"))
    .catch(err => console.log("❌ Error:", err));

// -------------------- Routes -------------------- //

// Registration
app.post("/register", async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashed, phone });
        await newUser.save();
        res.json({ message: "Registration successful" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid password" });

        res.json({ message: "Login successful" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

// Contact
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.json({ message: "Message sent successfully!" });
    } catch {
        res.status(500).json({ message: "Error submitting message" });
    }
});

// Review
app.post("/review", async (req, res) => {
    try {
        const { name, restaurant, rating, comment } = req.body;
        const newReview = new Review({ name, restaurant, rating, comment });
        await newReview.save();
        res.json({ message: "Review added successfully!" });
    } catch {
        res.status(500).json({ message: "Error adding review" });
    }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
