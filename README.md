📋 Team Task Manager

Team Task Manager is a full-stack MERN application where users can create projects, manage tasks, track project progress, and organize work inside project-based task boards.

The application supports authentication, project-wise task management, task priorities, task status tracking, and dashboard analytics.

==================================================

🚀 FEATURES

🔐 Authentication
- User Login
- JWT Authentication
- Protected Routes

📁 Project Management
- Create Projects
- View All Projects
- Open Individual Projects
- Project-wise Task Management

✅ Task Management
- Create Tasks inside Projects
- Task Priority (Low / Medium / High)
- Task Status (To Do / In Progress / Done)
- Due Dates
- Delete Tasks

📊 Dashboard
- Total Tasks
- To Do Count
- In Progress Count
- Done Count
- Overdue Tasks

☁️ Deployment
- Single Railway Deployment
- Frontend + Backend served from one Express server

==================================================

🛠 TECH STACK

Frontend:
- React
- Vite
- CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Authentication:
- JWT

Deployment:
- Railway

==================================================

📁 FOLDER STRUCTURE

team-task-manager/

├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── public/
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.txt

==================================================

⚙️ INSTALLATION

1️⃣ Clone Repository

git clone <your-github-repo>

cd team-task-manager

==================================================

2️⃣ Backend Setup

cd Backend

npm install

Create .env file:

MONGO_URI=your_mongodb_url

JWT_SECRET=mysecretkey

PORT=5000

Run Backend:

npm start

==================================================

3️⃣ Frontend Setup

cd Frontend

npm install

npm run dev

Frontend runs on:

http://localhost:5173

==================================================

🚀 RAILWAY DEPLOYMENT

Single Deployment Setup

The frontend production build is served directly from the Express backend using express.static().

This allows the entire MERN application to run from a single Railway URL.

==================================================

RAILWAY STEPS

1️⃣ Push Code to GitHub

git add .

git commit -m "Final deployment"

git push

==================================================

2️⃣ Deploy on Railway

- Create New Project
- Deploy from GitHub
- Select Repository

Set Root Directory:

Backend

==================================================

3️⃣ Add Environment Variables

MONGO_URI=your_mongodb_url

JWT_SECRET=mysecretkey

==================================================

🌐 LIVE DEMO

Live URL:

https://your-app.up.railway.app

==================================================

👨‍💻 AUTHOR

Srinu Boddupally

GitHub:
https://github.com/srinu-boddupally

==================================================

📌 FUTURE IMPROVEMENTS

- Team Collaboration
- Role-based Access
- Task Assignment
- Notifications
- Drag & Drop Tasks
- File Uploads
