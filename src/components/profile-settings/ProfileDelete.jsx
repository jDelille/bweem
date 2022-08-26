import React, { useState } from 'react'
import { useLogout } from '../../hooks/useLogout';
import { IoWarningOutline } from 'react-icons/io5'
import './profile-settings.scss';

// firebase imports
import { db, auth } from '../../firebase/config';
import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { useAuthContext } from '../../hooks/useAuthContext';

const ProfileDelete = ({ user }) => {
  const [verifyDelete, setVerifyDelete] = useState(false)
  const { logout } = useLogout();

  const [email, setEmail] = useState('');
  const [verifyString, setVerifyString] = useState('')
  const [password, setPassword] = useState('')
  const [currEmail, setCurrEmail] = useState("")

  // error messages
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorVerify, setErrorVerify] = useState(null)
  const [errorEmailPassword, setErrorEmailPassword] = useState(null)


  getDocs(collection(db, 'users'))
    .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.id === user.uid)
          setCurrEmail(doc.data().email)
      })
    })



  // delete account 
  // add a verify delete popup
  const deleteAccount = async (e) => {
    e.preventDefault();




    await deleteUser(user).then(() => {
      deleteDoc(doc(db, "users", user.uid)).then(() => {
        logout();
      })
    }).catch((error) => {
      console.error(error.message)
    })

  }

  return (
    <>
      <div className="delete-account" >
        <p onClick={() => setVerifyDelete(true)} >Delete my account and data</p>
      </div>
      {verifyDelete && (
        <>
          <div className="overlay"></div>
          <div className="delete-modal secondary">
            <div className="modal-header-delete">
              <p className='title'> Are you sure you want to do this? </p>
              <p className="close" onClick={() => setVerifyDelete(false)}> x </p>
            </div>
            <div className="warning">
              <span><IoWarningOutline className='warning-icon' /></span>
              <p>This is extremely important.</p>
            </div>
            <div className="modal-body primary">
              <p>We will <span>immediately delete all of your data</span></p>
              <p> You will not be able to recover your account after deleting it.</p>
              <form onSubmit={deleteAccount}>
                {errorEmail && <p className='error-message'>{errorEmail}</p>}

                <label>
                  <p>Your email:</p>
                  <input type="email" className={!errorEmail ? 'primary' : 'primary error-input'} onChange={(e) => setEmail(e.target.value)} />
                </label>
                {errorVerify && <p className='error-message'>{errorVerify}</p>}

                <label>
                  <p>To verify, type <span>delete my account </span> below: </p>
                  <input type="text" className={!errorVerify ? 'primary' : 'primary error-input'} onChange={(e) => setVerifyString(e.target.value)} />
                </label>

                <button className="delete" >Delete this account</button>
              </form>
            </div>


          </div>
        </>
      )}
    </>

  )
}

export default ProfileDelete