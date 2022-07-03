import './register.css';
import axiosAPI from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const axios = axiosAPI.create({
  baseURL: 'https://quotekeeper.herokuapp.com'
})

const NAME_REGEX = /^[a-zA-Z][a-zA-Z-_' ]{1,23}$/
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER = '/users/register';

export default function Register({ setToggle }) {

  const userInputRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userInputRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidName(result)
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result)
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword
    setValidMatch(match);

  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage('');
  }, [name, email, password, matchPassword]);

  const handleLogin = () => {
    setToggle('login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // additional validation 
    const test1 = NAME_REGEX.test(name);
    const test2 = PASSWORD_REGEX.test(password);
    const test3 = EMAIL_REGEX.test(email);
    if (!test1 || !test2 || !test3) {
      setErrorMessage('Invalid entry');
      return;
    }
    try {
      const response = await axios.post(REGISTER,
        JSON.stringify({ name, email, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        })
      console.log(response);
      setSuccess(true)
      setToggle('login')
      // clear input fields
    }

    catch (err) {
      if (err.response.status === 409) {
        setErrorMessage(err.response.data)
        console.log(err)
        setSuccess(false)
        errorRef.current.focus()
      } else {
        setErrorMessage('registration failed')
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <label htmlFor="name">
            Name:

            <span className={validName && nameFocus ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <span className={validName || !name ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

          </label>


          <input
            type="text"
            id="name"
            ref={userInputRef}
            autoComplete="off"
            onChange={e => setName(e.target.value)}
            required
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='namenote'
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />


          <p id="namenote" className={nameFocus && name && !validName ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} className='icon' />
            2 to 24 characters. <br />
            Must begin with a letter. <br />
            Letters, underscores, hyphens, apostrophes allowed.
          </p>

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
            autoComplete="off"
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

          {/* Match Password */}

          <label htmlFor="matchPassword">
            Confirm Password:

            <span className={validMatch && matchPassword && matchFocus ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>

            <span className={validMatch || !matchPassword ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

          </label>


          <input
            type="password"
            id="matchPassword"
            onChange={e => setMatchPassword(e.target.value)}
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />


          <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} className='icon' />
            Must match the first password input field. <br />
          </p>

          <button disabled={!validName || !validEmail || !validPassword || !validMatch ? true : false}>Register</button>



          <span className="line">
            <div onClick={handleLogin}>Need to login?</div>

          </span>


        </form>
      </section>

    </>
  )
}
