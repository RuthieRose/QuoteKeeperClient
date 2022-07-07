import './add.css';
import axiosAPI from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { useContextAccessToken, useContextUserId, useContextUpdateSaved } from '../Context'


const INPUT_REGEX = /^[a-zA-Z][a-zA-Z-_'.! ]/

const ADD = '/quotes';

export default function AddQuote({ setDisplay }) {

  const userInputRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const token = useContextAccessToken()
  const userId = useContextUserId()
  const updateSaved = useContextUpdateSaved()

  const axios = axiosAPI.create({
    baseURL: 'https://quotekeeper.herokuapp.com',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  })

  const [quote, setQuote] = useState('');
  const [validQuote, setValidQuote] = useState(false);

  const [author, setAuthor] = useState('');
  const [validAuthor, setValidAuthor] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setDisplay(false)
  }, [])

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
        JSON.stringify({ quote, author }))
      console.log(response);
      updateSaved();
      navigate('/saved')

    }

    catch (err) {
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

      <section className="add-quotes">

        <h2 className="save-quote-heading">Save a Quote</h2>

        <p className="info-add">

          Letters, spaces, underscores, hyphens, apostrophes, commas, periods and exclamation marks allowed.
        </p>
        <form onSubmit={handleSubmit}>

          <div className="quote-div">
            {/* Quote */}
            <label htmlFor="quote">
              Quote:

            </label>
            <div className="quote-area">
              <textarea
                id="quote"
                className="textarea"
                ref={userInputRef}
                autoComplete="off"
                onChange={e => setQuote(e.target.value)}
                required
              />
            </div>
          </div>


          {/* Author */}
          <div className="author-div">
            <label htmlFor="author">
              Author:

            </label>
            <div className="author-input">
              <input
                type="text"
                id="author"
                className="author-input"
                autoComplete="off"
                onChange={e => setAuthor(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="save-button" disabled={!validAuthor || !validQuote ? true : false}>Save</button>

        </form>
      </section>

      <div className='back-parent' onClick={handleHome}><Link to='/'>Back to Quotes</Link></div>
    </>
  )
}
