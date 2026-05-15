const express = require("express");
const interviewRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePDFController } = require("../controllers/interview.controller");

/** 
 * @route POST /api/interview/generate-report
 * @desc Generate an interview report based on job description, resume, and self-description
 * @access Private
 */
interviewRouter.post("/generate-report", authMiddleware.authUser, upload.single("resume"), generateInterviewReport)

/**
 * @route GET /api/interview/all
 * @desc Get all interview reports of the user
 * @access Private
 */
interviewRouter.get("/all", authMiddleware.authUser, getAllInterviewReports);

/**
 * @route GET /api/interview/:id
 * @desc Get interview report by ID
 * @access Private
 */
interviewRouter.get("/:id", authMiddleware.authUser, getInterviewReportById);

/**
 * @route POST /api/interview/resume-pdf
 * @desc Generate a PDF file of the resume based on the candidate's profile and job description
 * @access Private
 */
interviewRouter.post("/resume-pdf/:id", authMiddleware.authUser, generateResumePDFController);
module.exports = interviewRouter;