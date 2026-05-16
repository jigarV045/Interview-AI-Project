import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, handleRegister } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !email || !password) {
      toast.error('Please fill out all fields')
      return
    }
    const success = await handleRegister({ username, email, password })
    if (success) {
      navigate('/login')
      toast.success('Registration successful! Login first to access your dashboard.')
    } else {
      toast.error('Registration failed')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0f111a] text-white">
        <div className="relative flex items-center justify-center h-12 w-12 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-sm text-gray-400">Creating your workspace...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-[#0f111a] text-gray-200 flex items-center justify-center p-4">
      
      {/* Main Card Container (Flexbox) */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden rounded-xl border border-gray-800 bg-[#161925] shadow-xl">
        
        {/* Left Side: Features Intro (Hidden on mobile) */}
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
              Create your account.
            </h2>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Sign up today to start checking your resume against any job description, pinpointing skills to improve, and reviewing practice interview questions.
            </p>
          </div>

          {/* Quick Perks List */}
          <div className="mt-6 space-y-3">
            {[
              { title: 'Custom Reports', desc: 'Detailed skill gap breakdown' },
              { title: 'Tailored Questions', desc: 'Based directly on the job post' },
              { title: 'Resume Updates', desc: 'Download a targeted version' }
            ].map((perk) => (
              <div key={perk.title} className="flex items-start gap-3 rounded-lg border border-gray-800 bg-[#11131f] p-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-indigo-600/20 text-indigo-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{perk.title}</div>
                  <div className="text-[11px] text-gray-400">{perk.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full lg:w-3/5 p-8 sm:p-10 flex flex-col justify-center">
          {/* Logo for mobile screens only */}
          <div className="lg:hidden mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">iA</div>
            <span className="text-base font-semibold text-white">InterviewAI</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">Get Started</h1>
            <p className="text-sm text-gray-400 mt-1">Fill out your details below to set up your profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                placeholder="johndoe"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0f111a] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-indigo-500"
              />
            </div>

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
              <label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="At least 8 characters"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-[#0f111a] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition active:scale-[0.98]"
            >
              Create Account
            </button>

            {/* Terms Statement */}
            <p className="text-center text-xs text-gray-500 pt-1">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-gray-400 hover:underline">Terms</a> and{' '}
              <a href="#" className="text-gray-400 hover:underline">Privacy Policy</a>.
            </p>

            {/* Bottom Link */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </form>
        </div>

      </div>
    </main>
  )
}

export default Register