import { useState, useEffect } from 'react';
import './quote.css';
import { useContextAccessToken, useContextLoggedIn, useContextUpdateAccessToken, useContextUpdateLoggedIn, useContextUpdateLoggedOut, useContextUpdateUserId, useContextUserId, useContextCounter, useContextUpdateCounter  } from '../Context'

export default function QuoteOfTheDay() {

 let [quote, setQuote] = useState();
 let [author, setAuthor] = useState();
 let [getNew, setGetNew] = useState(0);
 let [savedQuote, setSavedQuote] = useState();
 let [quoteBank, setQuoteBank] = useState();
 

 const loggedIn = useContextLoggedIn()
 const updateLoggedOut = useContextUpdateLoggedOut()
 const userId = useContextUserId()
 const accessToken = useContextAccessToken()
 let counter = useContextCounter()
 let updateCounter = useContextUpdateCounter()
 
 useEffect(() => {
  async function getQuote() {
   let quotebank = await fetch('https://quotekeeper.herokuapp.com/quotebank')
   quotebank = await quotebank.json()
   setQuoteBank(quotebank);
   setQuote(quotebank[counter][0])
   setAuthor(quotebank[counter][1])
   updateCounter(counter => {
     if (counter === 49) return 0;
     else return counter+=1
   })
  }
  getQuote();
 }, []);

 useEffect(() => {
  async function getNewQuote() {
    let quotebank = await fetch('https://quotekeeper.herokuapp.com/quotebank')
    quotebank = await quotebank.json()
    setQuoteBank(quotebank);
    setQuote(quotebank[counter][0])
    setAuthor(quotebank[counter][1])
    updateCounter(counter => {
      if (counter === 49) return 0;
      else return counter+=1
    })
   }
   getNewQuote();
 }, [getNew])

 const saveQuote = () => {
   setSavedQuote({quote, author})
 }

 const refresh = () => {
   setGetNew(prevState => prevState+=1)
 }



 return (
  <div className="quote">
   <div>{quote} ~ {author}</div>
   {loggedIn && <button onClick={saveQuote}>Save this quote</button>}
   <button onClick={refresh}>Get a new quote</button>
   </div>
 )
}