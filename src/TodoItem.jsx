import { useState } from "react";

function TodoItem({ task, onDelete, onToggle, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    if (newText.trim() === "") return;
    onEdit(task.id, newText);
    setEditing(false);
  };

  return (
    <div className={`todo-item ${task.completed ? "done" : ""}`}>

      <span onClick={() => onToggle(task.id)} style={{ cursor: "pointer" }}>
        {task.emoji}
      </span>

      {editing ? (
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>
          {task.text}
        </span>
      )}

      <button onClick={() => onDelete(task.id)} className="delete-btn">
        ❌
      </button>
    </div>
  );
}

export default TodoItem;