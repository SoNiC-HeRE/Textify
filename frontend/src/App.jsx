import { useState } from 'react'
import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser ? <Home/>: <Navigate to="/signup" />}/>
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp/>}/>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App