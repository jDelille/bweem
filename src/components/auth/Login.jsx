import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

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
   <div className='modal'>
    <h1> Login </h1>
    <div className="close" onClick={() => setShowLogin(false)}>X</div>
    {error && <p className='error'>{error}</p>}
    <form onSubmit={handleSubmit}>
     <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
     <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
     <button> Login </button>
    </form>

    <p className='redirect'>Don't have an account? <span onClick={redirectSignup}>Signup</span></p>

   </div>
  </>

 )
}

export default Login