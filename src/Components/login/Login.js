
import { useContextLoggedIn } from '../Context';
import './login.css'
import axiosAPI from 'axios';
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextUpdateAccessToken, useContextUpdateLoggedIn, useContextUpdateUserId, useContextUpdateName } from '../Context'

const axios = axiosAPI.create({
  baseURL: 'https://quotekeeper.herokuapp.com'
})

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN = '/users/login';



export default function Login({ setToggle }) {

  const loggedIn = useContextLoggedIn()

  const userInputRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

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
      <header className="App-header">
        <h1>
          Quote Keeper
        </h1>
      </header>
      <section>
        <p ref={errorRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">{errorMessage}</p>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

          {/* Email */}

          <label htmlFor="email">
            Email:

            <span className={validEmail && emailFocus ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <span className={validEmail || !email ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

          </label>
          <input
            type="text"
            id="email"
            ref={userInputRef}
            onChange={e => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby='emailnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />

          <p id="emailnote" className={email && !validEmail ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} className='icon' />
            Must be a valid email address. <br />
          </p>

          {/* Password */}

          <label htmlFor="password">
            Password:

            <span className={validPassword && passwordFocus ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <span className={validPassword || !password ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

          </label>


          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            required
            aria-invalid={validPassword ? 'false' : 'true'}
            aria-describedby='passwordnote'
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />


          <p id="passwordnote" className={password && !validPassword ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} className='icon' />
            8 to 24 characters. <br />
            Must have a number, upper case letter, a lower case letter, and a special character. <br />
            Allowed special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span> <span aria-label='dollar sign'>$</span> <span aria-label="hashtag">#</span> <span aria-label='percent'>%</span>
          </p>

          <button disabled={!validEmail || !validPassword ? true : false}>Login</button>

          <div>

            <span className="line">
              <div onClick={handleRegister}>Need to register?</div>
              <Link to="/passwordreset/request">Forgot password?</Link>

            </span>
          </div>

        </form>
      </section>

    </>
  )
}
