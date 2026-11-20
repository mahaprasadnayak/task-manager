import React, { useState } from 'react'

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const getStatusColor = (status) => {
    const colors = {
      'not-started': '#FF4757',
      'in-progress': '#FFA502',
      'completed': '#2ED573',
      'blocked': '#FF5252'
    }
    return colors[status] || '#95A5A6'
  }

  const getPriorityLabel = (priority) => {
    const labels = {
      'high': '🔴',
      'medium': '🟡',
      'low': '🟢'
    }
    return labels[priority] || '⚪'
  }

  const getDaysUntilDeadline = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
    return diff
  }

  const isOverdue = getDaysUntilDeadline(task.dueDate) < 0
  const isUrgent = getDaysUntilDeadline(task.dueDate) <= 3 && getDaysUntilDeadline(task.dueDate) >= 0

  return (
    <div className={`task-card ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-header">
        <div className="card-status-badge">
          <span className="status-indicator" style={{ backgroundColor: getStatusColor(task.status) }}></span>
          <span className="status-text">{task.status.replace('-', ' ').toUpperCase()}</span>
        </div>
        <div className="card-priority">
          {getPriorityLabel(task.priority)}
        </div>
      </div>

      <div className="card-front">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-project">{task.project}</p>
        
        <div className="task-meta">
          <div className="meta-item">
            <span className="meta-label">Due:</span>
            <span className={isOverdue ? 'meta-value overdue' : isUrgent ? 'meta-value urgent' : 'meta-value'}>
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
          {!isOverdue && (
            <div className="meta-item">
              <span className="meta-label">Days Left:</span>
              <span className={isUrgent ? 'meta-value urgent' : 'meta-value'}>
                {getDaysUntilDeadline(task.dueDate)}
              </span>
            </div>
          )}
        </div>

        <p className="task-description">{task.description}</p>

        <div className="card-hint">
          Click to reveal details
        </div>
      </div>

      <div className="card-back">
        <div className="back-content">
          <h4>Details</h4>
          <div className="detail-item">
            <strong>Assigned To:</strong> {task.assignedTo || 'Unassigned'}
          </div>
          <div className="detail-item">
            <strong>Tags:</strong> {task.tags?.join(', ') || 'No tags'}
          </div>
          <div className="detail-item">
            <strong>Created:</strong> {new Date(task.createdDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button 
          className="action-btn flip-btn"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {isFlipped ? '← Back' : 'Details →'}
        </button>
        
        {task.status !== 'completed' && (
          <button 
            className="action-btn complete-btn"
            onClick={() => onUpdate(task.id, { status: 'completed' })}
          >
            ✓ Complete
          </button>
        )}
        
        <button 
          className="action-btn delete-btn"
          onClick={() => onDelete(task.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}
