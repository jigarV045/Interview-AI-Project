import React from 'react'
import { Link } from 'react-router'

const Landing = () => {
  return (
    <main className="min-h-screen w-full bg-[#0f111a] text-gray-200 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-5xl flex-1 flex flex-col justify-between">
        
        {/* 1. Header Navigation Bar */}
        <header className="flex w-full items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
              iA
            </div>
            <span className="text-base font-semibold text-white">InterviewAI</span>
          </div>
          <Link 
            to="/login" 
            className="rounded-lg border border-gray-700 bg-[#161925] px-4 py-1.5 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:border-indigo-500 transition"
          >
            Sign In
          </Link>
        </header>

        {/* 2. Hero Action Block */}
        <section className="my-16 text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-950/40 border border-indigo-900 px-3 py-1 text-xs text-indigo-400 font-medium">
            Smart Interview Preparation
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mt-4 leading-tight">
            Match your resume to any job posting instantly.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl">
            Upload your profile and paste any job description. Our system identifies critical target technical gaps, tracks your core fit metrics, and generates custom preparation plans.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition active:scale-[0.98]"
            >
              <span>Create Free Account</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* 3. Three-Step Process Grid (Using Flexbox) */}
        <section className="w-full border-t border-b border-gray-800/60 py-10 my-4">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8">How it works</p>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {[
              { num: '01', title: 'Drop Job Details', desc: 'Paste the requirements or technical specs directly from the active opening description.' },
              { num: '02', title: 'Provide Profile Info', desc: 'Upload your current resume in PDF format and include a brief personal introduction summary.' },
              { num: '03', title: 'Study Your Report', desc: 'Review curated behavioral items, analyze identified skill gaps, and access targeted questions.' }
            ].map((step) => (
              <div key={step.num} className="flex-1 bg-[#161925] border border-gray-800 rounded-lg p-5 flex flex-col gap-2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-900 px-2 py-0.5 rounded self-start">
                  Step {step.num}
                </span>
                <h3 className="text-sm font-bold text-white mt-1">{step.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Secondary Features Core Grid */}
        <section className="my-12">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-[#161925] border border-gray-800 rounded-xl p-6 sm:p-8">
            <div className="flex-1 space-y-3">
              <h2 className="text-lg font-bold text-white">Bridge the gap before the real meeting.</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Our application highlights alignment issues dynamically. Rather than flying blind, you receive clear visibility over what managers look for in technical rounds, combined with clean roadmap steps to update your vocabulary.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 w-full md:w-64 shrink-0 bg-[#0f111a] border border-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center text-[11px] text-gray-400">
                <span>ATS Engine Check</span>
                <span className="text-emerald-400 font-medium">87% Match</span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full w-[87%]" />
              </div>
              <p className="text-[10px] text-gray-500 leading-normal">Candidate demonstrates strong functional baseline across node stacks.</p>
            </div>
          </div>
        </section>

        {/* 5. Clean Footer Area */}
        <footer className="border-t border-gray-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition">Terms</a>
            <a href="#" className="hover:text-gray-300 transition">Privacy</a>
          </div>
        </footer>

      </div>
    </main>
  )
}

export default Landing