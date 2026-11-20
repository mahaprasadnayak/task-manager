import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'tasks.db')

let db

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err)
      } else {
        createTables()
        resolve(db)
      }
    })
  })
}

function createTables() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        project TEXT,
        status TEXT DEFAULT 'not-started',
        priority TEXT DEFAULT 'medium',
        dueDate TEXT NOT NULL,
        assignedTo TEXT,
        tags TEXT,
        createdDate TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        status TEXT DEFAULT 'active',
        startDate TEXT,
        endDate TEXT,
        teamMembers TEXT,
        createdDate TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `)
  })
}

export function getAllTasks() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM tasks ORDER BY dueDate ASC', (err, rows) => {
      if (err) reject(err)
      else resolve(rows.map(row => ({
        ...row,
        tags: row.tags ? JSON.parse(row.tags) : []
      })))
    })
  })
}

export function getTaskById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
      if (err) reject(err)
      else resolve(row ? {
        ...row,
        tags: row.tags ? JSON.parse(row.tags) : []
      } : null)
    })
  })
}

export function createTask(task) {
  return new Promise((resolve, reject) => {
    const { title, description, project, status, priority, dueDate, assignedTo, tags, createdDate } = task
    const tagsJson = JSON.stringify(tags || [])
    
    db.run(
      `INSERT INTO tasks (title, description, project, status, priority, dueDate, assignedTo, tags, createdDate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, project, status, priority, dueDate, assignedTo, tagsJson, createdDate],
      function(err) {
        if (err) reject(err)
        else {
          resolve({
            id: this.lastID,
            ...task
          })
        }
      }
    )
  })
}

export function updateTask(id, updates) {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ')
    const values = Object.values(updates)
    
    if (updates.tags) {
      updates.tags = JSON.stringify(updates.tags)
    }
    
    db.run(
      `UPDATE tasks SET ${fields} WHERE id = ?`,
      [...values, id],
      function(err) {
        if (err) reject(err)
        else {
          getTaskById(id).then(resolve).catch(reject)
        }
      }
    )
  })
}

export function deleteTask(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
      if (err) reject(err)
      else resolve({ success: true })
    })
  })
}

export function getAllProjects() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM projects ORDER BY createdDate DESC', (err, rows) => {
      if (err) reject(err)
      else resolve(rows.map(row => ({
        ...row,
        teamMembers: row.teamMembers ? JSON.parse(row.teamMembers) : []
      })))
    })
  })
}

export function createProject(project) {
  return new Promise((resolve, reject) => {
    const { name, description, status, startDate, endDate, teamMembers, createdDate } = project
    const teamMembersJson = JSON.stringify(teamMembers || [])
    
    db.run(
      `INSERT INTO projects (name, description, status, startDate, endDate, teamMembers, createdDate)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, status, startDate, endDate, teamMembersJson, createdDate],
      function(err) {
        if (err) reject(err)
        else {
          resolve({
            id: this.lastID,
            ...project
          })
        }
      }
    )
  })
}

export function getDatabase() {
  return db
}
