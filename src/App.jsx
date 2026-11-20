import { useState, useEffect } from 'react'
import './styles/App.css'
import Dashboard from './pages/Home'
import Deadlines from './pages/Deadlines'
import Projects from './pages/Projects'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchTasks()
    fetchProjects()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const addTask = async (task) => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })
      const newTask = await response.json()
      setTasks([...tasks, newTask])
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const updateTask = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      const updated = await response.json()
      setTasks(tasks.map(t => t.id === id ? updated : t))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}`, { method: 'DELETE' })
      setTasks(tasks.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="logo">📋</span>
            <h1>Task Manager</h1>
          </div>
          <ul className="nav-menu">
            <li><button 
              className={currentPage === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setCurrentPage('dashboard')}
            >Dashboard</button></li>
            <li><button 
              className={currentPage === 'deadlines' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setCurrentPage('deadlines')}
            >Deadlines</button></li>
            <li><button 
              className={currentPage === 'projects' ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setCurrentPage('projects')}
            >Projects</button></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'dashboard' && (
          <Dashboard 
            tasks={tasks} 
            projects={projects}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        )}
        {currentPage === 'deadlines' && (
          <Deadlines 
            tasks={tasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        )}
        {currentPage === 'projects' && (
          <Projects 
            projects={projects}
            tasks={tasks}
            onAddTask={addTask}
          />
        )}
      </main>
    </div>
  )
}

export default App
