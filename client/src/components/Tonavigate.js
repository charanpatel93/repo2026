import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

function Tonavigate() {
   let userDetails=useSelector((store)=>{
    return store.userDetails
  });
 let navigate= useNavigate()
  useEffect(()=>{
    if(userDetails && userDetails.email){

    }else{
   navigate('/')
    }
  },[])

  return (
    <div className='salaarsahoo'>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/activities'>Activities</Link>
      <Link to='/tasks'>Tasks</Link>
      <Link to='/'>Logout</Link>
    </div>
  )
}

export default Tonavigate
