import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// firebase imports
import { sendEmailVerification } from 'firebase/auth'


const VerifyEmail = () => {
 const { user } = useAuthContext();

 const sendVerification = () => {
  sendEmailVerification(user);
 }

 return (
  <div><h1> Verify your email </h1>
   <button onClick={sendVerification}>Verify Email</button>
  </div>
 )
}

export default VerifyEmail