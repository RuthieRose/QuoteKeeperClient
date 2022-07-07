import './register.css';
import axiosAPI from 'axios';
import { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
      setToggle('login')
      // clear input fields
    }

    catch (err) {
      if (err.response.status === 409) {
        setErrorMessage(err.response.data)
        console.log(err)
        errorRef.current.focus()
      } else {
        setErrorMessage('registration failed')
      }

    }
  }
  return (
    <>
      <section className='register'>

        <form className="register-form" onSubmit={handleSubmit}>

          {/* Name */}
          <label htmlFor="name" className='register-email register-label-name'>
            Name:

          </label>


          <input
            type="text"
            id="name"
            className="register-input register-input-name"
            ref={userInputRef}
            autoComplete="off"
            onChange={e => setName(e.target.value)}
            required
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby='namenote'
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />




          {/* Email */}

          <label htmlFor="email" className="register-label-email">
            Email:

          </label>
          <input
            type="text"
            id="email"
            className="register-input-email"
            autoComplete="off"
            onChange={e => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby='emailnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />



          {/* Password */}

          <label htmlFor="password" className="register-label-password">
            Password:

          </label>


          <input
            type="password"
            id="password"
            className="register-input-password"
            onChange={e => setPassword(e.target.value)}
            required
            aria-invalid={validPassword ? 'false' : 'true'}
            aria-describedby='passwordnote'
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />




          {/* Match Password */}

          <label htmlFor="matchPassword" className="register-label-match">
            Confirm Password:

          </label>


          <input
            type="password"
            id="matchPassword"
            className="register-input-match"
            onChange={e => setMatchPassword(e.target.value)}
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria-describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />


          <button className="register-button" disabled={!validName || !validEmail || !validPassword || !validMatch ? true : false}>Register</button>



          <span className="line login-set">
            <div onClick={handleLogin}>Need to login?</div>

          </span>


        </form>
      </section>
      <p id="namenote" className={nameFocus && name && !validName ? 'instructions' : 'offscreen'}>
        <FontAwesomeIcon icon={faInfoCircle} className='icon' />
        2 to 24 characters. Must begin with a letter. Letters, underscores, hyphens, apostrophes allowed.
      </p>

      <p id="emailnote" className={email && !validEmail ? 'instructions' : 'offscreen'}>
        <FontAwesomeIcon icon={faInfoCircle} className='icon' />
        Must be a valid email address.
      </p>

      <p id="passwordnote" className={password && !validPassword ? 'instructions' : 'offscreen'}>
        <FontAwesomeIcon icon={faInfoCircle} className='icon' />
        8 to 24 characters. 
        Must have a number, upper case letter, a lower case letter, and a special character.
        Allowed special characters: <span className="password-span" aria-label='exclamation mark'>!</span> <span  className="password-span"  aria-label='at symbol'>@</span> <span className="password-span"  aria-label='dollar sign'>$</span> <span className="password-span"  aria-label="hashtag">#</span> <span className="password-span"  aria-label='percent'>%</span>
      </p>

      <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
        <FontAwesomeIcon icon={faInfoCircle} className='icon' />
        Must match the first password input field. <br />
      </p>



      <div className="error"> <p ref={errorRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">{errorMessage}</p></div>
      <article className="tos">TERMS OF SERVICE: This app is for entertainment purposes only and no guarantee or warranty of any kind is offered. The developer has made an effort to follow best practices, but you still use at your own risk. This should go without saying, but please don't do anything malicious or illegal with your access to this site either. There, isn't that the shortest TOS you've ever read? :) </article>

    </>
  )
}
