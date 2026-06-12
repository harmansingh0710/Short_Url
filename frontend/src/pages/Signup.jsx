import React, { useContext, useRef, useState } from 'react'
import dp from '../assets/dp.png'
import axios from 'axios';
import { dataContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
function Signup() {
  let navigate = useNavigate();
  const {serverUrl,userData,setUserData,getUserdata} = useContext(dataContext);
  let [firstName, setFirstName] = useState(null);
  let [lastName, setLastName] = useState(null);
  let [userName, setUserName] = useState(null);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  let [showPassword, setShowPassword] = useState(false);
  let file = useRef(null)
  
  const handleSingnup = async(e)=>{
    e.preventDefault();
    try {
      let formdata = new FormData()
      formdata.append("firstName",firstName)
      formdata.append("lastName",lastName)
      formdata.append("userName",userName)
      formdata.append("email",email)
      formdata.append("password",password)
      if(backendImage){
        formdata.append("profileImage",backendImage)
      }
      let {data} = await axios.post(serverUrl + "/api/signup",formdata,{withCredentials:true,headers: {"Content-Type":"multipart/form-data"}
      })
      console.log(data)
      setUserData(data.user)
      await getUserdata()
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  
  let [frontendImage,setFrontendImage]=useState(dp)
  let [backendImage,setBackendImage]=useState(null)
  
  function handleImage(e){
    let file = e.target.files[0]
    setBackendImage(file)
    let image = URL.createObjectURL(file)
    setFrontendImage(image)
  }
  
  return (
    <div className="min-h-screen bg-[#030B3F] relative overflow-hidden py-8 px-4 flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#02063b] via-[#081c73] to-[#12003d]" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full" />

      <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border-2 border-cyan-400/30 rounded-3xl p-12 shadow-2xl shadow-purple-500/20">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Join Us
          </h1>
          <p className="text-gray-300 text-lg">
            Create your account today
          </p>
        </div>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-10">
          <input type="file" hidden ref={file} onChange={handleImage}/>
          <div className="relative group cursor-pointer" onClick={()=>{file.current.click()}}>
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 overflow-hidden border-4 border-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.8)] group-hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] transition-all duration-300">
              <img src={frontendImage} alt="profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-4xl font-bold transition-all duration-300">
              +
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSingnup}>
          
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-2">First Name</label>
              <input 
                type="text" 
                placeholder="John" 
                className="w-full h-14 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-gray-200 placeholder:text-gray-500 outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                value={firstName} 
                onChange={(e)=>setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Last Name</label>
              <input 
                type="text" 
                placeholder="Doe" 
                className="w-full h-14 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-gray-200 placeholder:text-gray-500 outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                value={lastName} 
                onChange={(e)=>setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Username</label>
            <input 
              type="text" 
              placeholder="Choose a unique username" 
              className="w-full h-14 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-gray-200 placeholder:text-gray-500 outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
              value={userName} 
              onChange={(e)=>setUserName(e.target.value)}
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="w-full h-14 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-gray-200 placeholder:text-gray-500 outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a strong password" 
                className="w-full h-14 bg-white/5 border border-white/20 rounded-xl px-4 py-3 pr-12 text-gray-200 placeholder:text-gray-500 outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button 
            type="submit"
            className="w-full h-16 bg-gradient-to-r from-cyan-400 via-purple-500 to-magenta-500 rounded-2xl text-white font-bold text-lg mt-4 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
          >
            Create Account
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-3 text-gray-400">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-300">
            Already have an account? 
            <span 
              className="text-cyan-400 cursor-pointer font-semibold ml-2 hover:text-cyan-300 transition-colors" 
              onClick={()=>navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
