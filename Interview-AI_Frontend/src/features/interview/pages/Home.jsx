import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'

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
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0b14] text-white">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:28px_28px]" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-12">
        {/* Top brand row */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 font-bold text-slate-950">iA</div>
            <span className="text-lg font-semibold tracking-tight">InterviewAI</span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            AI report engine online
          </span>
        </div>

        {/* Hero */}
        <div className="mt-12 max-w-3xl text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-widest text-slate-400">
            New session
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Build your custom{' '}
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              interview plan
            </span>
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Let our AI analyze the role and your profile to generate a personalized prep strategy and a detailed performance report.
          </p>
        </div>

        {/* Main card */}
        <section className="mt-10 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-5 p-6 md:flex-row">
            {/* Left: JD */}
            <div className="flex flex-1 flex-col gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-5">
              <div className="flex items-center justify-between">
                <label htmlFor="jobDescription" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Target job description
                </label>
                <span className="text-[10px] tracking-widest text-slate-500">STEP 01</span>
              </div>
              <textarea
                id="jobDescription"
                name="jobDescription"
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here…"
                className="min-h-72 flex-1 resize-none rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white placeholder-slate-500 outline-none transition focus:border-indigo-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Right: Resume + Self */}
            <div className="flex flex-1 flex-col gap-5 rounded-xl border border-white/10 bg-slate-950/40 p-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="resume" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Upload resume
                  </label>
                  <span className="text-[10px] tracking-widest text-slate-500">STEP 02</span>
                </div>
                <label
                  htmlFor="resume"
                  className="group flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-4 transition hover:border-cyan-400/40 hover:bg-white/[0.04]"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-indigo-500/30 to-cyan-400/30 text-cyan-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6M12 18v-6M9 15h6" />
                    </svg>
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-medium text-slate-200">
                      {resumeName || 'Drop your PDF or click to browse'}
                    </div>
                    <div className="text-xs text-slate-500">PDF only · up to 5 MB</div>
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

              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="selfDescription" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Quick self description
                  </label>
                  <span className="text-[10px] tracking-widest text-slate-500">STEP 03</span>
                </div>
                <textarea
                  id="selfDescription"
                  name="selfDescription"
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="A few words about your background, strengths, and goals…"
                  className="min-h-32 flex-1 resize-none rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white placeholder-slate-500 outline-none transition focus:border-indigo-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs leading-5 text-cyan-100/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-cyan-300">
                  <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
                </svg>
                Pairing your resume with a self description produces a sharper, more personalized report.
              </div>
            </div>
          </div>

          {/* Footer action */}
          <div className="flex flex-col gap-4 border-t border-white/10 bg-black/30 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-[10px] font-bold text-slate-950">AI</span>
              Reports generated using your latest profile signals
            </div>
            <button
              onClick={handleGenerateReport}
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:from-indigo-400 hover:to-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                  Generating report…
                </>
              ) : (
                <>
                  Generate interview report
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Recent reports */}
        <section className="mt-12 w-full">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Recent reports</h2>
              <p className="text-sm text-slate-400">Pick up where you left off.</p>
            </div>
            {reports && reports.length > 0 && (
              <span className="text-xs text-slate-500">{reports.length} total</span>
            )}
          </div>

          {reports && reports.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-cyan-400/30 hover:bg-white/[0.04]"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-100">
                      {report.title || 'Untitled position'}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(report.createdAt).toLocaleString('en-GB')}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/interview/${report._id}`)}
                    className="ml-4 inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
                  >
                    View
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-0.5">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-400/30 text-cyan-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                </svg>
              </div>
              <p className="text-sm text-slate-400">
                No reports yet. Fill in the form above to generate your first one.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Home
