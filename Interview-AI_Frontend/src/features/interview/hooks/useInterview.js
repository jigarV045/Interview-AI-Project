import { useContext, useEffect } from "react";
import { InterviewContext } from "../services/interview.context";
import { generateInterviewReport, getInterviewReportById, getAllInterviewReports, generateResumePDF } from "../services/interview.api"
import { useParams } from "react-router";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId} = useParams();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, resumeFile, selfDescription }) => {
        setLoading(true);
        let res = null;
        try{
            res = await generateInterviewReport({ jobDescription, resumeFile, selfDescription });
            setReport(res.interviewReportData);
            // return res.interviewReportData;
        } catch (error) {
            console.error("Failed to generate interview report", error);
            return null;
        } finally {
            setLoading(false);
        }   
        return res.interviewReportData;
    }

    const getReportById = async (interviewId) => {
        setLoading(true);
        let res = null;
        try {
            res = await getInterviewReportById(interviewId);
            setReport(res.report);
            // return res.report;
        } catch (error) {
            console.error("Failed to fetch interview report", error);
            return null;
        } finally {
            setLoading(false);
        }
        return res.report;
    }

    const getAllReports = async () => {
        setLoading(true);
        let res = null;
        try {
            res = await getAllInterviewReports();
            setReports(res.reports);
            // return res.report;
        } catch (error) {
            console.error("Failed to fetch interview reports", error);
            return null;
        } finally {
            setLoading(false);
        }
        return res.reports;
    }

    const generateResume = async (interviewReportId) => {
        setLoading(true);
        let res = null;
        try {
            res = await generateResumePDF(interviewReportId);
            const url = window.URL.createObjectURL(new Blob([res], { type: "application/pdf" }));
            const link = document.createElement("a");   
            link.href = url;
            link.setAttribute("download", `resume_${interviewReportId}.pdf`);
            document.body.appendChild(link);
            link.click();
            // return res;
        } catch (error) {
            console.error("Failed to generate resume PDF", error);
            return null;
        } finally {
            setLoading(false);
        }
        return res;
    }

    useEffect(() => {
        if( interviewId ) {
            getReportById(interviewId);
        } else {
            getAllReports();
        }
    }, [interviewId]);

    return { loading, report, reports, generateReport, getReportById, getAllReports, generateResume }
}