import React, { useContext, useState } from 'react'
import { dataContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
  let [shortenUrl,setshortenUrl] = useState(null)
  let [shortCode,setshortCode] = useState(null)
  let [generatedUrl, setGeneratedUrl] = useState(null)

  let {userData,setUserData,getUserData,serverUrl}=useContext(dataContext)
  let navigate=useNavigate()
  if(!userData){
    navigate("/")
  }
  const handleLogOut=async()=>{
    try {
      let data = await axios.post(serverUrl + "/api/logout",{},{withCredentials:true})
      setUserData(null)
    } catch (error) {
      console.log(error);
    }
  }
 const handleSubmit = async(e)=>{
   e.preventDefault();
try {
  let res= await axios.post(serverUrl + "/api/shorten",{
    shortenUrl,
    shortCode,
  })
  setGeneratedUrl(res.data.shorturl)
  console.log(res)
} catch (error) {
  console.log(error)

}
 }

  return (
    <div className="min-h-screen bg-[#030B3F] relative overflow-hidden py-8 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#02063b] via-[#081c73] to-[#12003d]" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Dashboard
          </h1>

          <button
            onClick={handleLogOut}
            className="px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-lg shadow-purple-500/40 hover:scale-105 transition-all duration-300"
          >
            Log Out
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 mb-8 shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.6)]">
              <img
                src={userData.profileImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-5xl font-bold text-white">
                Welcome back,
                <span className="text-cyan-400 ml-2">
                  {userData.firstName}
                </span>
                👋
              </h2>

              <p className="text-gray-300 text-xl mt-2">
                Ready to shorten some URLs? 🚀
              </p>
            </div>
          </div>
        </div>

        {/* URL Shortener */}
        <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10 shadow-2xl shadow-purple-500/20">
          <h3 className="text-4xl font-bold text-white mb-8">
            URL Shortener
          </h3>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 font-medium mb-3">
                Paste your long URL
              </label>

              <input
                type="url"
                value={shortenUrl}
                onChange={(e) => setshortenUrl(e.target.value)}
                placeholder="https://example.com/very/long/url"
                required
                className="w-full h-16 bg-white/5 border border-white/20 rounded-xl px-5 text-gray-200 placeholder:text-gray-500 outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full h-16 rounded-xl font-bold text-xl text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300"
            >
              Shorten URL
            </button>
          </form>

          {/* Generated URL */}
          {generatedUrl && (
            <div className="mt-8 bg-white/5 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6">
              <p className="text-green-400 font-semibold mb-3">
                ✓ Your Short URL Generated
              </p>

              <div className="flex gap-3">
                <div className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 font-mono break-all hover:text-cyan-200"
                  >
                    {generatedUrl}
                  </a>
                </div>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(generatedUrl)
                  }
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 transition-all duration-300"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white/5 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-6 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-3">
              ⚡
            </div>

            <h4 className="text-xl font-bold text-yellow-300 mb-2">
              Quick
            </h4>

            <p className="text-gray-300">
              Shorten in a snap
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-purple-400/20 rounded-3xl p-6 hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-3">
              🔒
            </div>

            <h4 className="text-xl font-bold text-purple-300 mb-2">
              Secure
            </h4>

            <p className="text-gray-300">
              Your links are safe
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
