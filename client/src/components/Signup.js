import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {
    let firstref=useRef();
    let lastref=useRef();
    let emailref=useRef();
    let passwordref=useRef();
    let ageref=useRef();
    let departmentref=useRef();
    let profileref=useRef();
    const apiURL = "https://repo2026-1.onrender.com";
    let [images,setimages]=useState("https://cutiedp.com/wp-content/uploads/2025/08/no-dp-image-1.webp");
  let userData=async()=>{
    let dataa=new FormData();
    dataa.append("firstname",firstref.current.value);
    dataa.append("lastname",lastref.current.value);
    dataa.append("email",emailref.current.value);
    dataa.append("password",passwordref.current.value);
    dataa.append("age",ageref.current.value);
    dataa.append("department",departmentref.current.value);
    dataa.append("profile",profileref.current.files[0]);
    
if (profileref.current.files.length > 0) {
  dataa.append("profile", profileref.current.files[0]);
}

   let reqOperation={
    method:"POST",
    body:dataa
   }

   let JSONData=await fetch(`${apiURL}/signup`,reqOperation)
   let JSOData=await JSONData.json()
   console.log(JSOData)
   alert(JSOData.msg)
  }

  return (
    <div>
      <form>
        <div>
            <label>First Name</label>
            <input ref={firstref}></input>
        </div>
        <div>
            <label>Last Name</label>
            <input ref={lastref}></input>
        </div>
        <div>
            <label>Email</label>
            <input ref={emailref}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordref}></input>
        </div>
        <div>
            <label>Age</label>
            <input ref={ageref}></input>
        </div>
        <div>
            <label>Department</label>
            <input ref={departmentref}></input>
        </div>
        <div>
            <label>Profile Picture</label>
            <input type='file' ref={profileref} onChange={(e)=>{
                let photo =URL.createObjectURL(profileref.current.files[0])
                setimages(photo)
            }}></input>
        </div>
        <div>
            <img src={images} className='profilephoto' alt="profile"></img>
        </div>
        <div>
            <button type='button' onClick={()=>{
                userData();
            }}>Submit</button>
        </div>
      </form>
      <div>
        <Link to='/'>Login</Link>
      </div>
    </div>
  )
}

export default Signup
