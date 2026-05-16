import { useContext } from "react";
import { InterviewContext } from "../services/interview.context";
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePDF } from "../services/interview.api";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, resumeFile, selfDescription }) => {
        setLoading(true);
        try {
            const res = await generateInterviewReport({ jobDescription, resumeFile, selfDescription });
            if (res && res.interviewReportData) {
                setReport(res.interviewReportData);
                return res.interviewReportData;
            }
        } catch (error) {
            console.error("Failed to generate interview report", error);
        } finally {
            setLoading(false);
        }   
        return null;
    };

    const getReportById = async (id) => {
        setLoading(true);
        try {
            const res = await getInterviewReportById(id);
            if (res && res.report) {
                setReport(res.report);
                return res.report;
            }
        } catch (error) {
            console.error("Failed to fetch interview report", error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    const getAllReports = async () => {
        setLoading(true);
        try {
            const res = await getAllInterviewReports();
            if (res && res.reports) {
                setReports(res.reports);
                return res.reports;
            }
        } catch (error) {
            console.error("Failed to fetch interview reports", error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    const generateResume = async (interviewReportId) => {
        setLoading(true);
        try {
            const res = await generateResumePDF(interviewReportId);
            if (res) {
                const url = window.URL.createObjectURL(new Blob([res], { type: "application/pdf" }));
                const link = document.createElement("a");   
                link.href = url;
                link.setAttribute("download", `resume_${interviewReportId}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to generate resume PDF", error);
        } finally {
            setLoading(false);
        }
        return false;
    };

    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getAllReports, 
        generateResume 
    };
};