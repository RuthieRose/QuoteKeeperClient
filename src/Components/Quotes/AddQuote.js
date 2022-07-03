import './add.css';
import axiosAPI from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContextAccessToken, useContextUserId } from '../Context'


const INPUT_REGEX = /^[a-zA-Z][a-zA-Z-_'.! ]/

const ADD = '/quotes';

export default function AddQuote({setDisplay}) {

 const userInputRef = useRef();
 const errorRef = useRef();
 const navigate = useNavigate();
 const token = useContextAccessToken()
 const userId = useContextUserId()

 const axios = axiosAPI.create({
 baseURL: 'https://quotekeeper.herokuapp.com',
 headers: {'content-type': 'application/json', 'Authorization': `Bearer ${token}`}
})

 const [quote, setQuote] = useState('');
 const [validQuote, setValidQuote] = useState(false);
 const [quoteFocus, setQuoteFocus] = useState(false);

 const [author, setAuthor] = useState('');
 const [validAuthor, setValidAuthor] = useState(false);
 const [authorFocus, setAuthorFocus] = useState(false);

 const [errorMessage, setErrorMessage] = useState('');

 useEffect(() => {
  setDisplay(false)
 },[])

 useEffect(() => {
  userInputRef.current.focus();
 }, []);

 useEffect(() => {
  const result = INPUT_REGEX.test(quote);
  setValidQuote(result)
 }, [quote]);

 useEffect(() => {
  const result = INPUT_REGEX.test(author);
  setValidAuthor(result)
 }, [author]);

 useEffect(() => {
  setErrorMessage('');
 }, [quote, author]);

 const handleHome = () => {
  setDisplay(true)
}

 const handleSubmit = async (e) => {
  e.preventDefault();
 

  // additional validation 
  const test1 = INPUT_REGEX.test(quote);
  const test2 = INPUT_REGEX.test(author);

  if (!test1 || !test2) {
   setErrorMessage('Invalid entry');
   return;
  }
  try { 
     const response = await axios.post(`${ADD}/${userId}`, 
      JSON.stringify({quote, author}))
     console.log(response);
     navigate('/saved')

  }

  catch(err) {
   if (err) {
    setErrorMessage(err.response.data)
    console.log(err)
    errorRef.current.focus()
  } 
   
 }
 }
 return (
  <>
  
    <section>
     <p ref={errorRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">{errorMessage}</p>
     <h1>Save a Quote</h1>
     <form onSubmit={handleSubmit}>

      {/* Name */}
      <label htmlFor="quote">
       Quote:

       <span className={validQuote && quoteFocus ? 'valid' : 'hide'}>
        <FontAwesomeIcon icon={faCheck} />
       </span>

       <span className={validQuote || !quote ? 'hide' : 'invalid'}>
        <FontAwesomeIcon icon={faTimes} />
       </span>

      </label>


      <input
       type="text"
       id="quote"
       ref={userInputRef}
       autoComplete="off"
       onChange={e => setQuote(e.target.value)}
       required
       aria-invalid={validQuote ? 'false' : 'true'}
       aria-describedby='quotenote'
       onFocus={() => setQuoteFocus(true)}
       onBlur={() => setQuoteFocus(false)}
      />


      <p id="quotenote" className={quoteFocus && quote && !validQuote ? 'instructions' : 'offscreen'}>
       <FontAwesomeIcon icon={faInfoCircle} className='icon' />

       Letters, spaces, underscores, hyphens, apostrophes, commas, periods and exclamation marks allowed.
      </p>

      {/* Author */}

      <label htmlFor="author">
       Author:

       <span className={validAuthor && authorFocus ? 'valid' : 'hide'}>
        <FontAwesomeIcon icon={faCheck} />
       </span>

       <span className={validAuthor || !author ? 'hide' : 'invalid'}>
        <FontAwesomeIcon icon={faTimes} />
       </span>

      </label>
      <input
       type="text"
       id="email"
       autoComplete="off"
       onChange={e => setAuthor(e.target.value)}
       required
       aria-invalid={validAuthor ? 'false' : 'true'}
       aria-describedby='authornote'
       onFocus={() => setAuthorFocus(true)}
       onBlur={() => setAuthorFocus(false)}
      />

      <p id="authornote" className={author && !validAuthor ? 'instructions' : 'offscreen'}>
       <FontAwesomeIcon icon={faInfoCircle} className='icon' />
       Letters, spaces, underscores, hyphens, apostrophes, commas, periods and exclamation marks allowed.<br />
      </p>

     
      <button disabled={!validAuthor || !validQuote ? true : false}>Save</button>

     </form>
    </section>

    <div onClick={handleHome}><Link to='/'>Back to Quotes</Link></div>
  </>
 )
}
