import React, { useState, useRef, useEffect } from 'react'
import { useInterview } from "../hooks/useInterview"
import { useNavigate } from "react-router";

const Home = () => {
    const { loading, generateReport, reports, getAllReports } = useInterview();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const resumeInputRef = useRef();

    const navigate = useNavigate();

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0];
        const data = await generateReport({ jobDescription, resumeFile, selfDescription });
        if (!data) return;
        navigate(`/interview/${data._id}`)
    }

    // useEffect(() => {
    //     getAllReports();
    // }, [])

    return (
        <>
            <main className='w-full min-h-screen flex flex-col gap-5 items-center justify-center bg-black px-6 py-10 text-white'>
                <div className='max-w-3xl text-center'>
                    <h1 className='text-4xl font-bold'>Create your custom Interview Plan</h1>
                    <p className='mt-3 text-base leading-7 text-gray-300'>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </div>

                <section className="card flex min-h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-950 shadow-2xl shadow-black/40">

                    <div className="top flex flex-1 flex-col gap-5 p-6 md:flex-row min-h-95">
                        <div className="left flex  flex-1 flex-col gap-3 rounded-lg border border-gray-800 bg-gray-900/60 p-5">
                            <label className="text-sm font-medium text-gray-200" htmlFor="jobDescription">Target Job Description</label>
                            <textarea
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className='min-h-0 flex-1 resize-none rounded-lg border border-gray-700 bg-black/40 p-4 text-sm leading-6 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' id="jobDescription" name="jobDescription" placeholder='Paste the full job description here...'></textarea>
                        </div>

                        <div className="right flex  flex-1 flex-col gap-5 rounded-lg border border-gray-800 bg-gray-900/60 p-5">
                            <div className="flex flex-col gap-3">
                                <label className="text-sm font-medium text-gray-200" htmlFor="resume">Upload Resume</label>
                                <input
                                    ref={resumeInputRef}
                                    className='w-full cursor-pointer rounded-lg border border-dashed border-gray-700 bg-black/40 p-4 text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:border-gray-600' type="file" id="resume" name="resume" accept='.pdf' />

                            </div>

                            <div className="flex min-h-0 flex-1 flex-col gap-3">
                                <label className="text-sm font-medium text-gray-200" htmlFor="selfDescription">Quick Self Description</label>
                                <textarea
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    className='min-h-45 flex-1 resize-none rounded-lg border border-gray-700 bg-black/40 p-4 text-sm leading-6 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' id="selfDescription" name="selfDescription" placeholder='Tell us about yourself in a few words...'></textarea>
                            </div>

                            <p className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-sm leading-6 text-blue-100">Resume and self description together help generate a stronger interview report.</p>
                        </div>
                    </div>

                    <div className="bottom flex flex-col gap-4 border-t border-gray-800 bg-black/30 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-400">AI powered report generation</p>
                        <button
                            onClick={handleGenerateReport}
                            disabled={loading} // ✅ prevents double clicks
                            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Generating...
                                </span>
                            ) : "Generate Interview Report"}
                        </button>
                    </div>
                </section>

                <section className="max-w-5xl w-full mt-10">
                    {reports && reports.length > 0 ? (
                        <div>
                            <h2 className="mb-4 text-xl font-bold">Your Recent Interview Reports</h2>
                            <div className="reports-list flex flex-col gap-4">
                                {reports.map((report) => (
                                    <div key={report._id} className="report-item flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/60 p-4">
                                        <div>
                                            <h3 className="text-lg font-semibold">{report.title || "Untitled Position"}</h3>
                                            <p className="text-sm text-gray-400">{new Date(report.createdAt).toLocaleString("en-GB")}</p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/interview/${report._id}`)}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950 cursor-pointer">
                                            View Report
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">No reports generated yet. Start by creating a new interview report!</p>
                    )}
                </section>
            </main >
        </>
    )
}

export default Home
