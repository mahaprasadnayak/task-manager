import React from 'react'

export default function Projects({ projects, tasks, onAddTask }) {
  const getProjectStats = (projectName) => {
    const projectTasks = tasks.filter(t => t.project === projectName)
    return {
      total: projectTasks.length,
      completed: projectTasks.filter(t => t.status === 'completed').length,
      inProgress: projectTasks.filter(t => t.status === 'in-progress').length,
      blocked: projectTasks.filter(t => t.status === 'blocked').length
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🏗️ Projects</h2>
        <p>Organize tasks by project</p>
      </div>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map(project => {
            const stats = getProjectStats(project.name)
            const completionRate = stats.total > 0 
              ? Math.round((stats.completed / stats.total) * 100) 
              : 0

            return (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <span className="project-status">{project.status}</span>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-timeline">
                  <div className="timeline-item">
                    <span className="timeline-label">Started:</span>
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-label">Due:</span>
                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="project-stats">
                  <div className="stat-item">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-name">Total</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value" style={{ color: '#FFA502' }}>{stats.inProgress}</span>
                    <span className="stat-name">In Progress</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value" style={{ color: '#2ED573' }}>{stats.completed}</span>
                    <span className="stat-name">Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value" style={{ color: '#FF5252' }}>{stats.blocked}</span>
                    <span className="stat-name">Blocked</span>
                  </div>
                </div>

                <div className="project-progress">
                  <div className="progress-label">
                    <span>Progress</span>
                    <span className="progress-percentage">{completionRate}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
                  </div>
                </div>

                <div className="project-team">
                  <span className="team-label">Team:</span>
                  <span className="team-members">
                    {project.teamMembers?.join(', ') || 'No members assigned'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">
          <p>No projects yet. Create your first project! 🚀</p>
        </div>
      )}
    </div>
  )
}
