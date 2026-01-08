🗂️ Project Management Tool (Trello Clone)

A Kanban-style project management web application inspired by Trello, built as part of the SDE Intern Fullstack Assignment.
The application allows users to manage projects visually using boards, lists, and cards with smooth drag-and-drop interactions.

🚀 Features
✅ Core Features

Create and view Boards

Create, edit, delete Lists

Create, edit, delete Cards

Drag & drop:

Reorder lists

Move cards across lists

Reorder cards within a list

Card details:

Description

Due date

Labels (color tags)

Checklist items

Assign members

Search cards by title

Filter cards by:

Labels

Members

Due date

⭐ Bonus Features

Responsive UI (Desktop & Mobile)

Multiple boards support

Seeded sample data

Clean Trello-like UI

🧠 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Redux Toolkit

Drag & Drop: @hello-pangea/dnd

Backend

Node.js

Express.js

Prisma ORM

Database

PostgreSQL

🏗️ Architecture (High Level)
React (Frontend)
   |
   | REST APIs
   v
Express Server (Backend)
   |
   | Prisma ORM
   v
PostgreSQL Database

📁 Project Structure
project-management/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── api/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── README.md

⚙️ Setup Instructions (Step-by-Step)
1️⃣ Clone the Repository
git clone https://github.com/your-username/project-management.git
cd project-management

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev


📍 Frontend runs at:
👉 http://localhost:5173

3️⃣ Backend Setup
cd backend
npm install

Create .env file
DATABASE_URL="postgresql://username:password@localhost:5432/projectdb"

4️⃣ Prisma Setup
npx prisma generate
npx prisma db push


(Optional) Open Prisma Studio:

npx prisma studio

5️⃣ Start Backend Server
npm run dev


📍 Backend runs at:
👉 http://localhost:4000

🗄️ Database Schema (Overview)

User

Board

List

Card

Label

Checklist

Members

Each Board has multiple Lists, each List has multiple Cards, and card positions are maintained using an order field to support drag-and-drop.

🔁 Drag & Drop Logic

Frontend captures drag events

Updated positions are sent to backend

Backend updates order and listId

Database persists changes

UI re-renders instantly

🧪 Sample Data

The database is seeded with:

A sample board

Predefined lists (Todo, In Progress, Done)

Sample cards

Dummy members

No authentication is required; a default user is assumed to be logged in.

🌐 Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway

Database: Railway / Supabase PostgreSQL

📌 Assumptions

Single default user (no login)

Focus on functionality and UI similarity

REST APIs used instead of GraphQL

Drag & drop state persisted in database

🧠 Code Understanding

AI tools were used for guidance, but every line of code is understood and can be explained during evaluation, including:

Prisma relations

Drag & drop logic

State management

API design decisions

👨‍💻 Author

Md Shameem Alam
Prefinal Year Student
Food Process Engineering, NIT Rourkela