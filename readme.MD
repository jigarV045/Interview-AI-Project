# 🧠 AI Interview Prep & Report Generator

A smart web application that helps job seekers prepare for interviews by analyzing their resume and job description to generate personalized interview reports — complete with tailored questions, skill gap analysis, and an improved resume download.

---

## 🚀 Features

- **User Authentication** — Secure register and login system to keep your data private and accessible across sessions.
- **AI-Powered Interview Report Generation** — Paste your job description, upload your resume, and add a short self-description to generate a comprehensive interview report instantly.
- **Technical & Behavioral Questions** — Each report includes curated interview questions (both technical and behavioral) along with the intention behind each question and a suggested answer.
- **Skill Gap Analysis** — Identifies missing or underdeveloped skills with a severity level for each gap, so you know exactly where to focus.
- **Match Score** — Displays an overall compatibility score between your profile and the job description.
- **Improved Resume Download** — Generate and download an enhanced, job-targeted version of your resume with a single click.
- **Report History** — View all your previously generated reports on the Home page for easy reference.

---

## 🖥️ Usage

### 1. Register / Log In
Create an account or log in to access your personalized dashboard.

### 2. Generate a Report
On the Home page, fill in:
- **Job Description** — Paste the full job posting or role description.
- **Your Resume** — Upload or paste your current resume.
- **Self Description** — Write a short paragraph about yourself, your goals, and your background.

Click **Generate Report** to get your personalized interview prep report.

### 3. Review Your Report
Your report includes:
- A list of **interview questions** (technical + behavioral) with intentions and suggested answers.
- A **skill gap breakdown** with severity levels (e.g., Low / Medium / High).
- A **match score** showing how well your profile fits the role.

### 4. Download Improved Resume
Click the **Download Resume** button on the report page to get an updated, optimized version of your resume tailored to the job description.

### 5. Access Past Reports
All previously generated reports are listed on the Home page so you can revisit and track your progress over time.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Authentication | JWT / Session-based Auth |
| AI Integration | LLM API (e.g., Gemini AI) |
| Database | MongoDB |
| Styling | CSS / Tailwind CSS |

---

## 📁 Project Structure

```
├── Interview_AI_Backend/   # Node.js backend
│   ├── src/
│   │   ├── config/            # Database and infrastructure configurations
│   │   │   └── db.js          # MongoDB connection handler
│   │   ├── controllers/       # HTTP Request handlers & Business logic orchestration
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   ├── middlewares/       # Request interceptors & Validation guards
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js   # Handles incoming multipart file streams (Multer)
│   │   ├── models/            # Mongoose Data Schemas (ODM)
│   │   │   ├── blacklistToken.model.js  # Tracks invalidated JWT session tokens
│   │   │   ├── interviewReport.model.js # Schema for compiled AI analysis records
│   │   │   └── user.model.js            # User profiles & credential records
│   │   ├── routes/            # Express Router endpoints mappings
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   ├── services/          # Third-party integrations & isolated utilities
│   │   │   └── ai.service.js  # Dedicated Gemini API SDK integration logic
│   │   └── app.js             # Express server instantiator and middleware assembly
├── Interview_AI_Frontend/  # React frontend
src/
├── components/                # Shared layout UI elements
│   └── Navbar.jsx             # Shared app header panel
├── features/
│   ├── authentication/
│   │   ├── components/        # Protected session route guards
│   │   │   └── Protected.jsx
│   │   ├── pages/             # Auth interface entry paths
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── services/          # Session API controllers & context providers
│   │       ├── auth.api.js
│   │       └── auth.context.jsx
│   └── interview/
│       ├── pages/             # Project execution spaces
│       │   ├── Landing.jsx    # Public marketing presentation view
│       │   ├── Home.jsx       # Interactive entry form & user history timeline
│       │   └── Interview.jsx  # Multi-tab analysis workspace view
│       └── services/          # Report processing logic & storage hooks
│           ├── interview.api.js
│           └── interview.context.jsx
├── hooks/                     # Custom hooks exposed to view layers
│   ├── useAuth.js
│   └── useInterview.js
└── App.jsx                    # Root application router map
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- A running MongoDB / PostgreSQL instance

### Installation

```bash
# Clone the repository
git clone https://github.com/jigarV045/Interview-AI-Project.git
cd Interview-AI-Project

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `Interview-AI_Backend/` directory:

```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```
Create a `.env` file in the `Interview-AI_Frontend/` directory:
```env
VITE_API_URL=http://localhost:3000
```

### Run the App

```bash
# Start the backend
cd Interview-AI_Backend
npm run dev

# Start the frontend (in a new terminal)
cd Interview-AI_Frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is licensed under the MIT License.