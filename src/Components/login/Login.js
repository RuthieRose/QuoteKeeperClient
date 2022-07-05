
import { useContextLoggedIn } from '../Context';
import './login.css'
import axiosAPI from 'axios';
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { useContextUpdateAccessToken, useContextUpdateLoggedIn, useContextUpdateUserId, useContextUpdateName } from '../Context'

const axios = axiosAPI.create({
  baseURL: 'https://quotekeeper.herokuapp.com'

})

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN = '/users/login';



export default function Login({ setToggle }) {

  // const loggedIn = useContextLoggedIn()

  const userInputRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const updateLoggedIn = useContextUpdateLoggedIn()
  const updateUserId = useContextUpdateUserId()
  const updateAccessToken = useContextUpdateAccessToken()

  const updateGreeting = useContextUpdateName()

  const handleRegister = () => {
    setToggle('register')
  }


  useEffect(() => {
    userInputRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result)
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // additional validation 

    const test2 = PASSWORD_REGEX.test(password);
    const test3 = EMAIL_REGEX.test(email);
    if (!test2 || !test3) {
      setErrorMessage('Invalid entry');
      return;
    }
    try {
      const response = await axios.post(LOGIN,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        })

      updateLoggedIn()
      updateUserId(response.data.id)
      updateAccessToken(response.data.accessToken)
      updateGreeting(response.data.name)
      setEmail('')
      setPassword('')
    }

    catch (err) {
      if (err.response.status === 409) {
        setErrorMessage(err.response.data)
        console.log(err)
        errorRef.current.focus()
      } else {
        setErrorMessage('login failed')
        console.log(err)
      }

    }
  }
  return (
    <>

      <section className='login'>

        <form className="login-form" onSubmit={handleSubmit}>

          {/* Email */}

          <label htmlFor="email" className='label-email'>
            Email:
          </label>

          <input
            type="text"
            id="email"
            className="login-input input-email"
            ref={userInputRef}
            onChange={e => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby='emailnote'
          />



          {/* Password */}

          <label htmlFor="password" className="label-password">
            Password:

          </label>


          <input
            type="password"
            id="password"
            className="login-input input-password"
            onChange={e => setPassword(e.target.value)}
            required
            aria-invalid={validPassword ? 'false' : 'true'}
            aria-describedby='passwordnote'
          />

          <button className="button-set" disabled={!validEmail || !validPassword ? true : false}>Login</button>



          <span className="link link1-set" onClick={handleRegister}>Need to register? </span>

          <Link to="/passwordreset/request" className="link link2-set"> Forgot password?</Link>




        </form>
      </section>
      <div className="error">  <p ref={errorRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">{errorMessage}</p></div>
      <header className="App-header">
        <h1>
          Quote Keeper
        </h1>
      </header>

    </>
  )
}
