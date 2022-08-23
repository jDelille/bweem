import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext';
import './profile-settings.scss';
import '../profile.scss';

// firebase imports
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { updatePassword } from 'firebase/auth';
import { db } from '../../../firebase/config'
import { MdModeEditOutline } from 'react-icons/md';

const ChangePassword = ({ profile }) => {
 const [password, setPassword] = useState("")
 const [errorMsg, setErrorMsg] = useState(null)
 const [changePassword, setChangePassword] = useState(false)

 const { user } = useAuthContext();

 const changeAccountPassword = () => {

  updatePassword(user, password)
   .then(() => {
    console.log('success')
   }).catch((error) => {
    setErrorMsg(error.message)
   })

  setErrorMsg(null)
 }

 return (
  <>
   <div>
    <span className='label'>Password</span>
    <p>•••••••••••</p>
    <span className='edit' onClick={() => setChangePassword(true)}>
     <MdModeEditOutline className='edit-icon' />
    </span>
   </div>
   {changePassword && (
    <>
     <div className="overlay"></div>
     <div className='modal'>
      <p className="close" onClick={() => setChangePassword(false)}> X </p>
      <h1> Change your password </h1>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='•••••••••••' />
      <button onClick={changeAccountPassword} className='btn'>Change Password</button>
     </div>
    </>
   )}

  </>

 )
}

export default ChangePassword