// src/components/Navbar.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { handleLogout } = useAuth() // Assuming your useAuth hook has a logout function
  const navigate = useNavigate()

  const onLogout = async () => {
    // If your handleLogout is async, await it, then redirect to landing page
    if (handleLogout) {
      await handleLogout()
    }
    navigate('/')
  }

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-800 bg-[#161925] px-4 sm:px-6 py-3 shrink-0">
      {/* Clickable Brand Logo - Sends logged-in users back to dashboard */}
      <Link to="/dashboard" className="flex items-center gap-2 group">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm transition group-hover:bg-indigo-500">
          iA
        </div>
        <span className="text-base font-semibold text-white tracking-tight">InterviewAI</span>
      </Link>

      {/* Right Side: Navigation Actions */}
      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard" 
          className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition"
        >
          Dashboard
        </Link>
        
        <button
          onClick={onLogout}
          className="rounded-lg border border-gray-700 bg-[#0f111a] px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-400 hover:text-red-400 hover:border-red-900/50 transition"
        >
          Sign Out
        </button>
      </div>
    </header>
  )
}

export default Navbar