import React from 'react'
import Tonavigate from './Tonavigate'
import { useSelector } from 'react-redux'

function Dashboard() {
    let userDetails=useSelector((store)=>{
        return store.userDetails
    });
    console.log(userDetails);
  return (
    <div>
        <Tonavigate></Tonavigate>
      <h1>Dashboard</h1>
      <h1>{userDetails.firstname} {userDetails.lastname}</h1>
      <img className='dashboardimage' src={`http://localhost:9595/Profilepics/${userDetails.profile}`} alt="Users"></img>
    </div>
  )
}

export default Dashboard
