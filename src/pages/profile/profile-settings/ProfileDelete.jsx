import React, { useState } from 'react'
import { useLogout } from '../../../hooks/useLogout';
import './profile-settings.scss';

// firebase imports
import { db } from '../../../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const ProfileDelete = ({ user }) => {
 const [verifyDelete, setVerifyDelete] = useState(false)
 const { logout } = useLogout();


 // delete account 
 // add a verify delete popup
 const deleteAccount = async () => {
  await deleteDoc(doc(db, "users", user.uid))
  logout();
 }

 return (
  <>
   <div className="delete-account" >
    <p onClick={() => setVerifyDelete(true)} >Delete my account and data</p>
   </div>
   {verifyDelete && (
    <>
     <div className="overlay"></div>
     <div className="modal delete-modal">
      <p className="close" onClick={() => setVerifyDelete(false)}> X </p>
      <p className='title'> Are you sure you want to delete your account? </p>
      <p className="delete" onClick={deleteAccount} >Delete my account</p>

     </div>
    </>
   )}
  </>

 )
}

export default ProfileDelete