import React from 'react'

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="checkbox">
        <input type="checkbox" checked={task.completed} onChange={onToggle} />
        <span className="checkmark" />
      </label>

      <div className="task-body">
        <div className="title">{task.title}</div>
        <div className="meta">{new Date(task.createdAt).toLocaleString()}</div>
      </div>

      <div className="task-actions">
        <button className="edit" onClick={onEdit} aria-label="Edit">✏️</button>
        <button className="delete" onClick={onDelete} aria-label="Delete">🗑️</button>
      </div>
    </li>
  )
}
