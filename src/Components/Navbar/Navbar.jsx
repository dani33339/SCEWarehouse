import './Navbar.css'
import React from "react";
import { ReactComponent as SCEicon } from "../../Assets/SCEicon.svg";
import {Link} from 'react-router-dom'
import { AiFillCloseCircle } from "react-icons/ai"
import { TbGridDots } from "react-icons/tb"
import { useEffect, useState } from 'react';
import { fetchUserData } from '../../utils/fetchLocalStorageData';
import { auth } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    signOut
  } from "firebase/auth";


const Navbar = () => {
    const [active, setActive] = useState('navBar')

    //function to toggle navbar
    const showNav = () => {
        setActive('navBar activeNavbar')
    }

    //function to remove navbar
    const removeNavbar = () => {
        setActive('navBar')
    }

    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const data = await fetchUserData();
                    setUserData(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [user]);

    const logout = async () => {
        await signOut(auth);
        localStorage.clear();
        window.location.reload(false);
    };

    return (
        <section id="Navbar" className="Navbar">
          <header className="header flex">
            <div className="logoDiv">
              <Link to="/" className="logo">
                <h1>
                  <SCEicon className="icon" data-testid="logo" />
                  <span className="logo-text"> Warehouse.</span>
                </h1>
              </Link>
            </div>
            <div className={active}>
              <ul onClick={removeNavbar} className="navLists flex">
                <li className="navItem">
                  <a href="/" className="navLink">Home</a>
                </li>
      
                {user && userData && userData.userRoles.includes('admin') && (
                  <>
                    <li className="navItem">
                      <a href="admin" className="navLink">admin</a>
                    </li>
                    <li className="navItem">
                      <a href="Confirmation" className="navLink">Confirmation Page</a>
                    </li>
                  </>
                )}
      
                {user && userData ? (
                  <>
                    <li className="navItem">
                      <a href="Myorders" className="navLink">My Orders</a>
                    </li>
                    <li className="navItem">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Hello: {userData.FirstName}
                    </li>
                    <button className="btn" onClick={logout}> Log out </button>
                  </>
                ) : (
                  <>
                    <button className="btn">
                      <Link to="/Sign-in">Sign-in</Link>
                    </button>
                    <button className="btn">
                      <Link to="/Sign-up">Sign-up</Link>
                    </button>
                  </>
                )}
              </ul>
              <div onClick={removeNavbar} className="closeNavbar">
                <AiFillCloseCircle className="icon" />
              </div>
            </div>
            <div onClick={showNav} className="toggleNavbar">
              <TbGridDots className="icon" />
            </div>
          </header>
        </section>
      );
      
}

export default Navbar