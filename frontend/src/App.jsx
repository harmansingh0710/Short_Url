import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { dataContext } from './Context/UserContext'
import Login from './pages/Login'

function App() {
  let {userData,setUserData}=useContext(dataContext)
  return (
    <Routes>
      <Route path='/signup' element = {<Signup />}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/' element = {userData?<Home />:<Login/>}/>
    </Routes>
  )
}

export default App
