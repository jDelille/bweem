import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext';
import './profile-settings.scss';
import '../profile.scss';

// firebase imports
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import { MdModeEditOutline } from 'react-icons/md';

const ChangeEmail = ({ profile }) => {
 const [email, setEmail] = useState("")
 const [takenEmails, setTakenEmails] = useState([])
 const [errorMsg, setErrorMsg] = useState(null)
 const [currUser, setCurrUser] = useState([])
 const [changeEmail, setChangeEmail] = useState(false)

 const { user } = useAuthContext();

 const userRef = doc(db, "users", user.uid)

 // get the existing display names.
 useEffect(() => {
  getDocs(collection(db, 'users'))
   .then((snapshot) => {
    let takenEmails = [];
    snapshot.docs.forEach(doc => {
     takenEmails.push({ ...doc.data() })
    })
    let takenArr = []
    takenEmails.map(taken => {
     takenArr.push(taken.email)
     return setTakenEmails(takenArr)
    })
   })

  getDocs(collection(db, 'users'))
   .then((snapshot) => {
    snapshot.docs.forEach(doc => {
     if (doc.id === user.uid)
      setCurrUser(doc.data().email)
    })

   })
 }, [])

 const changeAccountEmail = () => {

  // check if email is same as current email
  if (email === currUser) return setErrorMsg("You already have this email.")

  // check if email is connected to another account
  if (takenEmails.includes(email)) return setErrorMsg('Email already in use.')

  updateDoc(userRef, {
   email: email
  })

  setErrorMsg(null)
 }

 return (
  <>
   <div>
    <span className='label'>Account Email</span>
    <p>{profile.email}</p>
    <span className='edit' onClick={() => setChangeEmail(true)}>
     <MdModeEditOutline className='edit-icon' />
    </span>
   </div>
   {changeEmail && (
    <>
     <div className="overlay"></div>
     <div className='modal'>
      <p className="close" onClick={() => setChangeEmail(false)}> X </p>
      <h1> Change your email </h1>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder={profile.email} />
      <button onClick={changeAccountEmail} className='btn'>Update Email</button>
     </div>
    </>
   )}

  </>

 )
}

export default ChangeEmail