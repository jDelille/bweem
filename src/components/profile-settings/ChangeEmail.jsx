import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";

import './profile-settings.scss';
import '../../pages/profile/profile.scss';

// firebase imports
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { MdModeEditOutline } from 'react-icons/md';
import { updateEmail } from 'firebase/auth';

const ChangeEmail = ({ profile, changeEmail, setChangeEmail }) => {
  const [email, setEmail] = useState("")
  const [takenEmails, setTakenEmails] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [currUser, setCurrUser] = useState([])

  const { user } = useAuthContext();
  const navigate = useNavigate();

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
    updateEmail(user, email)
      .then(() => {
        setSuccessMsg('Email change successful!')
        setTimeout(() => {
          setSuccessMsg(null)
          setChangeEmail(false)
          navigate(0);
        }, 2000)
      }).catch((error) => {
        setErrorMsg(error.message)
      })
    setErrorMsg(null)
  }

  return (
    <>
      {changeEmail && (
        <>
          <div className="overlay"></div>
          <div className='modal secondary'>
            {successMsg && (
              <>
                <p className="close" onClick={() => setChangeEmail(false)}> X </p>
                <h1>{successMsg}</h1>
              </>
            )}
            {!successMsg && (
              <>
                <p className="close" onClick={() => setChangeEmail(false)}> X </p>
                <h1> Change your email </h1>
                {errorMsg && <p className='error'>{errorMsg}</p>}
                <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder={profile.email} className='primary' />
                <button onClick={changeAccountEmail} className='btn'>Update Email</button>
              </>
            )}

          </div>
        </>
      )}

    </>

  )
}

export default ChangeEmail