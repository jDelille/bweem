import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react'

// firebase imports
import { auth } from '../../../firebase/config';

const ResetPassword = () => {
  const [email, setEmail] = useState('')

  const triggerResetEmail = async () => {
    return await sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('successful')
      }).catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <div className='page'>
      <h1>Reset Password</h1>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={triggerResetEmail}>Reset Password</button>
    </div>
  )
}

export default ResetPassword