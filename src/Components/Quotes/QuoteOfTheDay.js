import { useState, useEffect, useReducer} from 'react';
import axiosAPI from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import './quote.css';
import { useContextAccessToken, useContextLoggedIn, useContextUpdateAccessToken, useContextUpdateLoggedIn, useContextUpdateLoggedOut, useContextUpdateUserId, useContextUserId, useContextCurrQuote, useContextUpdateCurrQuote, useContextCurrAuthor, useContextUpdateCurrAuthor, useContextCount, useContextUpdateCount} from '../Context'

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
    updateCount(count => count + 1)
  }, [quote])
  

  const saveQuote = async () => {

    try {
     
      const response = await axios.post(`${ADD}/${userId}`,
        JSON.stringify({ quote, author }))
      navigate('/saved')
    }

    catch (err) {
      if (err) {
        console.log(err)
      }
    }
  }
  

  const getNewQuote = () => {
    let next = quotebank[count]
    updateQuote(next[0])
    updateAuthor(next[1])

  }

  const copy = async () => {
    if (!navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(quote + ' ~ ' + author)
    }
    catch (err) {
      console.log(err)
    }
 
  }

  const tweet = () => {
    window.open(`http://twitter.com/intent/tweet?text=${quote} ~ ${author}%0A https://quotekeeper.io`, '_blank')
  }

  return (
    <div className="quote">
      <div>{quote} ~ {author}</div>
      {loggedIn && <button onClick={saveQuote}>Save this quote</button>}
      <button onClick={copy}>Copy To Clipboard</button>
      <button onClick={tweet}>Tweet</button>
      <button onClick={getNewQuote}>Get a new quote</button>
    </div>
  )
}