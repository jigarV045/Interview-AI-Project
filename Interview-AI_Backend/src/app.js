const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.routes");
const interviewRoutes = require("../src/routes/interview.routes");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;
