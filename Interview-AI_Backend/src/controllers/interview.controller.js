const pdfParse = require("pdf-parse");
const {interviewReport, generateResumePDF} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");


/**
 * @route POST /api/interview/generate-report
 * @desc Generate interview report based on job description, resume and self description
 * @access Private
 */
async function generateInterviewReport(req, res) {
    try {
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
        const { jobDescription, selfDescription} = req.body;

        const generateReport = await interviewReport({
            jobDescription,
            resume: resumeContent.text,
            selfDescription
        });

        const interviewReportData = await interviewReportModel.create({
            user: req.user.id,
            jobDescription,
            resume: resumeContent.text,
            selfDescription,
            ...generateReport,
        })
        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReportData,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message, 
        });
    }
}

/**
 * @route GET /api/interview/:id
 * @desc Get interview report by ID
 * @access Private
 */

async function getInterviewReportById(req, res) {
    try {
        const id =  req.params.id;

        const report = await interviewReportModel.findOne({_id: id, user: req.user.id});

        if (!report) {
            return res.status(404).json({
                message: "Interview report not found",
            });
        }
        return res.status(200).json({
            message: "Interview report fetched successfully",
            report,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message, 
        });
    }
}

/**
 * @route GET /api/interview/all
 * @desc Get all interview reports of the user
 * @access Private
 */

async function getAllInterviewReports(req, res) {
    try {
        const reports = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1})

        return res.status(200).json({
            message: "Interview reports fetched successfully",
            reports,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message, 
        });
    }
}

/**
 * @route POST /api/interview/resume-pdf
 * @desc Generate a PDF file of the resume based on the candidate's profile and job description
 * @access Private
 */
async function generateResumePDFController(req, res) {
    try {
        const { id } = req.params;

        const report = await interviewReportModel.findById(id);
        if (!report) {
            return res.status(404).json({
                message: "Interview report not found",
            });
        }

        const { jobDescription, resume, selfDescription } = report;

        const pdfBuffer = await generateResumePDF({
            jobDescription,
            resume,
            selfDescription,
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${report.title}.pdf`,
        });
        res.send(pdfBuffer);
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message, 
        });
    }
}


    
module.exports = { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePDFController }
