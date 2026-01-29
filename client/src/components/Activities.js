import React from 'react'
import Tonavigate from './Tonavigate'
import { useSelector } from 'react-redux'

function Activities() {
  let userDetails=useSelector((store)=>{
   return store.userDetails
  })
  return (
    <div>
        <Tonavigate></Tonavigate>
      <h1>Activities</h1>
      <h1>{userDetails.firstname}</h1>
    </div>
  )
}

export default Activities
