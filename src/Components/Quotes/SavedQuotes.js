import { useEffect, useState } from 'react'
import { faTrash, faEnvelopeSquare, faImage } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import axiosAPI from 'axios'
import { useContextAccessToken, useContextUserId, useContextName, useContextUpdateDisplayQuote, useContextUpdateDisplayAuthor } from '../Context'
import './saved.css'


export default function SavedQuotes({ setDisplay }) {

  let [array, setArray] = useState([])
  let [deleted, setDeleted] = useState(0)

  const token = useContextAccessToken()
  const userId = useContextUserId()
  const name = useContextName()
  const updateDisplayQuote = useContextUpdateDisplayQuote()
  const updateDisplayAuthor = useContextUpdateDisplayAuthor()

  const navigate = useNavigate()


  const axios = axiosAPI.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://quotekeeper.herokuapp.com',
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
      if (err.response.status == 403) {
        navigate('/')
        window.location.reload()
      }
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

  const displayQuote = (e) => {
    let id = e.currentTarget.id 
    let index;
    console.log(array)
    for (let i = 0; i < array.length; i++) {
      if (array[i][2] === id) index = i
    }  
    console.log(array[index])
    updateDisplayQuote(array[index][0])
    updateDisplayAuthor(array[index][1])
    navigate('/display')
  }

  const tweetQuote = (e) => {
    let id = e.currentTarget.id 
    let index;
    console.log(array)
    for (let i = 0; i < array.length; i++) {
      if (array[i][2] === id) index = i
    }
    
    console.log(array[index])
    let quote = array[index][0] 
    let author = array[index][1]
    
    window.open(`http://twitter.com/intent/tweet?text=${quote} ~ ${author}%0A https://quotekeeper.io`, '_blank')
  }

  const mailQuote = (e) => {
    let id = e.currentTarget.id 
    let index;
    console.log(array)
    for (let i = 0; i < array.length; i++) {
      if (array[i][2] === id) index = i
    }
    
    console.log(array[index])
    let quote = array[index][0] 
    let author = array[index][1]
    
  
    window.location.href = `mailto:?subject=I wanted to share a quote with you! &body=${quote} ~ ${author}`
   
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
        <FontAwesomeIcon icon={faImage} onClick={displayQuote} id={id} />
        <FontAwesomeIcon icon={faTwitter} onClick={tweetQuote} id={id} />
        <FontAwesomeIcon icon={faEnvelopeSquare} onClick={mailQuote} id={id} />
        <FontAwesomeIcon icon={faTrash} onClick={deleteQuote} id={id}/>
        
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