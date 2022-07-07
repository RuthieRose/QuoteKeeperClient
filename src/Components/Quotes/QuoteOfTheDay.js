import { useState, useEffect } from 'react';
import axiosAPI from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import './quote.css';
import { useContextAccessToken, useContextLoggedIn, useContextUpdateAccessToken, useContextUpdateLoggedIn, useContextUpdateLoggedOut, useContextUpdateUserId, useContextUserId, useContextCurrQuote, useContextUpdateCurrQuote, useContextCurrAuthor, useContextUpdateCurrAuthor, useContextCount, useContextUpdateCount, useContextUpdateSaved } from '../Context'

export default function QuoteOfTheDay() {

  const ADD = '/quotes'

  const loggedIn = useContextLoggedIn()
  const updateLoggedOut = useContextUpdateLoggedOut()
  const accessToken = useContextAccessToken()
  const navigate = useNavigate();
  const token = useContextAccessToken()
  const userId = useContextUserId()
  const quote = useContextCurrQuote()
  const updateQuote = useContextUpdateCurrQuote()
  const author = useContextCurrAuthor()
  const updateAuthor = useContextUpdateCurrAuthor()
  const count = useContextCount()
  const updateCount = useContextUpdateCount()
  const updateSaved = useContextUpdateSaved()

  let [quotebank, setQuotebank] = useState('')


  const axios = axiosAPI.create({
    baseURL: 'https://quotekeeper.herokuapp.com',
    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
  })

  useEffect(() => {
    async function getQuotes() {
      let quotebank = await fetch('https://quotekeeper.herokuapp.com/quotebank')
      quotebank = await quotebank.json()
      setQuotebank(quotebank);
      updateQuote(quotebank[count][0])
      updateAuthor(quotebank[count][1])
    }
    getQuotes();
  }, []);


  useEffect(() => {
    if (count === quotebank.length - 1) {
      updateCount(0)
    }
    else updateCount(count => count + 1)
  }, [quote])


  const saveQuote = async () => {

    try {

      const response = await axios.post(`${ADD}/${userId}`,
        JSON.stringify({ quote, author }))
      updateSaved();
      navigate('/saved')
    }

    catch (err) {
      if (err) {
        console.log(err)
        if (err.response.status == 403) {
          navigate('/')
          window.location.reload()
        }
      }
    }
  }


  const getNewQuote = () => {
    let next = quotebank[count]
    updateQuote(next[0])
    updateAuthor(next[1])

  }

  const tweet = () => {
    window.open(`http://twitter.com/intent/tweet?text=${quote} ~ ${author}%0A https://quotekeeper.io`, '_blank')
  }

  const mail = () => {
    window.location.href = `mailto:?subject=I wanted to share a quote with you! &body=${quote} ~ ${author}`
  }

  return (
    <>
      <div className="quote-container">
        <div className="quote-parent-quote-div">
          <div className="quote">{quote}</div>
        </div>
        <div className="quote-parent-author-div">
          <div className="author">{author}</div>
        </div>
      </div>
      <div className="buttons">
        {loggedIn && <button className="quote-button" onClick={saveQuote}>Save this quote</button>}
        <button className="quote-button" onClick={mail}>Mail</button>
        <button className="quote-button" onClick={tweet}>Tweet</button>
        <button className="quote-button" onClick={getNewQuote}>Get a new quote</button>
      </div>
    </>
  )
}