const mongoose = require("mongoose");

/**
 * input to AI
 * - job description
 * - resume
 * - self description
 * 
 * output from AI
 * - matchScore
 * - Technical Questions
 * - Behavioral Questions
 * - SkillGaps
 * - Preparation Plan
 * 
 */

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    intention: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    }
}, { _id: false})

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    intention: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    }
}, { _id: false})

const skillGapsSchema = new mongoose.Schema({
    skill : {
        type: String,
        required: true,
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
    }
}, { _id: false})

const preparationPlanShema = new mongoose.Schema({
    day: {
        type: Number,
        required: true,
    },
    focus: {
        type: String,
        required: true,
    },
    tasks: [{
        type: String,
        required: true,
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true,
    },

    resume: {
        type: String,
    },

    selfDescription: {
        type: String,
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },

    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanShema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)
module.exports = interviewReportModel;
