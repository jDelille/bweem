import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import { FaUserCircle } from 'react-icons/fa'
import UserSettings from './UserSettings';

import './navbar.scss';

const Navbar = ({ setShowSignup, setShowLogin }) => {
 const { user } = useAuthContext();
 const [showUserSettings, setShowUserSettings] = useState(false)

 return (
  <nav>
   <div className="logo">
    <h1> Bweem.io </h1>
   </div>
   <ul className="links">
    <li>
     <NavLink to='/'> Home </NavLink>
    </li>
    {!user && (
     <>
      <li>
       <p onClick={() => setShowSignup(true)}> Sign Up </p>
      </li><li>
       <p onClick={() => setShowLogin(true)}> Log In </p>
      </li>
     </>
    )}
   </ul>

   {user && (
    <li className='user-settings'>
     <FaUserCircle onClick={() => setShowUserSettings(!showUserSettings)} />
     {showUserSettings && (
      <UserSettings />
     )}
    </li>
   )}


  </nav >
 )
}

export default Navbar