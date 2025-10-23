import React, { useState, useEffect } from 'react';

export default function TaskForm({ onSave, editing }) {
    const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: 'medium' });

    useEffect(() => {
        if (editing) setTask(editing);
        else setTask({ title: '', description: '', dueDate: '', priority: 'medium' });
    }, [editing]);

    const submit = (e) => {
        e.preventDefault();
        onSave(task);
        setTask({ title: '', description: '', dueDate: '', priority: 'medium' });
    };

    return (
        <form className="form" onSubmit={submit}>
            <input placeholder="Title" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required />
            <textarea placeholder="Description" value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} />
            <input type="date" value={task.dueDate ? task.dueDate.split('T')[0] : ''} onChange={e => setTask({ ...task, dueDate: e.target.value })} />
            <select value={task.priority} onChange={e => setTask({ ...task, priority: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit">{editing ? 'Update' : 'Add Task'}</button>
        </form>
    );
}
