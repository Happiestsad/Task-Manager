import React, { useEffect, useState } from 'react'
import TaskList from './components/TaskList'

const STORAGE_KEY = 'task_manager.tasks_v1'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTasks(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load tasks', e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function createTask(e) {
    e.preventDefault()
    if (!title.trim()) return

    if (editingId) {
      setTasks(prev => prev.map(t => t.id === editingId ? { ...t, title: title.trim() } : t))
      setEditingId(null)
      setTitle('')
      return
    }

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTasks(prev => [newTask, ...prev])
    setTitle('')
  }

  function toggleComplete(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function removeTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function startEditing(task) {
    setEditingId(task.id)
    setTitle(task.title)
  }

  function clearCompleted() {
    setTasks(prev => prev.filter(t => !t.completed))
  }

  const filtered = tasks.filter(t => {
    if (filter === 'all') return true
    if (filter === 'active') return !t.completed
    return t.completed
  })

  return (
    <div className="app">
      <header className="header">
        <h1>Task Manager</h1>
        <p className="sub">CRUD app with persistence (localStorage)</p>
      </header>

      <main className="container">
        <form onSubmit={createTask} className="task-form">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add new task or edit..."
            aria-label="Task title"
          />
          <button type="submit">{editingId ? 'Save' : 'Add'}</button>
          {editingId && (
            <button
              type="button"
              className="cancel"
              onClick={() => { setEditingId(null); setTitle('') }}
            >
              Cancel
            </button>
          )}
        </form>

        <div className="controls">
          <div className="filters">
            <button onClick={() => setFilter('all')} className={filter==='all'? 'active':''}>All</button>
            <button onClick={() => setFilter('active')} className={filter==='active'? 'active':''}>Active</button>
            <button onClick={() => setFilter('completed')} className={filter==='completed'? 'active':''}>Completed</button>
          </div>
          <div className="actions">
            <button onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>

        <TaskList
          tasks={filtered}
          onToggle={toggleComplete}
          onDelete={removeTask}
          onEdit={startEditing}
        />

        <footer className="meta">
          <small>{tasks.length} total • {tasks.filter(t=>t.completed).length} completed</small>
        </footer>
      </main>
    </div>
  )
}
