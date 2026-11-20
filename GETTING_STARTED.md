# Getting Started Guide

## 📸 Image Analysis Summary

The reference image shows a **Flashcard Study Application** with these key design principles:

### Design Features from Image:
- **Card-Based Interface**: Clean, centered card layout showing one item at a time
- **Status Indicators**: Visual badges showing progress (1 of 8, 2/8 mastered)
- **Multi-Tab Navigation**: Study, Card List, Decks views
- **Action Buttons**: Review, Flip Card, Mastered status buttons
- **Progress Tracking**: Visual completion metrics
- **Keyboard/Click Interaction**: "Space to Flip Card" prompt
- **Filtering**: View all items or filtered subsets

## 🎯 App Inspiration & Adaptation

This Task Manager App adapts those same principles for **project & deadline management**:

| Flashcard Feature | Task Manager Equivalent |
|---|---|
| Study mode | Dashboard view |
| Card flip | Task details reveal |
| Deck status | Project progress |
| Mastered cards | Completed tasks |
| Spaced repetition | Priority-based filtering |
| Filtering (All/Review) | Status filtering |
| Progress bar | Completion percentage |

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd C:\handai\task-manager-app
npm install
```

### Step 2: Start Development Environment

**Terminal 1 - Backend Server:**
```bash
npm run dev
# Navigate to server folder and run:
node server\server.js
```

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
# Your app will be at http://localhost:5173
```

### Step 3: Access the Application
- Open `http://localhost:5173` in your browser
- Backend API: `http://localhost:3001`

## 📋 Features Overview

### 1. **Dashboard** 📊
- Overview of all tasks
- Real-time statistics (total, in-progress, completed, % complete)
- Filter by status (All, Not Started, In Progress, Completed, Blocked)
- Quick task creation button

### 2. **Deadline Tracker** 📅
- Tasks sorted by urgency
- Three categories:
  - 🚨 Overdue
  - ⏰ This Week (urgent)
  - 📌 Later (future deadlines)
- Color-coded urgency indicators

### 3. **Projects View** 🏗️
- Project cards showing:
  - Total tasks and breakdown by status
  - Project timeline
  - Team members
  - Overall progress bar
  - Project status

## 🎨 UI Components

### TaskCard Component
- Flip mechanism (front/back)
- Status badges with color coding
- Priority indicators (🔴 High, 🟡 Medium, 🟢 Low)
- Due date with urgency coloring
- Quick action buttons (Complete, Delete, Details)

### AddTaskModal Component
- Form for creating new tasks
- Project selection
- Priority setting
- Date picker
- Tag support
- Team member assignment

## 💾 Data Model

### Tasks
```json
{
  "id": 1,
  "title": "Submit Job Application",
  "description": "Apply to Senior Developer position",
  "project": "Job Search 2024",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31",
  "assignedTo": "Me",
  "tags": ["urgent", "career"],
  "createdDate": "2024-11-20"
}
```

### Projects
```json
{
  "id": 1,
  "name": "Job Search 2024",
  "description": "Track all job applications",
  "status": "active",
  "startDate": "2024-11-01",
  "endDate": "2025-02-01",
  "teamMembers": ["You"],
  "createdDate": "2024-11-20"
}
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js
- **Database**: SQLite3
- **Styling**: Vanilla CSS3 (responsive, modern design)
- **API**: RESTful

## 📂 Project Structure

```
task-manager-app/
├── public/
│   └── index.html                 # HTML entry point
├── src/
│   ├── components/
│   │   ├── TaskCard.jsx           # Card component with flip
│   │   └── AddTaskModal.jsx       # Modal for new tasks
│   ├── pages/
│   │   ├── Home.jsx               # Dashboard
│   │   ├── Deadlines.jsx          # Deadline tracker
│   │   └── Projects.jsx           # Projects view
│   ├── styles/
│   │   └── App.css                # Global styling
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # Entry point
├── server/
│   ├── server.js                  # Express server
│   ├── database.js                # SQLite operations
│   └── routes.js                  # API routes
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Design Decisions

1. **Card-Based UI**: Mimics the flashcard study app for familiarity and engagement
2. **Color Coding**: Visual indicators for urgency and status at a glance
3. **Local Storage**: SQLite for privacy and no cloud dependencies
4. **Responsive Design**: Works on desktop, tablet, and mobile
5. **Actionable Dashboard**: Key stats and quick actions visible immediately
6. **Flexible Organization**: Tasks grouped by project or deadline

## 💡 Use Cases

1. **Job Application Tracking**: Track deadlines and application statuses
2. **Project Management**: Coordinate team tasks with priorities
3. **Academic Schedule**: Monitor assignments and exams
4. **Event Planning**: Organize event-related tasks
5. **Personal Goals**: Track learning milestones and fitness goals

## 🔒 Security & Privacy

- All data stored locally in SQLite
- No external API calls or cloud storage
- Database file: `server/tasks.db`
- No authentication required (local use only)

## 🚀 Deployment

For production use:
1. Build frontend: `npm run build`
2. Deploy to hosting (Vercel, Netlify, etc.)
3. Run backend on a server with Node.js
4. Update API endpoint in `src/App.jsx`

## 📊 Skills Demonstrated

This project showcases:
- ✅ Full-stack development (React + Node.js)
- ✅ Component architecture & state management
- ✅ RESTful API design
- ✅ Database design & SQL
- ✅ UI/UX principles
- ✅ Responsive design
- ✅ Project organization
- ✅ Modern web development practices

Perfect for portfolio & job applications! 💼
