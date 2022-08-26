import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import { FaUser } from 'react-icons/fa'
import UserSettings from './UserSettings';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import './navbar.scss';
import UserFavorites from './UserFavorites';

const Navbar = ({ setShowSignup, setShowLogin, setToggle, toggle, setTheme, theme }) => {
  const { user } = useAuthContext();
  const [showUserSettings, setShowUserSettings] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  return (
    <nav className='primary primary'>
      <div className="logo">
        <h1> Bweem.io </h1>
      </div>
      <ul className="links">
        <li>
          <NavLink to='/'> Home </NavLink>
        </li>
        <li>
          <NavLink to='/chords'> Chords </NavLink>
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
          {!showFavorites ? <BsBookmarkStar onClick={() => { setShowFavorites(true); setShowUserSettings(false) }} /> : <BsBookmarkStarFill onClick={() => { setShowFavorites(false); setShowUserSettings(false) }} />}
          <UserFavorites showFavorites={showFavorites} />
          <FaUser onClick={() => { setShowUserSettings(!showUserSettings); setShowFavorites(false) }} />
          <UserSettings toggle={toggle}
            setToggle={setToggle} setTheme={setTheme} theme={theme} showUserSettings={showUserSettings} setShowUserSettings={setShowUserSettings} />

        </li>
      )}


    </nav >
  )
}

export default Navbar