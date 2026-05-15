import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

export const generateInterviewReport = async ({jobDescription, resumeFile, selfDescription}) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription);

    try {
        const response = await api.post("/api/interview/generate-report", formData, {
            headers: {
                "Content-Type" : "multipart/form-data",
            }
        })
        return response.data;
    } catch (error) {
        console.error("Failed to generate interview report", error);
    }
}

export const getInterviewReportById = async (interviewID) => {
    try {
        const response = await api.get(`/api/interview/${interviewID}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch interview report", error);
        return null;
    }
}

export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview/all");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch interview reports", error);
    }
}       

export const generateResumePDF = async (interviewReportId) => {
    try {
        const response = await api.post(`/api/interview/resume-pdf/${interviewReportId}`, null, {
            responseType: "blob"
        });
        return response.data;
    } catch (error) {
        console.error("Failed to generate resume PDF", error);
    }
}