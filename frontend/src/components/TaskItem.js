function TaskItem({ task, onDelete, onToggle }) {
    return (
        <div style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}>
            <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => onToggle(task._id, !task.completed)}>
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => onDelete(task._id)} style={{ marginLeft: "10px", color: "red" }}>
                Delete
            </button>
        </div>
    );
}

export default TaskItem;
