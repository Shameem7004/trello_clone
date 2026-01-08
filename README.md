# 🗂️ Workspace Management Tool

A Kanban-style project management web application inspired by Trello, built as part of the SDE Intern Fullstack Assignment. The application allows users to manage projects visually using boards, lists, and cards with smooth drag-and-drop interactions.

## 🚀 Features

### ✅ Core Features

- **Board Management**
  - Create and view boards with titles
  - View boards with all lists and cards
  
- **Lists Management**
  - Create, edit, and delete lists
  - Drag & drop to reorder lists
  
- **Cards Management**
  - Create cards with title
  - Edit card title, description, and due date
  - Delete cards
  - Drag & drop cards between lists
  - Drag & drop to reorder cards within a list
  
- **Card Details**
  - Add and edit descriptions
  - Set due dates with visual indicators (overdue, today, upcoming)
  - View card details in modal
  
- **Search & Filter**
  - Search cards by title in real-time

### ⭐ Bonus Features

- ✅ Responsive UI (Desktop & Mobile)
- ✅ Multiple boards support
- ✅ Seeded sample data
- ✅ Clean Trello-like UI design
- ✅ Card modal for detailed editing
- ✅ Visual due date indicators
- ✅ Smooth drag-and-drop animations

## 🧠 Tech Stack

### Frontend
- **React.js** (Vite)
- **@hello-pangea/dnd** - Drag and Drop
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** - Database
- **pg** - PostgreSQL client
- **dotenv** - Environment variables

## 🏗️ Architecture

```
Frontend (React)
      ↓
   REST APIs
      ↓
Express Server
      ↓
  PostgreSQL
```

## 📁 Project Structure

```
Workspace_Management/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card/
│   │   │   ├── CardModal/
│   │   │   ├── List/
│   │   │   ├── Header/
│   │   │   └── SearchBar/
│   │   ├── pages/
│   │   │   └── BoardPage.jsx
│   │   ├── api/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── db/
│   │   └── server.js
│   ├── sql/
│   │   ├── schema.sql
│   │   └── seed.sql
│   └── package.json
│
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/workspace-management.git
cd workspace-management
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "DATABASE_URL=your_postgresql_connection_string" > .env
echo "PORT=3000" >> .env

# Run database migrations
psql your_database_url -f sql/schema.sql
psql your_database_url -f sql/seed.sql

# Start backend server
npm run dev
```

📍 Backend runs at: **http://localhost:3000**

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000" > .env

# Start frontend
npm run dev
```

📍 Frontend runs at: **http://localhost:5173**

## 🗄️ Database Schema

### Tables
- `boards` - Project boards
- `lists` - Lists within boards
- `cards` - Cards within lists
- `members` - Team members
- `labels` - Card labels (tags)
- `checklists` - Card checklists
- `checklist_items` - Items within checklists
- `card_labels` - Many-to-many relationship
- `card_members` - Many-to-many relationship
- `attachments` - File attachments
- `comments` - Card comments

### Key Relationships
- Board → Lists (1:Many)
- List → Cards (1:Many)
- Card → Labels (Many:Many)
- Card → Members (Many:Many)
- Card → Checklists (1:Many)

## 🎨 Features Demonstration

### Drag & Drop
- Smooth card reordering within lists
- Move cards between lists
- Reorder lists on the board

### Card Management
- Click card to open detailed modal
- Edit title, description, due date
- Visual due date indicators
- Delete cards with confirmation

### List Management
- Edit list title inline
- Delete lists with confirmation
- Add new lists dynamically

### Search
- Real-time card search
- Highlight matching cards

## 🌐 Deployment

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Railway PostgreSQL

## 📌 API Endpoints

### Boards
- `GET /boards` - Get all boards
- `GET /boards/:boardId` - Get board with lists and cards

### Lists
- `POST /lists` - Create new list
- `PUT /lists/:listId` - Update list title
- `DELETE /lists/:listId` - Delete list

### Cards
- `POST /cards` - Create new card
- `GET /cards/:cardId` - Get card details
- `PUT /cards/:cardId` - Update card
- `PUT /cards/move` - Move card
- `DELETE /cards/:cardId` - Delete card

## 🧪 Sample Data

Database is seeded with:
- 3 boards ("Sample Project Board", "Website Redesign", "Mobile App Launch")
- Multiple lists per board
- Sample cards with descriptions
- 6 team members
- Labels with colors

## 🎯 Assumptions

- Single default user (no authentication)
- Focus on core Trello functionality
- REST APIs instead of GraphQL
- PostgreSQL for data persistence

## 👨‍💻 Author

**Md Shameem Alam**  
Prefinal Year Student  
Food Process Engineering, NIT Rourkela

## 📝 License

This project is created for educational purposes as part of the SDE Intern Fullstack Assignment.