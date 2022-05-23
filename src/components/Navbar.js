import { useEffect, useState } from "react"
import React from "react"
import { Link, Navigate } from "react-router-dom"

import { getSession, auth } from "../api/auth"
import { useContext } from "react"
import { SessionContext } from "../context/SessionContext"
import "../assets/style/components/navbar.scss";

export default function Navbar({isShowForm, setIsShowForm}) {
  const {user, isLoggedIn} = useContext(SessionContext);

  const handleLogin = () => {
    auth();
  }
  
  return (
    <>
      <div aria-label="Navbar" className="navbar">
        <div className="container">
          <div className="top-nav">
            <div className="app-logo" aria-label="App">
              <Link to="/" aria-label="App Title">
                <img src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png' alt="logo" aria-label="App Logo" />
                Instagram Clone
              </Link>
            </div>
            <ul className="nav">
              {
                isLoggedIn && <>
                  <li className="nav-item">
                    <Link to={`/profile/${user.id}`} className="nav-link" aria-label="Profile">{user.name}</Link>
                  </li>
                  <li className="nav-item">
                    <button className='btn-secondary' onClick={() => setIsShowForm(!isShowForm)}>Upload</button>
                  </li>
                </>
              }
              <li className="nav-item">
                <button className='btn-primary' aria-label="Login" onClick={handleLogin}>{isLoggedIn ? 'Logout': 'Login'}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
