#!/usr/bin/env node

/**
 * Sample Data Setup Script
 * Populates the database with example tasks and projects
 * Run this after starting the backend server
 */

const http = require('http')

const API_URL = 'http://localhost:3001'

// Sample projects
const sampleProjects = [
  {
    name: 'Job Search 2024',
    description: 'Track all job applications and interview processes',
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2025-02-01',
    teamMembers: ['Me']
  },
  {
    name: 'Web Redesign Project',
    description: 'Complete overhaul of company website',
    status: 'active',
    startDate: '2024-10-15',
    endDate: '2024-12-20',
    teamMembers: ['Me', 'Designer', 'QA']
  },
  {
    name: 'Learning React Hooks',
    description: 'Master React Hooks and advanced patterns',
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2025-01-31',
    teamMembers: ['Me']
  }
]

// Sample tasks
const sampleTasks = [
  {
    title: 'Submit Application to TechCorp',
    description: 'Apply for Senior React Developer position',
    project: 'Job Search 2024',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-11-25',
    assignedTo: 'Me',
    tags: ['urgent', 'career'],
    createdDate: new Date().toISOString()
  },
  {
    title: 'Follow up with StartupAI',
    description: 'Send follow-up email after phone interview',
    project: 'Job Search 2024',
    status: 'not-started',
    priority: 'high',
    dueDate: '2024-11-21',
    assignedTo: 'Me',
    tags: ['interview', 'follow-up'],
    createdDate: new Date().toISOString()
  },
  {
    title: 'Design Homepage Mockup',
    description: 'Create new homepage design in Figma',
    project: 'Web Redesign Project',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-11-24',
    assignedTo: 'Designer',
    tags: ['design', 'UI'],
    createdDate: new Date().toISOString()
  },
  {
    title: 'Implement Homepage React Components',
    description: 'Build React components based on design mockup',
    project: 'Web Redesign Project',
    status: 'not-started',
    priority: 'high',
    dueDate: '2024-12-01',
    assignedTo: 'Me',
    tags: ['development', 'React'],
    createdDate: new Date().toISOString()
  },
  {
    title: 'Complete QA Testing',
    description: 'Full quality assurance testing of redesigned site',
    project: 'Web Redesign Project',
    status: 'not-started',
    priority: 'high',
    dueDate: '2024-12-10',
    assignedTo: 'QA',
    tags: ['testing', 'QA'],
    createdDate: new Date().toISOString()
  },
  {
    title: 'Deploy to Production',
    description: 'Release new website to production servers',
    project: 'Web Redesign Project',
    status: 'not-started',
    priority: 'high',
    dueDate: '2024-12-20',
    assignedTo: 'Me',
    tags: ['deployment', 'production'],
    createdDate: new Date().toISOString()
  },
  {
    title: 'Learn useState Hook',
    description: 'Complete lessons on React useState hook',
    project: 'Learning React Hooks',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-11-15',
    assignedTo: 'Me',
    tags: ['learning', 'React', 'hooks'],
    createdDate: new Date().toISOString()
  },
  {
    title: 'Learn useEffect Hook',
    description: 'Master useEffect hook and cleanup functions',
    project: 'Learning React Hooks',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-11-22',
    assignedTo: 'Me',
    tags: ['learning', 'React', 'hooks'],
    createdDate: new Date().toISOString()
  },
  {
    title: 'Build Custom Hooks Project',
    description: 'Create 3 custom hooks for common use cases',
    project: 'Learning React Hooks',
    status: 'not-started',
    priority: 'medium',
    dueDate: '2024-12-15',
    assignedTo: 'Me',
    tags: ['project', 'custom-hooks'],
    createdDate: new Date().toISOString()
  }
]

function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_URL)
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const req = http.request(options, (res) => {
      let responseData = ''
      res.on('data', chunk => responseData += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData))
        } catch (e) {
          resolve(responseData)
        }
      })
    })

    req.on('error', reject)

    if (data) {
      req.write(JSON.stringify(data))
    }

    req.end()
  })
}

async function setupSampleData() {
  console.log('🚀 Starting sample data setup...\n')

  try {
    // Check if server is running
    console.log('✓ Checking server health...')
    await makeRequest('GET', '/health')
    console.log('✓ Server is running!\n')

    // Add projects
    console.log('📁 Adding sample projects...')
    for (const project of sampleProjects) {
      try {
        const result = await makeRequest('POST', '/api/projects', project)
        console.log(`  ✓ Created project: ${project.name}`)
      } catch (error) {
        console.log(`  ✗ Failed to create project: ${project.name}`)
      }
    }
    console.log()

    // Add tasks
    console.log('📋 Adding sample tasks...')
    for (const task of sampleTasks) {
      try {
        const result = await makeRequest('POST', '/api/tasks', task)
        console.log(`  ✓ Created task: ${task.title}`)
      } catch (error) {
        console.log(`  ✗ Failed to create task: ${task.title}`)
      }
    }
    console.log()

    // Fetch and display summary
    console.log('📊 Fetching data summary...')
    const tasks = await makeRequest('GET', '/api/tasks')
    const projects = await makeRequest('GET', '/api/projects')

    console.log('\n✅ Sample Data Setup Complete!\n')
    console.log('Summary:')
    console.log(`  Projects: ${projects.length}`)
    console.log(`  Tasks: ${tasks.length}`)
    console.log(`    - Not Started: ${tasks.filter(t => t.status === 'not-started').length}`)
    console.log(`    - In Progress: ${tasks.filter(t => t.status === 'in-progress').length}`)
    console.log(`    - Completed: ${tasks.filter(t => t.status === 'completed').length}`)
    console.log('\n🎉 You can now explore your app with real data!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('\nMake sure the backend server is running on port 3001:')
    console.error('  node server/server.js')
    process.exit(1)
  }
}

// Run setup
setupSampleData()
