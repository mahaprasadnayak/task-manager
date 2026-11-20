# Task Manager App 📋

A modern, card-based task management application designed to help you track application deadlines, coordinate projects, and manage your workload efficiently.

## 🎯 Features

- **Task Card Interface**: Clean, card-based UI for viewing and managing tasks
- **Multiple Views**: 
  - Dashboard (Overview of all tasks)
  - Deadline Tracker (Sorted by urgency)
  - Project View (Organized by projects)
- **Status Tracking**: Track task progress with visual indicators
  - 🔴 Not Started
  - 🟡 In Progress
  - ✅ Completed
  - 🛑 Blocked
- **Deadline Management**: Visual indicators for approaching deadlines
- **Project Organization**: Group tasks by project
- **Progress Metrics**: See overall completion percentage
- **Search & Filter**: Find tasks quickly by name, project, or status

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
cd task-manager-app
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
task-manager-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskCard.jsx
│   │   ├── TaskList.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProjectView.jsx
│   │   └── AddTaskModal.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Deadlines.jsx
│   │   └── Projects.jsx
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── server.js
│   ├── database.js
│   └── routes.js
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js
- **Database**: SQLite
- **Styling**: CSS3 with modern design patterns

## 📊 Data Model

### Tasks
- Task ID
- Title
- Description
- Project
- Status (Not Started, In Progress, Completed, Blocked)
- Priority (High, Medium, Low)
- Due Date
- Created Date
- Assigned To
- Tags

### Projects
- Project ID
- Name
- Description
- Status
- Start Date
- End Date
- Team Members

## 🎨 Design Inspiration

This app is inspired by modern flashcard study applications, featuring:
- Clean card-based layout
- Progress tracking with visual indicators
- Intuitive navigation
- Status filtering and organization
- Mobile-responsive design

## 📝 Sample Use Cases

1. **Application Deadlines**: Track job application submissions with reminders
2. **Project Coordination**: Manage team projects with task dependencies
3. **Personal Goals**: Monitor progress on learning or fitness goals
4. **Event Planning**: Coordinate event tasks with timelines
5. **Academic Schedule**: Track assignment and exam deadlines

## 🔒 Privacy

All data is stored locally in SQLite. No cloud dependencies.

## 📄 License

MIT License - Feel free to use this for personal or professional purposes!

## 👨‍💼 Portfolio Note

This application demonstrates:
- Full-stack development skills
- React component architecture
- Backend API design
- Database design and management
- UI/UX principles
- Project organization
