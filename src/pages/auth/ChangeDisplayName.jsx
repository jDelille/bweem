import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';

// firebase imports
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const ChangeDisplayName = () => {
 const [displayName, setDisplayName] = useState("")
 const [takenNames, setTakenNames] = useState([])
 const [errorMsg, setErrorMsg] = useState(null)
 const [currUser, setCurrUser] = useState([])

 const { user } = useAuthContext();

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
  if (displayName.length > 15) return setErrorMsg('You must make your display name less than 15 characters.')

  updateDoc(userRef, {
   displayName: displayName
  })

  setErrorMsg(null)
 }

 return (
  <div>
   <h1> Change your display name </h1>
   <p>{errorMsg}</p>
   <input type="text" onChange={(e) => setDisplayName(e.target.value)} />
   <button onClick={changeDisplayName}>Update Display Name</button>
  </div>
 )
}

export default ChangeDisplayName