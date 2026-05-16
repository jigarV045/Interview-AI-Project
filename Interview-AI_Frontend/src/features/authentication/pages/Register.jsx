import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, handleRegister } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await handleRegister({ username, email, password })
    if (success) {
      navigate('/login')
    } else {
      alert('Registration failed. Please check your details and try again.')
      navigate('/register')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#0a0b14] text-white">
        <div className="flex items-center gap-3 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse [animation-delay:300ms]" />
          <span className="ml-2 tracking-wide">Setting up your interview workspace…</span>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0b14] text-white">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:28px_28px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* Left: product panel */}
          <div className="relative hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-cyan-500/15 via-slate-900/40 to-indigo-600/20 p-10 lg:flex">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950 font-bold">
                  iA
                </div>
                <span className="text-lg font-semibold tracking-tight">InterviewAI</span>
              </div>
              <h2 className="mt-10 text-3xl font-semibold leading-tight">
                Your AI interview coach,<br />
                <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  one signup away.
                </span>
              </h2>
              <p className="mt-3 max-w-sm text-sm text-slate-300/80">
                Create your account to run unlimited mock interviews and generate detailed performance reports tailored to your role.
              </p>
            </div>

            {/* What you get */}
            <div className="mt-10 space-y-3">
              {[
                ['Unlimited mock sessions', 'Voice & text, any role'],
                ['Detailed AI reports', 'Scored on 6 dimensions'],
                ['Personalized drills', 'Target your weak spots'],
              ].map(([title, sub]) => (
                <div key={title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-indigo-500/30 to-cyan-400/30 text-cyan-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{title}</div>
                    <div className="text-xs text-slate-400">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 sm:p-12">
            <div className="lg:hidden mb-8 flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950 font-bold">iA</div>
              <span className="text-lg font-semibold">InterviewAI</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-slate-400">Start practicing in minutes. No credit card required.</p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-xs font-medium uppercase tracking-wider text-slate-400">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="alex.candidate"
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-slate-400">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-slate-400">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="At least 8 characters"
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              <button
                type="submit"
                className="group relative mt-2 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:from-indigo-400 hover:to-cyan-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Create account
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              <p className="text-center text-xs text-slate-500">
                By creating an account, you agree to our{' '}
                <a className="text-slate-300 hover:text-cyan-300" href="#">Terms</a> and{' '}
                <a className="text-slate-300 hover:text-cyan-300" href="#">Privacy Policy</a>.
              </p>

              <div className="my-1 flex items-center gap-3 text-xs text-slate-500">
                <span className="h-px flex-1 bg-white/10" />
                <span>or</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register
