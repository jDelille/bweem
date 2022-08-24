import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'
import { RiLinkedinFill } from 'react-icons/ri'

const Login = ({ setShowLogin, setShowSignup }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const { error, login } = useLogin();

 const handleSubmit = (e) => {
  e.preventDefault();
  login(email, password)
 }

 // redirect to signup modal
 const redirectSignup = () => {
  setShowLogin(false);
  setShowSignup(true)
 }

 return (
  <>
   <div className="overlay"></div>
   <div className='modal secondary'>
    <div className="modal-header">
     <img src="../images/logo.jpg" alt="" />
     <h1> Bweem </h1>
    </div>
    <div className="close" onClick={() => setShowLogin(false)}>X</div>
    {error && <p className='error'>{error}</p>}
    <form onSubmit={handleSubmit}>
     <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required className='secondary' />
     <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required className='secondary' />
     <button> Sign In </button>
    </form>

    <div className='redirect'>
     <p> Forgot Password?</p>
     <p onClick={redirectSignup}>Sign Up</p>
    </div>

    <div className="alternate-login">
     <p>or you can sign in with</p>
     <div className="icons">
      <AiFillGoogleCircle className='icon' />
      <AiFillGithub className='icon' />
      <RiLinkedinFill className='icon' />
     </div>
    </div>

    <div className="disclaimer">
     <p>This site is protected by reCAPTCHA and the Google <span>Privacy Policy</span> and <span>Terms of Service</span> apply.</p>
    </div>

   </div>
  </>

 )
}

export default Login