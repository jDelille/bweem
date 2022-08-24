import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout';
import { IoIosSettings } from 'react-icons/io'
import { IoLogOutOutline } from 'react-icons/io5'
import { CgDarkMode } from 'react-icons/cg'
import './navbar.scss'

// firebase imports
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';


const UserSettings = ({ setToggle, toggle, setTheme, theme }) => {
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

  return (
    <div className='settings secondary'>
      <p>Hey, {displayName}</p>
      <ul>
        <li>
          <NavLink to='/profile'> <span><IoIosSettings className='icon' /></span>Account Settings </NavLink>
        </li>
        <li className='dark-mode'>
          <span><CgDarkMode className='icon' /></span>
          <span>Dark Mode</span>
          <div className="pill" onClick={() => { setToggle(!toggle); setTheme(!theme) }}>
            <div className={toggle ? "switch-on" : "switch-off"}></div>
          </div>
        </li>
        <li>
          <span><IoLogOutOutline className='icon' /></span>
          <p onClick={logout}>Logout</p>
        </li>
      </ul>
    </div >
  )
}

export default UserSettings