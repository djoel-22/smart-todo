import express from "express";
import Task from "../models/Task.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Get all tasks for logged-in user
router.get("/", verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Create new task
router.post("/", verifyToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({
            user: req.user.id,
            title,
            description,
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update task
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: "Task not found" });

        const { title, description, completed } = req.body;
        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.completed = completed ?? task.completed;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete task
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
