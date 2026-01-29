import React from 'react'
import Tonavigate from './Tonavigate'
import { useSelector } from 'react-redux'

function Tasks() {
   let userDetails=useSelector((store)=>{
    return store.userDetails
    })
  return (
    <div>
   <Tonavigate></Tonavigate>
      <h1>Tasks</h1>
      <h1>{userDetails.firstname}</h1>
      <img className='dashboardimage' src={`http://localhost:9595/Profilepics/${userDetails.profile}`}></img>
    </div>
  )
}

export default Tasks
