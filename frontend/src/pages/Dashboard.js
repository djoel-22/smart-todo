import { useEffect, useState } from "react";
import axios from "../axiosConfig.js";
import TaskItem from "../components/TaskItem.js";

import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (!token) navigate("/"); // redirect if not logged in

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchTasks = async () => {
        try {
            const res = await axios.get("/tasks", config);
            setTasks(res.data);
        } catch (err) {
            alert(err.response.data.message || "Error fetching tasks");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/tasks", { title, description }, config);
            setTasks([...tasks, res.data]);
            setTitle("");
            setDescription("");
        } catch (err) {
            alert(err.response.data.message || "Error adding task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`, config);
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (err) {
            alert(err.response.data.message || "Error deleting task");
        }
    };

    const toggleTask = async (id, completed) => {
        try {
            const res = await axios.put(`/tasks/${id}`, { completed }, config);
            setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
        } catch (err) {
            alert(err.response.data.message || "Error updating task");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={logout} style={{ marginBottom: "10px" }}>Logout</button>

            <form onSubmit={addTask}>
                <input
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>

            <h3>Your Tasks:</h3>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDelete={deleteTask} onToggle={toggleTask} />
            ))}
        </div>
    );
}

export default Dashboard;
