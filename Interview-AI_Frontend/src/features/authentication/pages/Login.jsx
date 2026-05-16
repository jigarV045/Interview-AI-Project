import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await handleLogin({ email, password })
    if (success) {
      navigate('/')
    } else {
      alert('Login failed. Please check your credentials and try again.')
      navigate('/login')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#0a0b14] text-white">
        <div className="flex items-center gap-3 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse [animation-delay:300ms]" />
          <span className="ml-2 tracking-wide">Preparing your interview workspace…</span>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0b14] text-white">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:28px_28px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* Left: product panel */}
          <div className="relative hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-indigo-600/20 via-slate-900/40 to-cyan-500/10 p-10 lg:flex">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950 font-bold">
                  iA
                </div>
                <span className="text-lg font-semibold tracking-tight">InterviewAI</span>
              </div>
              <h2 className="mt-10 text-3xl font-semibold leading-tight">
                Ace your next interview.<br />
                <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  Get the report to prove it.
                </span>
              </h2>
              <p className="mt-3 max-w-sm text-sm text-slate-300/80">
                Run AI-led mock interviews and receive a detailed performance report — clarity, confidence, technical depth, and next steps.
              </p>
            </div>

            {/* Mini report preview */}
            <div className="mt-10 rounded-xl border border-white/10 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-slate-400">Latest report</span>
                <span className="text-xs text-emerald-400">+12% vs last</span>
              </div>
              <div className="mt-3 flex items-end gap-4">
                <div className="text-4xl font-semibold">87<span className="text-base text-slate-400">/100</span></div>
                {/* waveform */}
                <div className="flex h-10 flex-1 items-end gap-1">
                  {[6,12,8,18,14,22,10,28,16,24,12,30,18,14,22,10,16,8].map((h,i) => (
                    <span key={i} style={{ height: `${h*2}px` }} className="w-1 rounded-sm bg-gradient-to-t from-indigo-500 to-cyan-400" />
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-2 text-xs text-slate-300">
                {[
                  ['Communication', 92],
                  ['Technical', 84],
                  ['Problem solving', 81],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className="w-28 text-slate-400">{k}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${v}%` }} />
                    </div>
                    <span className="w-8 text-right tabular-nums">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 sm:p-12">
            <div className="lg:hidden mb-8 flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950 font-bold">iA</div>
              <span className="text-lg font-semibold">InterviewAI</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-400">Sign in to continue your interview prep and pick up your latest report.</p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-slate-400">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-slate-400">Password</label>
                  <Link to="/forgot-password" className="text-xs text-slate-400 hover:text-cyan-300">Forgot?</Link>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                className="group relative mt-2 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:from-indigo-400 hover:to-cyan-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start session
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              <div className="my-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="h-px flex-1 bg-white/10" />
                <span>or</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <p className="text-center text-sm text-slate-400">
                New to InterviewAI?{' '}
                <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
