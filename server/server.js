import express from 'express'
import cors from 'cors'
import { initDatabase } from './database.js'
import router from './routes.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

async function startServer() {
  try {
    await initDatabase()
    console.log('Database initialized')
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
