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
 headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
})

 const [quote, setQuote] = useState('');
 const [validQuote, setValidQuote] = useState(false);

 const [author, setAuthor] = useState('');
 const [validAuthor, setValidAuthor] = useState(false);

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
    if (err.response.status == 403) {
      navigate('/')
      window.location.reload()
    }
  } 
   
 }
 }
 return (
  <>
  
    <section>

     <h2>Save a Quote</h2>

     <p>

Letters, spaces, underscores, hyphens, apostrophes, commas, periods and exclamation marks allowed.
</p>
     <form onSubmit={handleSubmit}>

      {/* Quote */}
      <label htmlFor="quote">
       Quote:


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
      />




      {/* Author */}

      <label htmlFor="author">
       Author:

      </label>
      <input
       type="text"
       id="email"
       autoComplete="off"
       onChange={e => setAuthor(e.target.value)}
       required
       aria-invalid={validAuthor ? 'false' : 'true'}
       aria-describedby='authornote'
      />


      <button disabled={!validAuthor || !validQuote ? true : false}>Save</button>

     </form>
    </section>

    <div onClick={handleHome}><Link to='/'>Back to Quotes</Link></div>
  </>
 )
}
