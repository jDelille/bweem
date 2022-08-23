import React, { useEffect, useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './auth.scss';

// firebase imports
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'


const Signup = ({ setShowSignup, setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState(null)
  const [takenNames, setTakenNames] = useState([])

  const { error, signup } = useSignup();

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
  }, [])

  // create new user account
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if displayName length is greater than 25
    if (displayName.length > 25) return setErrorMsg('You cannot make your display name more than 25 characters.')

    // check if password and passwordConfirm match
    if (password !== passwordConfirm) return setErrorMsg("Your passwords don't match.")

    // check if displayName is already taken
    if (takenNames.includes(displayName)) return setErrorMsg('Display name already in use.')

    signup(email, password, displayName)
  }

  // redirect to login modal
  const redirectLogin = () => {
    setShowSignup(false);
    setShowLogin(true)
  }

  const closeError = () => {
    setErrorMsg(false)
  }

  return (
    <>
      <div className="overlay"></div>
      <div className='modal'>
        <h1> Signup </h1>
        <div className="close" onClick={() => setShowSignup(false)}>X</div>
        {error && <p className='error'>{error}</p>}
        {errorMsg && <p className='error'>{errorMsg} <span onClick={closeError}>X</span></p>}

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Username" onChange={(e) => setDisplayName(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Password Confirm" onChange={(e) => setPasswordConfirm(e.target.value)} required />
          <button> Sign Up </button>
        </form>

        <p className='redirect'>Already have an account? <span onClick={redirectLogin}>Login</span></p>

      </div>
    </>

  )
}

export default Signup