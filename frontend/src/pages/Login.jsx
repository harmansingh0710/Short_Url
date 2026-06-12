import axios from "axios";
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { dataContext } from "../Context/UserContext";
import loginImg from "../assets/login.png"
function Login() { 
let navigate = useNavigate();
let   {serverUrl,userData,setUserData,getUserdata}= useContext(dataContext)
  let [email,setEmail]=useState(null);
  let [password,setPassword]=useState(null)
 const handleLogin=async(e)=>{
  e.preventDefault();
  try {
    let {data} = await axios.post(serverUrl + "/api/login",{
      email,
      password,
    },{withCredentials:true})
    console.log(data)
    setUserData(data.user)
     await getUserdata()
     if(userData){

     navigate("/")

     }
  } catch (error) {

  alert(error.response.data.message)
  }
 }
  return (
    <div 
      className='w-full h-[100vh] flex justify-center items-center'
      style={{
        backgroundImage: `url(${loginImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-black/60 to-blue-900/50'></div>
      
      <div className='relative z-10 w-[90%] max-w-[450px] bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>Welcome Back</h1>
          <p className='text-blue-200'>Sign in to your account</p>
        </div>

        {/* Form */}
        <form className='flex flex-col gap-5' onSubmit={handleLogin}>
          {/* Email Input */}
          <div className='relative'>
            <label className='block text-sm font-semibold text-blue-100 mb-2'>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full h-[50px] bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200/60 outline-none transition-all duration-300 focus:border-blue-400 focus:bg-white/20 focus:shadow-lg"
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}
            /> 
          </div>

          {/* Password Input */}
          <div className='relative'>
            <label className='block text-sm font-semibold text-blue-100 mb-2'>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full h-[50px] bg-white/10 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-200/60 outline-none transition-all duration-300 focus:border-blue-400 focus:bg-white/20 focus:shadow-lg"
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className='w-full h-[50px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-bold text-lg mt-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95'
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-6'>
          <div className='flex-1 h-px bg-white/20'></div>
          <span className='px-3 text-blue-200 text-sm'>OR</span>
          <div className='flex-1 h-px bg-white/20'></div>
        </div>

        {/* Signup Link */}
        <div className='text-center'>
          <p className='text-blue-100'>
            Don't have an account? 
            <span 
              className="text-cyan-300 cursor-pointer font-semibold ml-1 hover:text-cyan-200 transition-colors" 
              onClick={()=>navigate("/signup")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
