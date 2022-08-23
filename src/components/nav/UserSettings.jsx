import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout';
import './navbar.scss'

const UserSettings = () => {
 const { logout } = useLogout();

 return (
  <div className='settings'>UserSettings
   <ul>
    <li>
     <NavLink to='/reset-password'>Reset Password</NavLink>
    </li>
    <li>
     <NavLink to='/profile'> Profile </NavLink>
    </li>
    <li>
     <button onClick={logout}>Logout</button>
    </li>
   </ul>
  </div>
 )
}

export default UserSettings