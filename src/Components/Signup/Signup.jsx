import React, { useEffect } from "react"
import './Signup.css'
import video from "../../Assets/video3.mp4";
import { BiUserCircle } from 'react-icons/bi'
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiOutlineFileDone } from 'react-icons/ai'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import DOMPurify from 'dompurify';

const Signup = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [birthday, setbirthday] = useState("");
  const userRoles = ['user'];

  const [emailError, setEmailError] = useState('');
  let navigate = useNavigate();

  const register = async () => {
    try {
      const regex = /[a-zA-Z0-9]+@ac.sce.ac.il/g
      if (!regex.test(registerEmail)) {
        throw new Error('You must enter SCE email!');
      }
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
      await setDoc(doc(db, "users", user.user.uid), {
        email: registerEmail,
        FirstName: FirstName,
        LastName: LastName,
        birthday: birthday,
        timeStamp: serverTimestamp(),
        userRoles,
        reservations: [],
        card: [],
      });
      const UserRef = doc(db, "users", user.user.uid);
      const data = await getDoc(UserRef);
      localStorage.setItem("user", JSON.stringify(data.data()));
      setTimeout(() => {
        navigate("/");
      }, 2000);
      window.location.reload(false);
      setEmailError('');
    } catch (error) {
      console.log(error.message);

      if (error.code === 'auth/email-already-in-use') {
        setEmailError('This email is already in use. Please try another email.');
        setTimeout(() => {
          setEmailError('');
        }, 5000);
      }
      else if (error.message === 'You must enter SCE email!') {
        setEmailError('You must enter SCE email!');
        setTimeout(() => {
          setEmailError('');
        }, 5000);
      }
      else if (error.code === 'auth/missing-password') {
        setEmailError('missing-password');
        setTimeout(() => {
          setEmailError('');
        }, 5000);
      }
      else {
        setEmailError('Something went wrong. Please try again.');
        setTimeout(() => {
          setEmailError('');
        }, 5000);
      }
    }

  };
  const renderEmailError = () => {
    if (emailError) {
      return (
        <div className="error-notification">
          <div className="error-bubble">
            {emailError}
          </div>
        </div>
      );
    }
    return null;
  };



  return (
    <section id='Sign-up' className='Sign-up'>
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted type="video/mp4"></video>

      <div data-aos="fade-down" className="Sign-upContent container">
        <div className="textDiv">
          <span className="smallText">
            Sign-up Page
          </span>
          <h1 data-aos="fade-down" className="Sign-upTitle">
            Create Account right now
          </h1>
        </div>

        <form data-aos="fade-down" className="cardDiv grid" onSubmit={register}>

          <div className="emailInput">
            <label htmlFor="emailName">Enter your email:</label>
            <div className="input flex">
              <input type="text" placeholder='Enter email here...' onChange={(event) => {
                setRegisterEmail(DOMPurify.sanitize(event.target.value));

              }} />
              <BiUserCircle className="icon" />
            </div>
          </div>

          <div className="PassWordInput">
            <label htmlFor="PassWord">Enter your password:</label>
            <div className="input flex">
              <input type="password" placeholder='Enter password here...' onChange={(event) => {
                setRegisterPassword(DOMPurify.sanitize(event.target.value));
              }} />
              <RiLockPasswordFill className="icon" />
            </div>
          </div>

          <div className="FnameInput">
            <label htmlFor="Fname">Enter your First name:</label>
            <div className="input flex">
              <input type="text" placeholder='Enter First name here...' onChange={(event) => {
                setFirstName(DOMPurify.sanitize(event.target.value));
              }} />
              <MdDriveFileRenameOutline className="icon" />
            </div>
          </div>

          <div className="LnameInput">
            <label htmlFor="Lname">Enter your Last name:</label>
            <div className="input flex">
              <input type="text" placeholder='Enter Last name here...' onChange={(event) => {
                setLastName(DOMPurify.sanitize(event.target.value));
              }} />
              <MdDriveFileRenameOutline className="icon" />
            </div>
          </div>

          <div className="dateInput">
            <label htmlFor="date">Select your birthday date :</label>
            <div className="input flex">
              <input type="date" onChange={(event) => {
                setbirthday(DOMPurify.sanitize(event.target.value));
              }} />
            </div>
          </div>
          {renderEmailError()}

          <div className="submit flex">
            <AiOutlineFileDone className="icon" />
            <span type="submit" onClick={register} >Submit</span>
          </div>

        </form>
      </div>
    </section>
  )
}

export default Signup