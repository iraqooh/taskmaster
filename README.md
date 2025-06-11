# Taskamaster 🧩

**Taskamaster** is a powerful and extensible task management web application built with the MERN (MongoDB, Express.js, React, Node.js) stack. It helps users stay organized through features like categorization, priority setting, and reminders—all while enforcing secure, token-based authentication and providing well-documented RESTful APIs.

---

## ✨ Features

### 🧑 User Management
- User registration and login with **JWT-based authentication**
- Secure password storage using **hashing algorithms (e.g., bcrypt)**
- Profile management (update name, email, and password)

### 📋 Task Management
- Full **CRUD operations** on tasks
- Assign **due dates** to tasks
- Set **task priority**: Low, Medium, High, Urgent
- Mark tasks as **complete or pending**

### 🗂 Categorization
- Create and manage custom **categories** (e.g., Work, Personal)
- Assign tasks to categories
- Filter tasks by selected category

### ⏰ Reminder System
- Set one-time **reminders** for tasks (single date-time)
- List, update, and delete task reminders

### 🧪 API Infrastructure
- **RESTful API** architecture with standardized status codes
- Fully documented using **Swagger / OpenAPI**
- **Token-based access control** for secure endpoints

---

## 🛠 Tech Stack

| Layer         | Technology       |
|---------------|------------------|
| Frontend      | React.js         |
| Backend       | Express.js       |
| Authentication| JSON Web Tokens  |
| Database      | MongoDB          |
| API Docs      | Swagger / OpenAPI|
| Styling       | TailwindCSS      |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/iraqooh/taskamaster.git
cd taskamaster
```

2. Setup the Backend

```bash
cd backend
npm install
cp .env.example .env   # Configure your environment variables
npm run dev
```

3. Setup the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

## 📂 Project Structure

```pgsql
taskamaster/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── docs/ (Swagger)
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.js
├── LICENSE
└── README.md
```

## 🔐 Environment Variables

Create a .env file in the backend/ directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
```

## 📑 API Documentation

Taskamaster comes with Swagger UI for interactive API exploration:

Visit: http://localhost:5000/api-docs

## 📖 License

This project is licensed under the GNU General Public License v3.0.
See the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and open a pull request with your enhancements. Bug reports and feature requests are also highly appreciated via Issues.

## 📬 Contact

For any queries or suggestions, reach out via [email@example.com].

Empower your productivity with Taskamaster – the open-source way to manage tasks effectively.
