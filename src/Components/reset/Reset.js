import './reset.css';
import axiosAPI from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const axios = axiosAPI.create({
  baseURL: 'https://quotekeeper.herokuapp.com'
})

const TEMP_REGEX = /([a-zA-Z0-9]){14}/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RESET = '/passwordreset/reset';

export default function Reset() {

 const userInputRef = useRef();
 const errorRef = useRef();
 const navigate = useNavigate();

 const [temp, setTemp] = useState('');
 const [validTemp, setValidTemp] = useState(false);
 const [tempFocus, setTempFocus] = useState(false);

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
  const result = TEMP_REGEX.test(temp);
  setValidTemp(result);

 }, [temp]);

 useEffect(() => {
  const result = PASSWORD_REGEX.test(password);
  setValidPassword(result);
  const match = password === matchPassword
  setValidMatch(match);

 }, [password, matchPassword]);

 useEffect(() => {
  setErrorMessage('');
 }, [temp, password, matchPassword]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  // additional validation 
  const test1 = TEMP_REGEX.test(temp);
  const test2 = PASSWORD_REGEX.test(password);
  if (!test1 || !test2) {
   setErrorMessage('Invalid entry');
   return;
  }
  try { 
     const response = await axios.post(RESET, 
      JSON.stringify({resetString: temp, password}), 
      {
       headers: { 'Content-Type': 'application/json'}})
     navigate('/login')
  }

  catch(err) {
   if (err.response.status === 409) {
    setErrorMessage(err.response.data)
    console.log(err)
    errorRef.current.focus()
  } else {
   setErrorMessage('reset failed')
  }
   
 }
 }
 return (
  <>
    <section>
     <p ref={errorRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">{errorMessage}</p>
     <h1>Reset Password</h1>
     <form onSubmit={handleSubmit}>

      {/* Temp */}

      <label htmlFor="temp">
       Temporary Password:

       <span className={validTemp && tempFocus ? 'valid' : 'hide'}>
        <FontAwesomeIcon icon={faCheck} />
       </span>

       <span className={validTemp || !temp ? 'hide' : 'invalid'}>
        <FontAwesomeIcon icon={faTimes} />
       </span>

      </label>
      <input
       type="password"
       id="temp"
       ref={userInputRef}
       autoComplete="off"
       onChange={e => setTemp(e.target.value)}
       required
       aria-invalid={validTemp ? 'false' : 'true'}
       aria-describedby='tempnote'
       onFocus={() => setTempFocus(true)}
       onBlur={() => setTempFocus(false)}
      />

      <p id="tempnote" className={temp && !validTemp ? 'instructions' : 'offscreen'}>
       <FontAwesomeIcon icon={faInfoCircle} className='icon' />
       The temporary password is letters and numbers only. <br />
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

      <button disabled={!validTemp || !validPassword || !validMatch ? true : false}>Reset Password</button>

      <p>
    
       <span className="line">
        <Link to="/login">Need to login?</Link>

       </span>
      </p>

     </form>
    </section>
  </>
 )
}
