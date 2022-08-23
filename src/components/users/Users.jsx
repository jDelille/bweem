import React, { useState, useEffect } from 'react'
import axios from 'axios';
import User from '../user/User';

const Users = () => {
 const [users, setUsers] = useState([])

 const getUsers = () => {
  axios.get('https://randomuser.me/api/?results=25')
   .then(res => {
    setUsers(res.data.results)
   }).catch(err => {
    console.log(err)
   })
 }

 useEffect(() => {
  getUsers()
 }, [])

 return (
  <div>
   {users.map(user => {
    return <User user={user} />
   })}

  </div>
 )
}

export default Users