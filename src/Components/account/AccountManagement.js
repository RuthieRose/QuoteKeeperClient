import axiosAPI from 'axios';
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { useContextAccessToken } from '../Context'
import './am.css';

function Account({ setDisplay }) {


 const userInputRef = useRef();
 const errorRef = useRef();

 const [email, setEmail] = useState('');
 const [validEmail, setValidEmail] = useState(false);
 const [password, setPassword] = useState('');

 const [errorMessage, setErrorMessage] = useState('');

 const navigate = useNavigate()
 const token = useContextAccessToken()

 const axios = axiosAPI.create({

  baseURL: 'https://quotekeeper.herokuapp.com',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
 })

 const DELETE = 'users/delete'

 const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


 useEffect(() => {
  userInputRef.current.focus();
  setDisplay(false)
 }, []);

 useEffect(() => {
  const result = EMAIL_REGEX.test(email);
  setValidEmail(result)
 }, [email]);


 useEffect(() => {
  setErrorMessage('');
 }, [email]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  // additional validation 
  const test3 = EMAIL_REGEX.test(email);
  if (!test3) {
   setErrorMessage('Invalid entry');
   return;
  }
  try {
   const response = await axios.post(DELETE,
    JSON.stringify({ email, password }))
   setDisplay(true)
   alert('Account has been deleted')
   setTimeout(() => {
    navigate('/')
    window.location.reload()
   }, 1000)

  }

  catch (err) {

   setErrorMessage(err.response.data)
   console.log(err)

  }

 }

 return (
  <>
   <header className="app-header">
    <h2>
     Account Management
    </h2>
    <h3>Delete Account</h3>
   </header>
   <section className="warning">
    <h4>Warning! Account deletion is permanent. </h4>
    <p ref={errorRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">{errorMessage}</p>
    <p>To delete your account, enter your email address and password.</p>
    <form onSubmit={handleSubmit}>

     {/* Email */}
     <div className="warning-email">
      <label htmlFor="email">
       Email:
      </label>

      <input
       type="text"
       id="email"
       ref={userInputRef}
       onChange={e => setEmail(e.target.value)}
       required
      />
     </div>
     {/* Password */}
     <div className="warning-password">
      <label htmlFor="password">
       Password:

      </label>


      <input
       type="password"
       id="password"
       onChange={e => setPassword(e.target.value)}
       required
      />
     </div>
     <button disabled={!validEmail ? true : false}>Delete</button>

     <div>

      <span className="line">

      </span>
     </div>

    </form>
   </section>

  </>
 )
}

export default Account