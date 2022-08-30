import React, { useEffect, useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './auth.scss';


// firebase imports
import { collection, getDocs } from 'firebase/firestore'
import { db, auth } from '../../firebase/config'



const Signup = ({ setShowSignup, setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState(null)
  const [takenNames, setTakenNames] = useState([])
  const [image, setImage] = useState(null)

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

    // check if displayName length is greater than 15
    if (displayName.length > 15) return setErrorMsg('You cannot make your display name more than 25 characters.')

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
      <div className='modal secondary'>
        <div className="modal-header">
          {/* <img src="../images/logo.jpg" alt="" /> */}
          <h1> Sign Up </h1>
        </div>
        <div className="close" onClick={() => setShowSignup(false)}>X</div>
        {error && <p className='error'>{error}</p>}
        {errorMsg && <p className='error'>{errorMsg} <span onClick={closeError}>X</span></p>}

        <form onSubmit={handleSubmit}>

          <input type="text" placeholder="Username" onChange={(e) => setDisplayName(e.target.value)} required className='secondary' />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required className='secondary' />
          <input type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)} required className='secondary' />
          <input type="email" placeholder="E-mail address" onChange={(e) => setEmail(e.target.value)} required className='secondary' />

          <button> Sign Up </button>
        </form>

        <div className='redirect-signup'>
          <p>Have an account?</p>
          <span onClick={redirectLogin}>Login</span>
        </div>

        {/* <div className="alternate-login">
          <p>or you can sign in with</p>
          <div className="icons">
            <AiFillGoogleCircle className='icon' onClick={signUpWithGoogle} />
            <AiFillGithub className='icon' />
            <RiLinkedinFill className='icon' />
          </div>
        </div> */}

        <div className="disclaimer">
          <p>This site is protected by reCAPTCHA and the Google <span>Privacy Policy</span> and <span>Terms of Service</span> apply.</p>
        </div>

      </div>
    </>

  )
}

export default Signup