import React, { useState } from 'react'
import {Link, useNavigate} from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {loading, handleLogin} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({email, password})
    navigate("/")
  }

  if (loading) { 
    return (<main><h1>Loading....</h1></main>)
  }

  return (
    <main className='min-h-screen w-full flex justify-center items-center bg-gray-950 text-white'>
      <div className="flex flex-col gap-3 bg-gray-800 p-6 rounded-lg w-md">
        <h1 className='text-center text-3xl'>Login</h1>
        <form className='flex flex-col gap-3 text-lg' onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input 
          onChange={(e) => { setEmail(e.target.value) }}
          className='bg-gray-700 text-white px-4 py-2 rounded-lg border-none outline-none'
          type="email" name="email" placeholder='Enter Your Email' />

          <label htmlFor="password">Password</label>
          <input
          onChange={(e) => { setPassword(e.target.value) }}
          className='bg-gray-700 text-white px-4 py-2 rounded-lg border-none outline-none'
          type="password" name="password" placeholder='Enter Your Password' />

          <p className='text-gray-300'>Don't have an account ? <Link className='text-blue-400 mr-0' to={"/register"}>Register</Link></p>
          <button className='bg-blue-600 px-4 py-2 rounded-lg cursor-pointer'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login