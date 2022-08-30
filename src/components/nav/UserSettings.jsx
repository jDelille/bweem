import React, { useEffect, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout';
import { IoIosSettings } from 'react-icons/io'
import { IoLogOutOutline } from 'react-icons/io5'
import { CgDarkMode } from 'react-icons/cg'
import { TiArrowSortedUp } from 'react-icons/ti'
import { AiFillHome, AiFillTrophy } from 'react-icons/ai'
import { FaGuitar } from 'react-icons/fa'
import { MdQuiz } from 'react-icons/md'
import './navbar.scss'

// firebase imports
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';


const UserSettings = ({ setToggle, toggle, setTheme, theme, showUserSettings, setShowUserSettings }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [displayName, setDisplayName] = useState('')

  // get display name
  getDocs(collection(db, 'users'))
    .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.id === user.uid)
          setDisplayName(doc.data().displayName)
      })
    })

  const signoutUser = () => {
    setShowUserSettings(false)
    logout();

  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return (
    <div className={showUserSettings ? 'settings primary' : 'hide'} >
      <TiArrowSortedUp className='up-arrow arrow-color ' />
      <p>Hey, <span style={{ color: "#159309", fontWeight: '500' }}>{displayName}</span></p>
      <ul>
        <li>
          <NavLink to={`/profile/${user.uid}`} reloadDocument onClick={() => setShowUserSettings(false)}><span><IoIosSettings className='icon' /></span>Profile</NavLink>
        </li>

        <li>
          <NavLink to='/'><span><AiFillHome className='icon' /></span> Home </NavLink>
        </li>
        <li>
          <NavLink to='/chords'><span><FaGuitar className='icon' /></span> Chords </NavLink>
        </li>
        {user && (
          <li>
            <NavLink to='/lobby'><span><MdQuiz className='icon' /></span> Lobby </NavLink>
          </li>
        )}
        <li>
          <NavLink to='/leaderboard'><span><AiFillTrophy className='icon' /></span> Leaderboard </NavLink>
        </li>
        <li className='dark-mode'>
          <span><CgDarkMode className='icon' /></span>
          <span>Dark Mode</span>
          <div className="pill" onClick={() => { setToggle(!toggle); setTheme(!theme) }}>
            <div className={toggle ? "switch-on" : "switch-off"}></div>
          </div>
        </li>
        <li >
          <span><IoLogOutOutline className='icon' /></span>
          <p onClick={signoutUser}>Logout</p>
        </li>
      </ul>
    </div >
  )
}

export default UserSettings