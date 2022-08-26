import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import { FaUser } from 'react-icons/fa'
import UserSettings from './UserSettings';

import './navbar.scss';

const Navbar = ({ setShowSignup, setShowLogin, setToggle, toggle, setTheme, theme }) => {
  const { user } = useAuthContext();
  const [showUserSettings, setShowUserSettings] = useState(false)

  return (
    <nav className='primary primary'>
      <div className="logo">
        <h1> Bweem.io </h1>
      </div>
      <ul className="links">
        <li>
          <NavLink to='/'> Home </NavLink>
        </li>

        {!user && (
          <div className='user-auth'>
            <li>
              <p onClick={() => setShowLogin(true)}> Login </p>
            </li>
            <li>
              <p onClick={() => setShowSignup(true)} className='signup-btn'> Sign Up </p>
            </li>
          </div>
        )}
      </ul>

      {user && (
        <li className='user-settings'>
          <FaUser onClick={() => setShowUserSettings(!showUserSettings)} />

          <UserSettings toggle={toggle}
            setToggle={setToggle} setTheme={setTheme} theme={theme} showUserSettings={showUserSettings} setShowUserSettings={setShowUserSettings} />

        </li>
      )}


    </nav >
  )
}

export default Navbar