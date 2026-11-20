import React from 'react'
import TaskCard from '../components/TaskCard'

export default function Deadlines({ tasks, onUpdateTask, onDeleteTask }) {
  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  const getDaysUntilDeadline = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
    return diff
  }

  const overdue = sortedTasks.filter(t => getDaysUntilDeadline(t.dueDate) < 0)
  const upcoming = sortedTasks.filter(t => {
    const days = getDaysUntilDeadline(t.dueDate)
    return days >= 0 && days <= 7
  })
  const later = sortedTasks.filter(t => getDaysUntilDeadline(t.dueDate) > 7)

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>📅 Deadline Tracker</h2>
        <p>All tasks sorted by urgency</p>
      </div>

      {overdue.length > 0 && (
        <div className="deadline-section">
          <h3 className="section-title overdue-title">
            🚨 Overdue ({overdue.length})
          </h3>
          <div className="tasks-grid">
            {overdue.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="deadline-section">
          <h3 className="section-title urgent-title">
            ⏰ This Week ({upcoming.length})
          </h3>
          <div className="tasks-grid">
            {upcoming.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {later.length > 0 && (
        <div className="deadline-section">
          <h3 className="section-title later-title">
            📌 Later ({later.length})
          </h3>
          <div className="tasks-grid">
            {later.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet. Add one to get started! 🚀</p>
        </div>
      )}
    </div>
  )
}
