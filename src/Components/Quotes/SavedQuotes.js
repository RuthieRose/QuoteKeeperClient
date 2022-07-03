import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axiosAPI from 'axios'
import { useContextAccessToken, useContextUserId, useContextName} from '../Context'
import './saved.css'


export default function SavedQuotes({ setDisplay }) {

 let [index, setIndex] = useState(0)
 let [quoteId, setQuoteId] = useState('')
 let [array, setArray] = useState([])

 const token = useContextAccessToken()
 const userId = useContextUserId()
 const name = useContextName()

 
 let baseURL =  'https://quotekeeper.herokuapp.com'
 const axios = axiosAPI.create({
  baseURL: 'https://quotekeeper.herokuapp.com',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
 })
 

 useEffect(() => {
  handleQuotes()
 }, [])

 useEffect(() => {
   console.log(array)
 }, [array])


 const handleQuotes = async () => {
   
  try {
    let response = await axios.get(`quotes/${userId}`)
     response = response.data
     console.log(response)
     response = response.map(set => {
      return [set['quote'], set['author'], set['_id']]
     })
      setArray(prev => [...response])
  }
  
  catch (err) {
      console.log(err)
    }
 }


 const handleHome = () => {
  setDisplay(true)
 }

 useEffect(() => {
  setDisplay(false)
 }, [])
 
 let quoteList = array.map((set, index) => {

  let quote = set[0]
  let author = set[1]
   return (
     <div key={index}>
       <h3>{quote}</h3>
       <p>{author}</p>
     </div>
   )
 })

 return (
  <>
   <h2>{name}'s Quotes</h2>
   <main>{quoteList}</main>
   <div onClick={handleHome}><Link to='/'>Back to Quotes</Link></div>
  </>
 )
}