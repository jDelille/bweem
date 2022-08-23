import React from 'react'

const User = ({ user }) => {
 return (
  <div className='user_card'>
   <img src={user.picture.thumbnail} alt="" />
   <h1>{user.name.first}{user.name.last}</h1>
   <p>{user.email}</p>

  </div>
 )
}

export default User