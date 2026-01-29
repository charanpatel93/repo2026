import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let emairef=useRef();
    let pasref=useRef();
    let navigate=useNavigate();
    let dispatch =useDispatch()
   
useEffect(() => {
  const cridentials = async () => {
    let token = localStorage.getItem("token");

    if (!token) return;

    let storee = new FormData();
    storee.append("token", token);

    let JSONData = await fetch(
      "http://localhost:9595/validate",
      {
        method: "POST",
        body: storee,
      }
    );

    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);

    if (JSOData.status === "success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    }
  };

  cridentials();
}, [dispatch, navigate]);
   let sendinggg=async()=>{
    let storee=new FormData();
       storee.append("email",emairef.current.value);
        storee.append("password",pasref.current.value);

    let reqOperationss={
        method:"POST",
        body:storee
    }
   let JSONData=await fetch("http://localhost:9595/login",reqOperationss)
   let JSOData=await JSONData.json()
   console.log(JSOData)
   alert(JSOData.msg)

   if(JSOData.status=== "success"){
    localStorage.setItem("token",JSOData.data.token)
    
    dispatch({type:"login",data:JSOData.data})
    navigate("/dashboard")
   }
}

  return (
    <div>
      <form>
        <div>
            <label>Email</label>
            <input ref={emairef}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={pasref}></input>
        </div>
        <div>
            <button type='button' onClick={()=>{
              sendinggg()
            }}>Login</button>
        </div>
      </form>
      <div>
      <Link to='/signup'>signup</Link>
      </div>
    </div>
  )
}

export default Login
