import React, { useState } from 'react'

export default function AddTaskModal({ isOpen, onClose, onAdd, projects }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: projects[0]?.name || '',
    status: 'not-started',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
    tags: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      createdDate: new Date().toISOString()
    })
    setFormData({
      title: '',
      description: '',
      project: projects[0]?.name || '',
      status: 'not-started',
      priority: 'medium',
      dueDate: '',
      assignedTo: '',
      tags: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Task Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Enter task description"
              rows="3"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Project</label>
              <select
                value={formData.project}
                onChange={e => setFormData({...formData, project: e.target.value})}
              >
                {projects.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Due Date *</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={e => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Assigned To</label>
              <input
                type="text"
                value={formData.assignedTo}
                onChange={e => setFormData({...formData, assignedTo: e.target.value})}
                placeholder="Your name"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
              placeholder="e.g. urgent, important, frontend"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
