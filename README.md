# 🚀 API Failure Intelligence System

## 📌 Overview

A backend system designed to monitor, analyze, and diagnose API performance and failures in real-time.

---

## ⚙️ Features

- 📡 Log API requests and responses
- 📊 Analyze failure rates
- 🧠 Smart suggestions for debugging
- 🔥 Identify most failing APIs
- ⏱ Detect slow APIs

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- REST APIs
- Postman

---

## 📡 API Endpoints

### Add Log

POST /api/logs/add

### Get Logs

GET /api/logs

### Failure Analysis

GET /api/logs/analysis

### Top Failures

GET /api/logs/top-failures

### Slow APIs

GET /api/logs/slow-apis

---

## 🚀 Setup Instructions

1. Clone the repo
2. Install dependencies:
   npm install

3. Create `.env` file:
   MONGO_URI=your_mongodb_connection_string

4. Run server:
   npx nodemon server.js

---

## 💡 Future Improvements

- Frontend dashboard (React)
- AI-based error analysis
- Real-time alerts
- Authentication system

---

## 👨‍💻 Author

Pavan
