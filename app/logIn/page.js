
"use client"

import React, { useContext, useState } from "react";
import "../sginUp/sginup.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import axios from "axios"; // Import axios here if it's not already imported
import { Context } from "../context/context";
import './logIn.css'
import '../sginUp/sginup.css'
import Navbar from '../navbar/Navbar'
                                                                                                 

function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { dispatch } = useContext(Context);
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    setSubmitted(true);
    e.preventDefault();
  
    // Reset previous error messages
    setEmailError("");
    setPasswordError("");
  
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
  
      // Access user details from the response
      const user = response.data.user;
 if(user.subscriber != 'false'){
  
  dispatch({ type: "LOGIN_SUCCESS_SUBSCRIBER", name:user.name , email:user.email , subscriber:user.subscriber });

 }
  else if (user.payer === true){
    dispatch({ type: "LOGIN_SUCCESS_PAYER", name:user.name , email:user.email  });

  }else{
    dispatch({ type: "LOGIN_SUCCESS_USER", name:user.name , email:user.email  });
    await axios.post(`${apiUrl}/users/update-payer`, {
      email: email,  // Use email from context
    });

    // Dispatch login success action
    dispatch({ type: "LOGIN_SUCCESS_PAYER" });

    localStorage.setItem('payerUpdated', 'true');

    // window.location.href = '/';

  }
      // Redirect to home page or user dashboard
      window.location.href = '/';
  
    } catch (err) {
      console.log(err.message, 'Error during login');
      setSubmitted(false);
  
      const errorResponse = err.response?.data;
      if (errorResponse?.error.includes("Email")) {
        setEmailError(errorResponse.error);
      } else if (errorResponse?.error.includes("password")) {
        setPasswordError(errorResponse.error);
      }
    }
  };
  
  return (
    <div className="login_page">
   <Navbar/>
      <h1 className="log_title">Login To Your Account</h1>
      <div className="card_login_page">
        <form className="card-login" onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="email">
            <label htmlFor="email" className="login_lable">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              // placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="novalidation">{emailError}</p>}
          </div>
          {/* Password input field */}
          <div className="password">
            <label htmlFor="password" className="login_lable">Password</label>
            <div className="eye">
              <input
                id="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={visible ? "text" : "password"}
              />
              {passwordError && <p className="novalidation">{passwordError}</p>}
              {visible ? (
                <AiOutlineEye
                  className="eye1"
                  size={17}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="eye1"
                  size={17}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>
          {/* <button type="submit">Submit</button> */}
          <button className={`signup-button${submitted ? ' submitted' : ''}`} 
      disabled={submitted} >
          {submitted ? 'Submitted' : 'Submit'}
        </button>
        </form>

        <div className="sgin-in">
          <p className="sgin-in-p">
            Don't have an account? <Link href="/sginUp" className="sign-up-url">Sign-up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


export default Login
