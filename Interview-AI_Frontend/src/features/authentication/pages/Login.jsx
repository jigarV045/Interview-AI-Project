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
      navigate('/dashboard')
    } 
  }

  if (loading) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0f111a] text-white">
        <div className="relative flex items-center justify-center h-12 w-12 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-sm text-gray-400">Loading your account...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-[#0f111a] text-gray-200 flex items-center justify-center p-4">
      
      {/* Main Card Container */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden rounded-xl border border-gray-800 bg-[#161925] shadow-xl">
        
        {/* Left Side: App Intro (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-2/5 flex-col justify-between bg-[#1a1d2c] p-8 border-r border-gray-800">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
                iA
              </div>
              <span className="text-base font-semibold text-white">InterviewAI</span>
            </div>
            
            <h2 className="mt-10 text-2xl font-bold text-white leading-tight">
              Prepare for your next interview.
            </h2>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Upload your resume, paste the job description, and get immediate feedback on your skill gaps and expected interview questions.
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="mt-6 rounded-lg border border-gray-800 bg-[#11131f] p-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Resume Match Score</span>
              <span className="text-emerald-400 font-medium">Good fit</span>
            </div>
            <div className="mt-2 text-3xl font-bold text-white">87%</div>
            
            {/* Simple Skill Bars */}
            <div className="mt-4 space-y-2">
              {[
                { name: 'Communication', width: '92%' },
                { name: 'Technical Skills', width: '84%' },
              ].map((skill) => (
                <div key={skill.name} className="text-xs">
                  <div className="flex justify-between text-gray-400 mb-1">
                    <span>{skill.name}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-800">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: skill.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-3/5 p-8 sm:p-10 flex flex-col justify-center">
          {/* Logo for mobile screens only */}
          <div className="lg:hidden mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">iA</div>
            <span className="text-base font-semibold text-white">InterviewAI</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-gray-400 mt-1">Sign in to your account to see your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0f111a] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                {/* <Link to="/forgot-password" className="text-xs text-indigo-400 hover:underline">
                  Forgot password?
                </Link> */}
              </div>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0f111a] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition active:scale-[0.98]"
            >
              Sign In
            </button>

            {/* Bottom Link */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-400 hover:underline font-medium">
                Register here
              </Link>
            </p>
          </form>
        </div>

      </div>
    </main>
  )
}

export default Login