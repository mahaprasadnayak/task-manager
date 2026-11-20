import express from 'express'
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getAllProjects,
  createProject
} from './database.js'

const router = express.Router()

// Tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await getTaskById(req.params.id)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/tasks', async (req, res) => {
  try {
    const task = await createTask(req.body)
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await updateTask(req.params.id, req.body)
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    await deleteTask(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects()
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/projects', async (req, res) => {
  try {
    const project = await createProject(req.body)
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
