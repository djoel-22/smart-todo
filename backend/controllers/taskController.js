const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        const task = new Task({
            user: req.user.id,
            title,
            description,
            dueDate,
            priority
        });
        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, completed } = req.body;
        const taskFields = { title, description, dueDate, priority, completed };
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: taskFields },
            { new: true }
        );
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndRemove({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
