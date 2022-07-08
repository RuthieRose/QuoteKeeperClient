import './reset.css'
import './Request.css'
import axiosAPI from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const axios = axiosAPI.create({
  baseURL: 'https://quotekeeper.herokuapp.com'
})

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const REQUEST = '/passwordreset/request';

export default function Request({ setDisplayReset, setDisplay }) {

  const userInputRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    userInputRef.current.focus();
  }, []);

  useEffect(() => {
    setDisplayReset(true)
    setDisplay(false)
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result)
  }, [email]);

  useEffect(() => {
    setErrorMessage('');
  }, [email]);

  const handleHome = () => {
    setDisplay(true)
    setDisplayReset(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // additional validation 

    const test3 = EMAIL_REGEX.test(email);
    if (!test3) {
      setErrorMessage('Invalid entry');
      return;
    }
    try {
      const response = await axios.post(REQUEST,
        JSON.stringify({ email }),
        {
          headers: { 'Content-Type': 'application/json' }
        })
      setEmail('')
      navigate('/reset')
    }

    catch (err) {
      if (err.response.status === 409) {
        setErrorMessage(err.response.data)
        console.log(err)
        errorRef.current.focus()
      } else {
        setErrorMessage('request failed')
        console.log(err)
      }

    }
  }
  return (
    <>
      <section className="reset-request">
        <p ref={errorRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">{errorMessage}</p>
        <h2 className="request">Request Password Reset</h2>
        <form onSubmit={handleSubmit}>

          {/* Email */}

          <label htmlFor="email">
            Email:

          </label>
          <input
            type="text"
            id="email"
            ref={userInputRef}
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




          <div>
            <button className="request-button" disabled={!validEmail ? true : false}>Request</button>
          </div>

        </form>
        <div className='back-parent' onClick={handleHome}><Link className="back-to-quotes" to='/'>Back to Quotes</Link></div>
      </section>

    </>
  )
}
