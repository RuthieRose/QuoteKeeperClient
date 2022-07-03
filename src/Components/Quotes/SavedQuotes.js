import { useEffect, useState } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import axiosAPI from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContextAccessToken, useContextUserId, useContextName } from '../Context'
import './saved.css'


export default function SavedQuotes({ setDisplay }) {

  let [array, setArray] = useState([])
  let [deleted, setDeleted] = useState(0)

  const token = useContextAccessToken()
  const userId = useContextUserId()
  const name = useContextName()


  let baseURL = 'https://quotekeeper.herokuapp.com'
  const axios = axiosAPI.create({
    baseURL: 'https://quotekeeper.herokuapp.com',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  })


  useEffect(() => {
    handleQuotes()
  }, [deleted])

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

  const deleteQuote = async (e) => {
    console.log('going to delete this quote', e.currentTarget.id)
    let id = e.currentTarget.id
    try {
      let response = await axios.delete(`quotes/${userId}/${id}`)
      setDeleted(prev => prev + 1)
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
  let id = set[2]
  return (
    <div key={id}>
      <div> 
        <FontAwesomeIcon icon={faTimes} onClick={deleteQuote} id={id}/>
        </div>
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