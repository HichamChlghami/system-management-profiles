
'use client'

import React, { useContext, useState } from "react";
import "./sginup.css";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { Context } from "../context/context";
import Navbar from '../navbar/Navbar';

function Sginup() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameValidation, setNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState(false); // New state for email exists error
  const [passValidation, setPassValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { dispatch } = useContext(Context);

  const handleValidation = () => {
    if (name.trim() === "") {
      setNameValidation(true);

      return false;
    } else if (email.trim() === "") {
      setEmailValidation(true);

      return false;
    } else if (password.trim() === "") {
      setPassValidation(true);

      return false;
    }
    return true;
  };

  const checkEmailExists = async (email) => {
    try {

      const response = await axios.post(`${apiUrl}/users/check-email`, { email });
      return response.data.exists;
    } catch (error) {
      console.log("Error checking email:", error);
      return false;
    }
  };

  const handlesubmit = async (e) => {
    // setSubmitted(true);

    e.preventDefault();

    const isValid = handleValidation();
    if (isValid && !submitted) {
      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        setEmailExistsError(true); // Set error if email already exists
        return;
      }

      try {
        const userData = {
          fullname: name,
          email: email,
          password: password,
          payer:false,
          subscriber:false,

        };
        await axios.post(`${apiUrl}/users`, userData);
    setSubmitted(true);

        dispatch({ type: "LOGIN_SUCCESS_USER", name: name  , email:email});
        window.location.href = '/pricing';
      } catch (err) {
        console.log(err.name, err);
      }
    }
  };

  return (
    <div className="sginup">
      <Navbar />
      <h1 className="signup_title">Register New Account</h1>
      <form className="card" onSubmit={handlesubmit}>
        <div className="card-sginup">
          <div className="fullName">
            <label htmlFor="name"> Name</label>
            <input
              type="text"
              id="name"
              value={name}
              name="name"
              className="input"
              onChange={(e) => setName(e.target.value)}
            />
            {nameValidation && <p className="novalidation">Please enter your full name.</p>}
          </div>

          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailExistsError(false); // Reset the email exists error
              }}
            />
            {emailValidation && <p className="novalidation">Please enter your email.</p>}
            {emailExistsError && <p className="novalidation">This email is already registered.</p>}
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <div className="eye">
              <input
                type={visible ? "text" : "password"}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
            {passValidation && <p className="novalidation">Please enter your password.</p>}
          </div>
        </div>
        <button className={`signup-button${submitted ? ' submitted' : ''}`} disabled={submitted}>
          {submitted ? 'Submitted' : 'Submit'}
        </button>
        <div className="sgin-in">
          <p>Have an account?<Link href='/logIn' className="sgin-in-url">Sign in</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Sginup;
