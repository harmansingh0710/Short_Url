import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const dataContext = createContext()

function UserContext({ children }) {
  let navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const serverUrl = "http://localhost:8000"

  const getUserdata = async () => {
    try {
      const { data } = await axios.get(
        serverUrl + "/api/getuserdata",
        { withCredentials: true }
      )
      setUserData(data)
    } catch (error) {
      navigate("/login")
      console.log( error.message)
    }
  }

  useEffect(() => {
    getUserdata()
  }, [])

  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserdata
  }

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext







// import axios from 'axios';
// import React, { createContext, useState } from 'react'
// export const dataContext = createContext();
// import { useEffect } from 'react';
// function UserContext({children}) {
// let [userData,setUserData]=useState({})
//     const serverUrl = "http://localhost:8000"
// const getUserdata=async()=>{
// try {
//     let {data} = await axios.get(serverUrl + "/api/getuserdata",{
//       withCredentials:true
//     })
//   setUserData(data)
// } catch (error) {
//   console.log({message:"internal server error"});
  
  
// }}
// const value = {

//   serverUrl, userData,setUserData,getUserdata
// }

// useEffect(()=>{
// getUserdata()

// },[])

//   return (
    
//         <dataContext.Provider value = {value}>   
//            {children}  
//     </dataContext.Provider>
  
//   )
// }

// export default UserContext;
