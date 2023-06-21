import React, { useEffect } from 'react'
import './Signin.css'
import video from "../../Assets/video3.mp4";
import { BiUserCircle } from 'react-icons/bi'
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiOutlineFileDone } from 'react-icons/ai'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { useState } from "react";
import {
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "../../firebase-config";

import { useRef } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from "firebase/auth";



const Signin = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  const snackbarRef = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

    let navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
        );
        const UserRef = doc(db, "users", user.user.uid);
        const data = await getDoc(UserRef);
        localStorage.setItem("user", JSON.stringify(data.data()));
        setTimeout(() => {
          navigate("/");
        }, 2000);
        window.location.reload(false);
        setErrorMessage('');
    } catch (error) {
        console.log(error.message);
        setErrorMessage('Email/Password is wrong.');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
        snackbarRef.current.show();
    }
    };
    const forgotPassword = async () => {
      try {
        await sendPasswordResetEmail(auth, loginEmail);
        alert("Password reset email sent. Please check your inbox.");
      } catch (error) {
        console.log(error.message);
        alert("Error something went wrong please try again." + error.message);
        snackbarRef.current.show();
      }
    };
    const renderErrorMessage = () => {
      if (errorMessage) {
        return (
          <div className="error-notification">
            <div className="error-bubble">
              {errorMessage}
            </div>
          </div>
        );
      }
      return null;
    };

  return (
    <section id='Sign-in' className='Sign-in'>
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted type="video/mp4"></video>

      <div data-aos="fade-down" className="Sign-inContent container">
        <div className="textDiv">

        <span  className="smallText">
        Sign-in Page
        </span>
        <h1 data-aos="fade-down" className="Sign-inTitle">
        Sign in
        </h1>
        </div>

        <form data-aos="fade-down" className="cardDiv grid" onSubmit={login}>

          <div className="emailInput">
            <label htmlFor="emailName">Enter your email:</label>
            <div className="input flex">
              <input type="text" placeholder='Enter email here...' onChange={(event) => {
                setLoginEmail(DOMPurify.sanitize(event.target.value));
              }} />
              <BiUserCircle className="icon" />
            </div>
          </div>

          <div className="PassWordInput">
            <label htmlFor="PassWord">Enter your password:</label>
            <div className="input flex">
              <input type="password" placeholder='Enter password here...' onChange={(event) => {
                setLoginPassword(DOMPurify.sanitize(event.target.value));
              }} />
              <RiLockPasswordFill className="icon" />
            </div>
          </div>
          {renderErrorMessage()}
          <div className="submit flex">
           <AiOutlineFileDone className="icon"/>
           <span type="submit" onClick={login} >Submit</span><br/>
          </div>
          <div className="password-container">
           
            <span type="submit" className="forgot-password" onClick={forgotPassword}>Forgot Password</span>
          </div>


        </form>
      </div>
    </section>
  )
}

export default Signin