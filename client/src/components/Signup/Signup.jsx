import React, { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

import "./Signup.css";
import Login from "../../pages/Login";

function Signup() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const LoginSubmition = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup', {
        name:userName,
        password:password,
        email:email
      }).then((res)=>
      {
       
        navigate('/login')
      })
  };
  return (
    <div id="signup" className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <form
            action="/admin/login"
            method="post"
            encType="multipart/form-data"
            onSubmit={LoginSubmition}
          >
            <h1
              className="text-center"
              style={{ fontWeight: "800", color: "rgb(38, 38, 37)" }}
            >
              <b>Login Page</b>
            </h1>
            <div className="form-group">
              <label className="" htmlFor="exampleInputEmail1">
                User Name
              </label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="exampleInputuser1"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={userName}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="" htmlFor="exampleInputEmail1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="" htmlFor="exampleInputPassword1">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
