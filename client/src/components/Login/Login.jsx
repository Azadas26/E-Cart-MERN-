import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";


function  Login() {
const navigate = useNavigate();
const [email,seteamil] = useState('')
const [password,setPassword] = useState('')
const [valid,setValid] = useState(true)

const LoginSubmition = (e)=>
{
    e.preventDefault();
     axios.post('http://localhost:3001/login', {
        password:password,
        email:email
      }).then((res)=>
      {
        if(res.data.login)
        {
            navigate('/')
        }
        else
        {
           setValid(false)
           navigate('/login')
        }
      })
}
  return (
     <div id="login" className="container-fluid">
    <div className="row" >
        <div className="col-md-12">
            <form action="/admin/login" method="post" encType="multipart/form-data" onSubmit={LoginSubmition}>
                <h1 className="text-center" style={{fontWeight: "800",color: "rgb(38, 38, 37)"}}><b>Login Page</b>
                </h1>
                <div className="form-group">
                    {valid? "": <p style={{color:"red"}}>Invalid Usename or Pasword</p> }
                    <label className="" htmlFor="exampleInputEmail1">Email address</label>
                    <input name="email" type="email" className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Email" value={email} onChange={(e)=>{seteamil(e.target.value)}}/>

                </div>
                <div className="form-group">
                    <label className="" htmlFor="exampleInputPassword1">Password</label>
                    <input name="password" type="password" className="form-control" id="exampleInputPassword1"
                        placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-dark" style={{width:"100%"}}>Submit</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login