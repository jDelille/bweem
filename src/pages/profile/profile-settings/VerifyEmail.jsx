import React from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'

// firebase imports
import { sendEmailVerification } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'


const VerifyEmail = () => {
 const { user } = useAuthContext();


 const userRef = doc(db, "users", user.uid)

 const sendVerification = () => {
  sendEmailVerification(user)
   .then(() => {
    // change users verified status if success
    updateDoc(userRef, {
     verified: 'Verification email sent'
    })
    console.log('success')
   }).catch((error) => {
    console.error(error)
   })
 }

 return (
  <div><h1> Verify your email </h1>
   <button onClick={sendVerification}>Verify Email</button>
  </div>
 )
}

export default VerifyEmail