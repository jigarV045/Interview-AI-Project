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
| AI Integration | LLM API (e.g., OpenAI / Anthropic) |
| Database | MongoDB / PostgreSQL |
| Styling | CSS / Tailwind CSS |

---

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/          # Home, Login, Register, Report
│   │   ├── components/     # Reusable UI components
│   │   └── services/       # API calls
├── server/                 # Node.js backend
│   ├── routes/             # Auth, report generation
│   ├── controllers/        # Business logic
│   ├── models/             # Database schemas
│   └── middleware/         # Auth middleware
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
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

### Run the App

```bash
# Start the backend
cd server
npm run dev

# Start the frontend (in a new terminal)
cd client
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is licensed under the MIT License.