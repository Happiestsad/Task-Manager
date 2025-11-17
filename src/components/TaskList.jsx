import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) return (
    <div className="empty">No tasks — add one above!</div>
  )

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </ul>
  )
}
