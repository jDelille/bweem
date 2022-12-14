import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";
import './profile-settings.scss';
import '../../pages/profile/profile.scss';

// firebase imports
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const ChangeDisplayName = ({ profile, setChangeName, changeName }) => {
  const [displayName, setDisplayName] = useState("")
  const [takenNames, setTakenNames] = useState([])
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
        let takenDisplayNames = [];
        snapshot.docs.forEach(doc => {
          takenDisplayNames.push({ ...doc.data() })
        })
        let takenArr = []
        takenDisplayNames.map(taken => {
          takenArr.push(taken.displayName)
          return setTakenNames(takenArr)
        })
      })

    getDocs(collection(db, 'users'))
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          if (doc.id === user.uid)
            setCurrUser(doc.data().displayName)
        })

      })
  }, [])


  const changeDisplayName = () => {

    // check if name is same as current name
    if (displayName === currUser) return setErrorMsg("You already have this display name.")

    // check if name is taken
    if (takenNames.includes(displayName)) return setErrorMsg('Display name already in use.')

    // check if name is less than 15 characters
    if (displayName.length > 15) return setErrorMsg('You must make your display name less than 15 ceharacters.')

    // check if name has special characters
    const specialChars = /[^\w\s]/
    if (specialChars.test(displayName)) return setErrorMsg('Your name must only include letters and numbers. ');

    updateDoc(userRef, {
      displayName: displayName
    }).then(() => {
      setSuccessMsg('Display Name change successful!')

      setTimeout(() => {
        setSuccessMsg(null)
        setChangeName(false)
        navigate(0);
      }, 2000)

      setErrorMsg(null)
    }).catch((error) => {
      setErrorMsg(error.message)
    })

  }

  return (
    <>
      {changeName && (
        <>
          <div className="overlay"></div>
          <div className='modal secondary'>
            {successMsg && (
              <>
                <p className="close" onClick={() => setChangeName(false)}> X </p>
                <h1 className='success-msg'>{successMsg}</h1>
              </>
            )}
            {!successMsg && (
              <>
                <p className="close" onClick={() => setChangeName(false)}> X </p>
                <h1> Change your display name </h1>
                {errorMsg && <p className='error'>{errorMsg}</p>}
                <input type="text" onChange={(e) => setDisplayName(e.target.value)} placeholder={profile?.displayName} className="primary" />
                <button onClick={changeDisplayName} className='btn'>Update Display Name</button>
              </>
            )}
          </div>
        </>
      )}

    </>

  )
}

export default ChangeDisplayName