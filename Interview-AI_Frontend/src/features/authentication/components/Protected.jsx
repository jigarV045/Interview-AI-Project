import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router';

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  // Keep this active so user sessions don't break on page refresh!
  if (loading) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0f111a] text-white">
        <div className="relative flex items-center justify-center h-12 w-12 mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-sm text-gray-400">Verifying session...</p>
      </main>
    )
  }

  // If loading is done and there's still no user, send them to login
  if (!user) {
    return <Navigate to="/login" />
  }

  // If loading is done and user exists, render the protected page safely
  return children
}

export default Protected