import React, { useEffect, useState } from 'react';
import API from '../api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();

    const load = async () => {
        try {
            const res = await API.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    useEffect(() => { load(); }, []);

    const handleSave = async (task) => {
        try {
            if (editing) {
                await API.put(`/tasks/${editing._id}`, { ...editing, ...task });
                setEditing(null);
            } else {
                await API.post('/tasks', task);
            }
            load();
        } catch (err) { alert('Save failed'); }
    };

    const toggle = async (t) => {
        try {
            await API.put(`/tasks/${t._id}`, { ...t, completed: !t.completed });
            load();
        } catch (err) { alert('Update failed'); }
    };

    const remove = async (id) => {
        if (!confirm('Delete this task?')) return;
        try {
            await API.delete(`/tasks/${id}`);
            load();
        } catch (err) { alert('Delete failed'); }
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Dashboard</h2>
                <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>Logout</button>
            </div>

            <TaskForm onSave={handleSave} editing={editing} />
            <hr />
            <h3>Your Tasks</h3>
            <TaskList tasks={tasks} onToggle={toggle} onEdit={(t) => setEditing(t)} onDelete={remove} />
        </div>
    );
}
