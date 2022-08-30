import React from 'react'
import './avatar.scss';

const Avatar = ({ user }) => {
 return (
  <div className="profile-picture" >
   <img src={user.url} alt="" />
  </div>
 )
}

export default Avatar