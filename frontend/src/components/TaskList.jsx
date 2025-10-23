import React from 'react';

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
    if (!tasks.length) return <p className="small">No tasks yet</p>;
    return (
        <div>
            {tasks.map(t => (
                <div className="task" key={t._id}>
                    <div>
                        <strong style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</strong>
                        <div className="small">{t.description}</div>
                        <div className="small">Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'} • Priority: {t.priority}</div>
                    </div>
                    <div className="flex">
                        <button onClick={() => onToggle(t)}>{t.completed ? 'Undo' : 'Done'}</button>
                        <button onClick={() => onEdit(t)}>Edit</button>
                        <button onClick={() => onDelete(t._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
