import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import Navbar from '../../authentication/components/Navbar'

const Home = () => {
  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const resumeInputRef = useRef()
  const [resumeName, setResumeName] = useState('')
  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, resumeFile, selfDescription })
    if (!data) return
    navigate(`/interview/${data._id}`)
  }

  return (
    <main className="min-h-screen w-full bg-[#0f111a] text-gray-200 p-4 sm:p-6 md:p-8">
        <Navbar />
      <div className="mx-auto w-full max-w-5xl">
        
        {/* Top Navbar Row */}
        <header className="flex w-full items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
              iA
            </div>
            <span className="text-base font-semibold text-white">InterviewAI</span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-900 border border-gray-800 px-3 py-1 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Ready for setup
          </span>
        </header>

        {/* Introduction Header */}
        <div className="mt-10 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create a new interview plan
          </h1>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            Fill in the details below. The system will look over the target role alongside your background to outline your core path, potential skill gaps, and custom practice questions.
          </p>
        </div>

        {/* Main Interface Block */}
        <section className="mt-8 w-full rounded-xl border border-gray-800 bg-[#161925] shadow-xl overflow-hidden">
          
          {/* Main Content Area using Flexbox row/column configuration */}
          <div className="flex flex-col lg:flex-row border-b border-gray-800">
            
            {/* Left Box: Job Description Field (Takes 50% width on desktop) */}
            <div className="w-full lg:w-1/2 p-5 sm:p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="jobDescription" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  1. Target Job Description
                </label>
              </div>
              <textarea
                id="jobDescription"
                name="jobDescription"
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the requirements or description from the job posting..."
                className="w-full min-h-[280px] lg:h-full flex-1 resize-none rounded-lg border border-gray-700 bg-[#0f111a] p-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Right Box: Resume and Info Uploads (Takes 50% width on desktop) */}
            <div className="w-full lg:w-1/2 p-5 sm:p-6 flex flex-col gap-5">
              
              {/* Document Dropzone */}
              <div className="flex flex-col">
                <label htmlFor="resume" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  2. Upload Resume
                </label>
                <label
                  htmlFor="resume"
                  className="group flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-gray-700 bg-[#0f111a] p-4 transition hover:border-indigo-500"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-gray-800 text-gray-400 group-hover:text-indigo-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6M12 18v-6M9 15h6" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-gray-300">
                      {resumeName || 'Click to select files from your computer'}
                    </div>
                    <div className="text-xs text-gray-500">Supported format: PDF up to 5 MB</div>
                  </div>
                  <input
                    ref={resumeInputRef}
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResumeName(e.target.files?.[0]?.name || '')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Personal Notes Box */}
              <div className="flex flex-col flex-1">
                <label htmlFor="selfDescription" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  3. About Yourself
                </label>
                <textarea
                  id="selfDescription"
                  name="selfDescription"
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Share a brief overview of your background, experience level, or direct goals for this search..."
                  className="w-full min-h-[120px] flex-1 resize-none rounded-lg border border-gray-700 bg-[#0f111a] p-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-indigo-500"
                />
              </div>

              {/* Informative Label Tip */}
              <div className="flex items-start gap-2 rounded-lg bg-indigo-950/30 border border-indigo-900/40 p-3 text-xs text-indigo-300/90 leading-relaxed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                </svg>
                <span>Providing a solid self-description gives deeper, specific context for matching your skills accurately.</span>
              </div>
            </div>
          </div>

          {/* Form Action Controls Footer */}
          <div className="flex flex-col gap-4 bg-[#11131f] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-gray-500">
              Your entries stay saved securely inside your active profile account.
            </span>
            <button
              onClick={handleGenerateReport}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Generating report...</span>
                </>
              ) : (
                <>
                  <span>Create Interview Report</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Historical Submissions History Section */}
        <section className="mt-12 w-full pb-12">
          <div className="mb-4 flex items-end justify-between border-b border-gray-800 pb-2">
            <div>
              <h2 className="text-lg font-bold text-white">Your Saved Dashboard Reports</h2>
              <p className="text-xs text-gray-400">Revisit files you built previously.</p>
            </div>
            {reports && reports.length > 0 && (
              <span className="text-xs text-gray-500 tracking-wider font-medium">{reports.length} saved reports</span>
            )}
          </div>

          {reports && reports.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gray-800 bg-[#161925] p-4 hover:border-gray-700 transition"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-gray-200">
                      {report.title || 'Untitled Role Submission'}
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/interview/${report._id}`)}
                    className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-lg border border-gray-700 bg-[#0f111a] px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white hover:border-indigo-500 transition"
                  >
                    <span>View Report</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-800 bg-[#161925]/50 p-8 text-center">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                No history entries saved to this workspace yet. Complete the form above to generate your initial record file.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Home