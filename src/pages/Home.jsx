import React, { useState } from 'react'
import TaskCard from '../components/TaskCard'
import AddTaskModal from '../components/AddTaskModal'

export default function Home({ tasks, projects, onAddTask, onUpdateTask, onDeleteTask }) {
  const [filterStatus, setFilterStatus] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filterStatus)

  const completedCount = tasks.filter(t => t.status === 'completed').length
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  const statuses = [
    { key: 'all', label: 'All Tasks', count: tasks.length },
    { key: 'not-started', label: 'Not Started', count: tasks.filter(t => t.status === 'not-started').length },
    { key: 'in-progress', label: 'In Progress', count: inProgressCount },
    { key: 'completed', label: 'Completed', count: completedCount },
    { key: 'blocked', label: 'Blocked', count: tasks.filter(t => t.status === 'blocked').length }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>📊 Dashboard</h2>
          <p>Track your tasks and projects</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + New Task
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{tasks.length}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{inProgressCount}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completionPercentage}%</div>
          <div className="stat-label">Completion Rate</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Filter by Status:</h3>
        <div className="filter-buttons">
          {statuses.map(status => (
            <button
              key={status.key}
              className={`filter-btn ${filterStatus === status.key ? 'active' : ''}`}
              onClick={() => setFilterStatus(status.key)}
            >
              {status.label} ({status.count})
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No tasks in this category. Great job! 🎉</p>
        </div>
      )}

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={onAddTask}
        projects={projects}
      />
    </div>
  )
}
