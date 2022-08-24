import React, { useState } from 'react'

// firebase imports
import { auth } from '../../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'


const FogotPassword = ({ setForgotPassword }) => {

 const [email, setEmail] = useState("")

 const resetPassword = () => {
  sendPasswordResetEmail(auth, email)
   .then(() => {
    console.log('Password reset successful')
   }).catch((error) => {
    console.log(error.message)
   })
 }

 return (
  <>
   <div className="overlay"></div>
   <div className='modal secondary'>
    <div className="modal-header">
     <h1>Password Reset</h1>
     <p className='close' onClick={() => setForgotPassword(false)}>X</p>
    </div>
    <p className='information'>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</p>
    <form onSubmit={resetPassword}>
     <input type="email" placeholder='E-mail address' onChange={(e) => setEmail(e.target.value)} required />
     <button>Reset My Password</button>
    </form>
   </div>
  </>
 )
}

export default FogotPassword